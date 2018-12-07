const _ = require('lodash');

const logger = require('./utils/logger');
const cli = require('./utils/cli');
const distributeFiles = require('./utils/distribute-files');
const metadataService = require('./services/metadata-service');
const fileSystemService = require('./services/filesystem-service');

// On startup we run the parse method to read the invocation arguments from CLI
cli.parse(process.argv);

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

      if (next < list.length) {
        _.defer(writeAllMetadata, list, next);
      }
      else {
        folderCompleted();
      }
    });
};

fileSystemService
  .clearOutputFolder()
  .then(() => {
    const foldersMap = distributeFiles(
      cli.getFlag('numFiles'),
      cli.getFlag('folderDensity')
    );
    const foldersMetadata = metadataService.generateMetadata(foldersMap);

    Promise.all(foldersMetadata.map(createFileFromMetadata))
      //.then((metadata) => Promise.all(metadata.map(writeFileMetadata)))
      .catch(folderFailed)
      .then((metadata) => {
        writeAllMetadata(metadata, 0);
      });
  });

// logger.log(JSON.stringify(filesMetadata, null, 2));

