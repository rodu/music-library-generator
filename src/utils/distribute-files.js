const _ = require('lodash');

const logger = require('./logger');

const MIN_DENSITY = 1;
const MAX_DENSITY = 5;

module.exports = (numFiles, folderDensity) => {
  folderDensity =
    // Caps the filder density to the expected range
    Math.min(MAX_DENSITY, Math.max(MIN_DENSITY, folderDensity));


  if (numFiles) {
    logger.log('Total files to generate:', numFiles);
  }
  else {
    logger.log('No files will be generated.');

    process.exit();
  }

  const folders = [];
  let avgFilesPerFolder;
  let totalFolders;

  if (folderDensity) {
    const distribution = [
      Math.round(_.random(1, 0.08 * numFiles)),
      Math.round(_.random(0.08 * numFiles, 0.15 * numFiles)),
      Math.round(_.random(0.15 * numFiles, 0.35 * numFiles)),
      Math.round(_.random(0.35 * numFiles, 0.65 * numFiles)),
      Math.round(_.random(0.65 * numFiles, numFiles)),
    ];
    const filesDensity = distribution[folderDensity - 1];
    let filesCount = 0;
    while (filesCount < numFiles) {
      const rnd = _.random(1, filesDensity);
      const folderFiles =
        (filesCount + rnd <= numFiles) ? rnd : numFiles - filesCount;

      folders.push(folderFiles);

      filesCount += folderFiles;
    }

    totalFolders = folders.length;
    avgFilesPerFolder = Math.round(filesCount / totalFolders);
  }
  else {
    totalFolders = 1;
    avgFilesPerFolder = numFiles;
  }

  logger.log(`Average number of files per folder: ${avgFilesPerFolder}`);
  logger.log(`Total container folders: ${totalFolders}`);

  return folders;
};
