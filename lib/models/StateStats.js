const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalStateCases: {
    type: Number
  },
  todayNewStateCases: {
    type: Number
  },
  totalStateDeaths: {
    type: Number
  },
  todayNewStateDeaths: {
    type: Number
  },
  totalStateRecovered: {
    type: Number
  },
  todayNewStateRecovered: {
    type: Number
  },
  todayNewStateFatalityRate: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('StateStat', schema);
