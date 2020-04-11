const scraper = require('./base');
const Stats = require('../models/Stats');

module.exports = async() => {
  const statsArr = await scraper();

  Stats.bulkWrite()

  // update statistics for each location upon new scrape
  return Promise.all(statsArr.map(stat => {
    // added upsert true in case the stat doesn't exist yet
    return Stats
      .findOneAndUpdate({ location: stat.location }, stat, { new: true, upsert: true });
  }));
};
