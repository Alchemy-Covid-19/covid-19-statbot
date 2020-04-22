const { Router } = require('express');
const Stats = require('../models/Stats');
// const User = require('../models/User');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { incomingSmsHandler } = require('../utils/sms-handler');

module.exports = Router()

// get stats for the location a user designated on sign-up
  .get('/:location', (req, res, next) => {
    Stats
      .findOne({ location: req.params.location })
      .sort({ updatedAt: -1 })
      .select({ updatedAt: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats.toJSON({ virtuals: true })))
      .catch(next);
  })

// send dynamic SMS depending on user input
  .post('/', (req, res, next) => {
    incomingSmsHandler(req.body)
      .then(twiml => res.send(twiml))
      .catch(next);
  });

// OUR ORIGINAL CODE 
  // .post('/', (req, res, next) => {
  //   if(req.body.Body.toLowerCase() === 'stop'){
  //     return User
  //       .findOneAndDelete({ phoneNumber: req.body.From })
  //       .then(user => {
  //         const twiml = new MessagingResponse();
  //         twiml.message(`${user.firstName}, you have been unsubscribed from Social Distance-Pings.`);
  //         res.send(twiml.toString());
  //       })
  //       .catch(next);
  //   }
  //   Stats
  //     .findOne({ location: new RegExp(req.body.Body.trim(), 'i') })
  //     .select({ date: true, time: true, location: true, newCases: true, newDeaths: true, newRecovered: true })
  //     // use Twilio API to send a text
  //     .then(stats => {
  //       const twiml = new MessagingResponse();
  //       twiml.message(`Thanks for using Social Distance-Ping!\nCOVID-19 stats for ${stats.location} as of ${stats.time} on ${stats.date}:\nNew Cases: ${stats.newCases}\nNew Deaths: ${stats.newDeaths}\nNew Recovered: ${stats.newRecovered}`);
  //       res.send(twiml.toString());
  //     })
  //     .catch(next);
  // });

