const program = require('commander');

const cliConfig = program
  .version('0.0.1')
  .description('Music Library Generator')
  .option(
    '-n, --num-files [number]',
    'The total number of audio files to generate. [10]',
    10
  )
  .option(
    '-d, --folder-density [number]',
    'Indicate a parameter of files density per folder. [3]',
    3
  )
  .option(
    '-v, --verbose [boolean]',
    'Enables verbose program logging. [false]',
    false
  );

let programFlags;

const cli = {
  parse(argv) {
    programFlags = cliConfig.parse(argv);
  },

  getAllFlags() {
    return programFlags;
  },

  getFlag(flagName) {
    return programFlags[flagName];
  }
};

module.exports = cli;
