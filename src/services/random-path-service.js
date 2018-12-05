const _ = require('lodash');
const faker = require('faker');

const chunk = () => faker.random.words();

const randomPath = (chunks = 3, extension = '') => {
    return _.range(chunks).map(chunk).join('/') + extension;
};

module.exports = randomPath;
