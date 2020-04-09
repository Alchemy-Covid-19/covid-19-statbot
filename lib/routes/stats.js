const { Router } = require('express');
const Stats = require('../models/Stats');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = Router()
  .get('/', (req, res, next) => {
    Stats
      .find({ location: 'United States' })
      .select({ date: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats))
      .catch(next);
  })

  .get('/:location', (req, res, next) => {
    Stats
      .findOne({ location: req.params.location, date: Date().slice(4, 15) })
      .select({ date: true, time: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Stats
      .findOne({ location: req.body.Body })
      .select({ date: true, location: true, newCases: true, newDeaths: true, newRecovered: true })
      // use Twilio API to send a text
      .then(stats => {
        const twiml = new MessagingResponse();
        twiml.message(`Daily stats for ${stats.location} as of 4:30 pm PST on ${stats.date}:\nNew Cases: ${stats.newCases}\nNew Deaths: ${stats.newDeaths}\nNew Recovered: ${stats.newRecovered}`);
        res.send(twiml.toString());
      })
      .catch(next);

  });

