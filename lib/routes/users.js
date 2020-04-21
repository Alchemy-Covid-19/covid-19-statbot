const { Router } = require('express');
const { welcomeMessage } = require('../utils/message-templates');
const User = require('../models/User');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;
// const client = require('twilio')(accountSid, authToken);

module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })

  .post('/welcome', async(req, res, next) => {
    try {
      const user = await User.create(req.body);
      await user.sendSms(welcomeMessage());
      res.send(user);
    } catch(e) {
      next(e);
    }
  });

  // OUR ORIGINAL 'WELCOME' POST ROUTE
  // .post('/welcome', (req, res, next) => {
  //   User
  //     .create(req.body)
  //     .then(user => {
  //       return client.messages
  //         .create({
  //           body: welcomeMessage,
  //           from: '+15034835572',
  //           to: `+1${user.phoneNumber.replace('+1', '')}`
  //         });
  //     })
  //     .then(() => res.send('post request handled'))
  //     .catch(next);
  // });
