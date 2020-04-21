const { Router } = require('express');
const User = require('../models/User');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { welcomeMessage } = require('../utils/message-templates');


module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })

  .post('/welcome', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        return client.messages
          .create({
            body: welcomeMessage,
            from: '+15034835572',
            to: `+1${user.phoneNumber}`
          });
      })
      .then(() => res.send('post request handled'))
      .catch(next);
  });
