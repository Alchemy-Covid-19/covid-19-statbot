const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalCases: String,
  newCases: String,
  totalDeaths: String,
  newDeaths: String,
  totalRecovered: String,
  newRecovered: String,
  fatalityRate: String,
  location: String,
}, { timestamps: true });

schema.virtual('date').get(function() {
  return this.createdAt.toISOString().split('T')[0];
});

schema.virtual('time').get(function() {
  return this.createdAt.toISOSTring().split('T')[1].slice(0, 5);
});

module.exports = mongoose.model('Stats', schema);
