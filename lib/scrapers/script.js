require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');

const scrape = require('./stats-scraper.js');

scrape()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());
