const { Router } = require('express');
const User = require('../models/User');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
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

  })
  .post('/welcome', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        return client.messages
          .create({
            body: ' Thanks for signing up',
            from: '+15034835572',
            to: `+1${user.phoneNumber.replace('+1', '')}`
          });
        
      })
      .then(() => res.send('post request handled'));
  });
