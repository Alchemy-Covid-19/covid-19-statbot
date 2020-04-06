const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalCases: {
    type: String
  },
  // newCases: {
  //   type: Number
  // },
  totalDeaths: {
    type: String
  },
  // newDeaths: {
  //   type: Number
  // },
  totalRecovered: {
    type: String
  },
  // newRecovered: {
  //   type: String
  // },
  fatalityRate: {
    type: String
  },
  location: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Stats', schema);
