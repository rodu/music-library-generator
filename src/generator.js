const _ = require('lodash');
const program = require('commander');

const logger = require('./utils/logger');
const distributeFiles = require('./utils/distribute-files');
const metadataService = require('./services/metadata-service');
const fileSystemService = require('./services/filesystem-service');

program
  .version('0.0.1')
  .description('Music Library Generator')
  .option(
    '-n, --num-files [number]',
    'The total number of audio files to generate. [10]',
    '10'
  )
  .option(
    '-d, --folder-density [number]',
    'Indicate a parameter of files density per folder. [3]',
    '3'
  )
  .parse(process.argv);

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
      +program.numFiles,
      +program.folderDensity
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

