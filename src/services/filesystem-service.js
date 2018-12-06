const { exec } = require('child_process');
const { OUTPUT_FOLDER } = require('../config/settings');

const fileSystemService = {
  clearOutputFolder() {
    console.log('Clearing and creating output folder', OUTPUT_FOLDER);

    exec(`rm -rf ${OUTPUT_FOLDER}`);
    exec(`mkdir ${OUTPUT_FOLDER}`);
  },

  makePath(pathString) {
    console.log(`Creating path at "${pathString}"`);
    exec(`mkdir -p "${pathString}"`);
  }
};

module.exports = fileSystemService;
