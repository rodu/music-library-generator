const _ = require('lodash');

const logger = require('./utils/logger');
const cli = require('./utils/cli');
const progressBar = require('./utils/progress-bar');
const distributeFiles = require('./utils/distribute-files');
const metadataService = require('./services/metadata-service');
const fileSystemService = require('./services/filesystem-service');

// On startup we run the parse method to read the invocation arguments from CLI
cli.parse(process.argv);

// Initializes progress bars
const metadataProgress = progressBar.create();

// Creates all containing folders
const createFileFromMetadata = (metadata) => {
  return fileSystemService
    .makePath(metadata.displayPath)
    .then(() => fileSystemService.createFile(metadata.location))
    .then(() => metadata);
};
const folderCompleted = () => logger.log('OK.');
const folderFailed = (message) => console.error(message);

const writeAllMetadata = function writeAllMetadata(list, index) {
  metadataService.writeFileMetadata(list[index])
    .then(() => {
      const next = index + 1;

      metadataProgress.increment();

      if (next < list.length) {
        _.defer(writeAllMetadata, list, next);
      }
      else {
        metadataProgress.stop();

        folderCompleted();
      }
    });
};

fileSystemService
  .clearOutputFolder()
  .then(() => {
    const numFiles = parseInt(cli.getFlag('numFiles'), 10);

    if (!numFiles) {
      logger.log('Will not generate any file.');

      process.exit();
    }

    const foldersMap = distributeFiles(
      numFiles,
      parseInt(cli.getFlag('folderDensity'), 10)
    );
    const foldersMetadata = metadataService.generateMetadata(foldersMap);

    Promise.all(foldersMetadata.map(createFileFromMetadata))
      .catch(folderFailed)
      .then((metadata) => {
        metadataProgress.start(numFiles, 0);
        writeAllMetadata(metadata, 0);
      });
  });
