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
  .post('/', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        const twiml = new MessagingResponse();
        twiml.message(`${user.firstName}, you are now signed up to receive pings!`);
        res.send(twiml.toString());
      })
      .catch(next);
  })
  .post('/stop', (req, res, next) => {
    User
      .findOneAndDelete({ phoneNumber: req.body.From })
      .then(user => {
        const twiml = new MessagingResponse();
        twiml.message(`${user.firstName}, you have been unsubscribed from Pings`);
        res.send(twiml.toString());
      })
      .catch(next);
  });
  
