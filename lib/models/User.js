const mongoose = require('mongoose');
const { outgoingSmsHandler } = require('../utils/sms-handler');

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

// clean up phone numbers
schema.pre('save', function(next) {
  this.phoneNumber = this.phoneNumber.replace(/\+1|-|\(|\)|\s/g, '');
  next();
});

schema.methods.sendSms = function(message) {
  return outgoingSmsHandler(this.phoneNumber, message);
}

module.exports = mongoose.model('User', schema);
