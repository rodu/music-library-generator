const _ = require('lodash');
const faker = require('faker');
const ffmetadata = require('ffmetadata');

const logger = require('../utils/logger');
const genresService = require('./genres-service');
const randomPath = require('./random-path-service');
const { OUTPUT_FOLDER } = require('../config/settings');

const fields = {
  GENRE: 'genre',
  ARTIST: 'artist',
  ALBUM: 'album',
  TITLE: 'title',
  LOCATION: 'location',
  SIZE: 'size',
  TIME: 'time',
  DATE: 'date',
  BPM: 'bpm',
  PARENT_FOLDER_ID: 'parentFolderId',
  TRACK_NUMBER: 'trackNumber',
  DISPLAY_PATH: 'displayPath',
  LOCATION_HASH: 'locationHash',
  COVER_ART_HASH: 'coverArtHash',
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
    displayPath: OUTPUT_FOLDER + randomPath(),
  });
};

const writeFileMetadata = (metadata) => {
  return new Promise((resolve, reject) => {
    const data = {
      genre: metadata.genre,
      artist: metadata.artist,
      album: metadata.album,
      title: metadata.title
    };

    logger.log('Writing metadata for file', metadata.location);
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
