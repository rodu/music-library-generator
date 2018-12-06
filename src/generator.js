const program = require('commander');

const distributeFiles = require('./distribute-files');
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

const foldersMap = distributeFiles(+program.numFiles, +program.folderDensity);
const foldersMetadata = metadataService.generateMetadata(foldersMap);

fileSystemService.clearOutputFolder();

// Creates all containing folders
const createFileFromMetadata = (metadata) => {
  return fileSystemService.makePath(metadata.displayPath)
    .then(() => fileSystemService.createFile(metadata.location))
    .then(() => metadata);
};
const writeFileMetadata = (metadata) => {
  return metadataService.writeFileMetadata(metadata);
};
const folderCompleted = () => console.log('OK.');
const folderFailed = (message) => console.error(message);

foldersMetadata.forEach((folder) => {
  Promise.all(folder.map(createFileFromMetadata))
    .then((metadata) => Promise.all(metadata.map(writeFileMetadata)))
    .then(folderCompleted)
    .catch(folderFailed);
});

// console.log(JSON.stringify(filesMetadata, null, 2));

