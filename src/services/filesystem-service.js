const del = require('del');
const fs = require('fs');
const mkdir = require('make-dir');

const logger = require('../utils/logger');
const { OUTPUT_FOLDER, SAMPLE_FILE } = require('../config/settings');

const fileSystemService = {
  clearOutputFolder() {
    logger.log('Clearing and creating output folder', OUTPUT_FOLDER);

    return del([OUTPUT_FOLDER])
      .then(() => mkdir(OUTPUT_FOLDER));
  },

  makePath(path) {
    return mkdir(path);
  },

  createFile(location) {
    return new Promise((resolve, reject) => {
      logger.log('Copying sample file to', location);
      fs.copyFile(SAMPLE_FILE, location, (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }
};

module.exports = fileSystemService;
