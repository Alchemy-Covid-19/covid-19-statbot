const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalNewNationalCases: {
    type: Number
  },
  totalNewNationalDeaths: {
    type: Number
  },
  totalNewNationalRecovered: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Stat', schema);
