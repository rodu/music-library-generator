const _ = require('lodash');
const faker = require('faker');
const ffmetadata = require('ffmetadata');

const logger = require('../utils/logger');
const genresService = require('./genres-service');
const randomPath = require('./random-path-service');
const { OUTPUT_FOLDER, MAX_PATH_DEPTH } = require('../config/settings');

const fields = {
  GENRE: 'genre',
  ARTIST: 'artist',
  ALBUM: 'album',
  TITLE: 'title',
  LOCATION: 'location',
  DISPLAY_PATH: 'displayPath',
};

const random = faker.random;
const name = faker.name;

const generateMetadata = function(fileNumber) {
  const trackNumber = '' + (fileNumber + 1);

  return {
    [fields.GENRE]: this.genre,
    [fields.ARTIST]: this.artist,
    [fields.ALBUM]: this.album,
    [fields.TITLE]: random.words(),
    [fields.LOCATION]:
        `${this.displayPath}/${trackNumber} - ${randomPath(1, '.mp3')}`,
    [fields.DISPLAY_PATH]: this.displayPath,
  };
};

const generateFileMetadata = (numFiles) => {
  return _.range(numFiles).map(generateMetadata, {
    genre: genresService.randomGenre(),
    artist: name.findName(),
    album: random.words(),
    displayPath: OUTPUT_FOLDER + randomPath(_.random(1, MAX_PATH_DEPTH)),
  });
};

const writeFileMetadata = (metadata, index) => {
  return new Promise((resolve, reject) => {
    const data = {
      genre: metadata.genre,
      artist: metadata.artist,
      album: metadata.album,
      title: metadata.title
    };

    logger.log(`[${index}] Writing metadata: ${metadata.location}`);
    ffmetadata.write(metadata.location, data, function(err) {
      if (err) {
        reject(`Error writing metadata: ${err}`);
      }
      else {
        resolve(metadata);
      }
    });
  });

};

module.exports = {
  generateMetadata(foldersMap) {
    return foldersMap
      .map(generateFileMetadata)
      .reduce((folders, metadata) => folders.concat(metadata), []);
  },
  writeFileMetadata
};
