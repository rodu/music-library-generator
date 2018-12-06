const { exec } = require('child_process');

const fileSystemService = {
  makePath(pathString) {
    exec('touch afile.txt');
  }
};

module.exports = fileSystemService;
