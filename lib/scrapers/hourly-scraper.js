// new imports
const scraper = require('./base');
const Stats = require('../models/Stats');

module.exports = async() => {
  const statsArr = await scraper();

  Stats.bulkWrite();
  return Promise.all(statsArr.map(stat => {
    return Stats
      .findOneAndUpdate({ location: stat.location }, stat, { new: true, upsert: true });
  }));
};
