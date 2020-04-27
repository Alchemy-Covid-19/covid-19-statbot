const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: String,
  totalCases: String,
  newCases: String,
  totalDeaths: String,
  newDeaths: String,
  activeCases: String,
  totalTests: String
}, { timestamps: true });

schema.virtual('date').get(function() {
  return this.updatedAt.toISOString().split('T')[0];
});

schema.virtual('time').get(function() {
  return this.updatedAt.toISOString().split('T')[1].slice(0, 5);
});

schema.statics.getLatest = function() {
  return this.aggregate([
    { $sort: { updatedAt: -1 } },
    {
      $group: {
        _id: '$location',
        stat: { $first: '$$ROOT' }
      }
    }
  ]);
};

module.exports = mongoose.model('Stats', schema);
