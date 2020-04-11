const scraper = require('./base');
const Stats = require('../models/Stats');

module.exports = async() => {
  const statsArr = await scraper();

  // create documents according to model
  return Stats
    .create(statsArr);
};
