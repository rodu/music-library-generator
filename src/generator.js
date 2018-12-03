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
  Math.max(MAX_DENSITY, Math.min(MIN_DENSITY, +program.folderDensity));


if (numFiles) {
  console.log('Total files to generate:', numFiles);
}
else {
  console.log('No files will be generated.');

  return;
}

let avgFilesPerFolder;
let totalFolders;
const densityScale = [
  8,
  12,
  72,
  150,
  320
];

if (folderDensity) {
  const percent = folderDensity * 100 / MAX_DENSITY;
  const distribution = Math.ceil(numFiles / (numFiles * percent / 100));

  let filesCount = 0;
  let folders = _.range(distribution)
    .map(() => {
      const files = _.random(densityScale[folderDensity - 1]);

      filesCount += files;

      return files;
    });

  // Adds the remaining files to a last folder
  if (filesCount < numFiles) {
    folders.push(numFiles - filesCount);
  }

  totalFolders = folders.length;
  avgFilesPerFolder = Math.round(
    folders.reduce((acc, n) => acc + n, 0) / totalFolders
  );
}
else {
  totalFolders = 1;
  avgFilesPerFolder = numFiles;
}

console.log(`Average number of files per folder: ${avgFilesPerFolder}`);
console.log(`Total container folders: ${totalFolders}`);
