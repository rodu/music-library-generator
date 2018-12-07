const cliProgress = require('cli-progress');

const cli = require('./cli');

const defaultOptions = { fps: 10 };

class ProgressBar {
  constructor(options = defaultOptions) {
    this.progress = new cliProgress.Bar(
      options,
      cliProgress.Presets.shades_classic
    );

    this.disabled = cli.getFlag('verbose');
  }

  start(end, start) {
    if (this.disabled) return;

    this.progress.start(end, start);
  }

  increment() {
    if (this.disabled) return;

    this.progress.increment();
  }

  stop() {
    if (this.disabled) return;

    this.progress.stop();
  }
}

const progressBarFactory = {
  create(options = defaultOptions) {
    return new ProgressBar(options);
  }
};

module.exports = progressBarFactory;
