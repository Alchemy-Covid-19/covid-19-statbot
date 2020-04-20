// new imports
const scraper = require('./base');
const Stats = require('../models/Stats');

module.exports = async() => {
  const statsArr = await scraper();

  return Stats
    .create(statsArr);
};

