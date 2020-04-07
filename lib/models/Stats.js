const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalCases: {
    type: Number
  },
  newCases: {
    type: Number
  },
  totalDeaths: {
    type: Number
  },
  newDeaths: {
    type: Number
  },
  totalRecovered: {
    type: Number
  },
  newRecovered: {
    type: Number
  },
  fatalityRate: {
    type: String
  },
  location: {
    type: String
  }
});
// add a date field

module.exports = mongoose.model('Stats', schema);
