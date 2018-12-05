const _ = require('lodash');
const genresList = require('../config/genres-list');

const genresService = {
  randomGenre() {
    return _.sample(genresList);
  }
};

module.exports = genresService;
