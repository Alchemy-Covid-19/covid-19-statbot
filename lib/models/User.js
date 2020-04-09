const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  firstName: String
});

module.exports = mongoose.model('User', schema);
