const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalNationalCases: {
    type: Number
  },
  todayNewNationalCases: {
    type: Number
  },
  totalNationalDeaths: {
    type: Number
  },
  todayNewNationalDeaths: {
    type: Number
  },
  totalNationalRecovered: {
    type: Number
  },
  todayNewNationalRecovered: {
    type: Number
  },
  todayNewNationalFatalityRate: {
    //maybe a string because it's a %?
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('NatStat', schema);
