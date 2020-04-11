const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  totalCases: {
    type: String,
    required: true
  },
  // non-required fields dont need to be in an object with type
  newCases: String,
  totalDeaths: String,
  newDeaths: String,
  totalRecovered: String,
  newRecovered: String,
  fatalityRate: String,
  location: String
}, { timestamps: true });

// maybe virtuals would be better here
// since you query on data a bunch in your application, it may be easy to have
// real dates stored in the db
schema.virtual('date').get(function() {
  return this.createdAt.toISOString().split('T')[0];
});

schema.virtual('time').get(function() {
  return this.createdAt.toISOString().split('T')[0].slice(0, 5);
});

schema.statics.getLatest = function() {
  return this.aggregate([
    { $sort: { createdAt: -1 } }, // sort so the most resent stats are first
    {
      $group: {
        _id: '$location', // group by location
        stat: { $first: '$$ROOT' } // take the first document you see for a location
      }
    }
  ]);
}

module.exports = mongoose.model('Stats', schema);
