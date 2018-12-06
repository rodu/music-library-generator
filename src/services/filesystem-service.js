const _ = require('lodash');

const { exec } = require('child_process');
const { OUTPUT_FOLDER, SAMPLE_FILE } = require('../config/settings');

const fileSystemService = {
  clearOutputFolder() {
    console.log('Clearing and creating output folder', OUTPUT_FOLDER);

    exec(`rm -rf ${OUTPUT_FOLDER}`);
    exec(`mkdir ${OUTPUT_FOLDER}`);
  },

  makePath(pathString) {
    return new Promise((resolve) => {
      console.log(`Creating path at "${pathString}"`);
      exec(`mkdir -p "${pathString}"`);

      _.defer(resolve);
    });
  },

  createFile(location) {
    return new Promise((resolve) => {
      console.log('Copying sample file to', location);
      exec(`cp "${SAMPLE_FILE}" "${location}"`);

      _.defer(resolve);
    });
  }
};

module.exports = fileSystemService;
