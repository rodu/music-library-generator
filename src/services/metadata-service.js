const _ = require('lodash');
const faker = require('faker');
const md5 = require('md5');
const genresService = require('./genres-service');

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
const date = faker.date;
const finance = faker.finance;

const generateMetadata = function(fileNumber) {
  return {
    [fields.GENRE]: this.genre,
    [fields.ARTIST]: this.artist,
    [fields.ALBUM]: this.album,
    [fields.TITLE]: random.words(),
    [fields.LOCATION]: this.location,
    [fields.SIZE]: finance.account(),
    [fields.TIME]: finance.account(),
    [fields.DATE]: date.past(),
    [fields.BPM]: '' + _.random(80, 180),
    [fields.PARENT_FOLDER_ID]: this.parentFolderId,
    [fields.TRACK_NUMBER]: '' + (fileNumber + 1),
    [fields.DISPLAY_PATH]: this.displayPath,
    [fields.LOCATION_HASH]: this.locationHash,
    [fields.COVER_ART_HASH]: this.coverArtHash,
  };
};

const spaceRegExp = /\s/g;
const makePath = () => random.words().replace(spaceRegExp, '/');
const randomPath = (len = 3, extension = '') => {
  return _.range(len).map(makePath).join('/') + extension;
};
const generateFileMetadata = (numFiles) => {
  const location = randomPath(4, '.mp3');

  return _.range(numFiles).map(generateMetadata, {
    genre: genresService.randomGenre(),
    artist: name.findName(),
    album: random.words(),
    location,
    parentFolderId: randomPath(),
    displayPath: randomPath(),
    locationHash: md5(location),
    coverArtHash: md5(randomPath(3, '.png')),
  });
};

module.exports = {
  generateMetadata(foldersMap) {
    return foldersMap.map(generateFileMetadata);
  }
};
