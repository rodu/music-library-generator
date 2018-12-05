const program = require('commander');
const _ = require('lodash');

program
  .version('0.0.1')
  .description('Music Library Generator')
  .option(
    '-n, --num-files [number]',
    'The total number of audio files to generate [10]',
    '10'
  )
  .option(
    '-d, --folder-density [number]',
    'How many files should be put in each folder [10]',
    '10'
  )
  .parse(process.argv);

const numFiles = +program.numFiles;

const MIN_DENSITY = 1;
const MAX_DENSITY = 5;
const folderDensity =
  // Caps the filder density to the expected range
  Math.min(MAX_DENSITY, Math.max(MIN_DENSITY, +program.folderDensity));


if (numFiles) {
  console.log('Total files to generate:', numFiles);
}
else {
  console.log('No files will be generated.');

  process.exit();
}

let avgFilesPerFolder;
let totalFolders;

if (folderDensity) {
  const distribution = [
    _.random(1, 8),
    _.random(8, 16),
    _.random(16, 64),
    _.random(64, 128),
    _.random(128, 256)
  ];
  console.log('Folder density', folderDensity);
  const filesDensity = distribution[folderDensity - 1];
  const folders = [];
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

console.log(`Average number of files per folder: ${avgFilesPerFolder}`);
console.log(`Total container folders: ${totalFolders}`);
