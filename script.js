require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');

const scrape = require('./lib/scrapers/stats-scraper.js');

scrape()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());
