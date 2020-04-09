const { Router } = require('express');
const User = require('../models/User');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })
  .post('/stop', (req, res, next) => {
    User
    //maybe delete .body?
      .findOneAndDelete({ phoneNumber: req.body.From })
      .then(user => {
        const twiml = new MessagingResponse();
        twiml.message(`${user.firstName}, you have been unsubscribed from Pings`);
        res.send(twiml.toString());
      })
      .catch(next);
  });   
