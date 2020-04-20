const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String
});

// remove symbols from phone numbers
schema.pre('save', function(next) {
  this.phoneNumber = this.phoneNumber.replace(/\+1|-|\(|\)|\s/g, '');
  next();
});

module.exports = mongoose.model('User', schema);
