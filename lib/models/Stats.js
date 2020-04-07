const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalCases: {
    type: Number
  },
  newCases: {
    type: String
  },
  totalDeaths: {
    type: Number
  },
  newDeaths: {
    type: String
  },
  totalRecovered: {
    type: Number
  },
  newRecovered: {
    type: String
  },
  fatalityRate: {
    type: String
  },
  location: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Stats', schema);
