const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalCases: {
    type: String
  },
  newCases: {
    type: String
  },
  totalDeaths: {
    type: String
  },
  newDeaths: {
    type: String
  },
  totalRecovered: {
    type: String
  },
  newRecovered: {
    type: String
  },
  fatalityRate: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: String,
  }
});

module.exports = mongoose.model('Stats', schema);
