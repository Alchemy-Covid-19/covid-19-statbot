const { Router } = require('express');
const User = require('../models/User');
const Stats = require('../models/Stats');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = Router()

// gets stats for the location a user designated on sign-up
  .get('/:location', (req, res, next) => {
    Stats
      .findOne({ location: req.params.location })
      .sort({ createdAt: -1 })
      .select({ createdAt: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats.toJSON({ virtuals: true })))
      .catch(next);
  })

// gets stats for a location based on a received text message from a user
  .post('/', (req, res, next) => {
    if(req.body.Body.toLowerCase() === 'stop'){
      return User
        .findOneAndDelete({ phoneNumber: req.body.From })
        .then(user => {
          const twiml = new MessagingResponse();
          twiml.message(`${user.firstName}, you have been unsubscribed from Social Distance-Pings.`);
          res.send(twiml.toString());
        })
        .catch(next);
    }
    Stats
      .findOne({ location: new RegExp(req.body.Body.trim(), 'i') })
      .select({ date: true, time: true, location: true, newCases: true, newDeaths: true, newRecovered: true })
      // use Twilio API to send a text
      .then(stats => {
        const twiml = new MessagingResponse();
        twiml.message(`Thanks for using Social Distance-Ping!\nCOVID-19 stats for ${stats.location} as of ${stats.time} on ${stats.date}:\nNew Cases: ${stats.newCases}\nNew Deaths: ${stats.newDeaths}\nNew Recovered: ${stats.newRecovered}`);
        res.send(twiml.toString());
      })
      .catch(next);
  });

