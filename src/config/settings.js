const path = require('path');

const OUTPUT_FOLDER = path.join(process.cwd(), 'output', '/');
const SAMPLE_FILE = path.join(process.cwd(), 'audio/sample.mp3');
const MAX_PATH_DEPTH = 12;

module.exports = {
  OUTPUT_FOLDER,
  SAMPLE_FILE,
  MAX_PATH_DEPTH
};
