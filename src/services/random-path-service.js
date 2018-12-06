const _ = require('lodash');
const faker = require('faker');

const chunk = () => faker.random.words().replace(/\//g, '');

const randomPath = (chunks = 3, extension = '') => {
  let result = '';

  if (chunks > 1) {
    result = _.range(chunks).map(chunk).join('/');
  }
  else {
    result = chunk();
  }

  return result + extension;
};

module.exports = randomPath;
