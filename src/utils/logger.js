const cli = require('./cli');

const logger = {
  log(...args) {
    if (cli.getFlag('verbose')) {
      console.log(...args);
    }
  }
};

module.exports = logger;
