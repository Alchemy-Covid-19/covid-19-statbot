const { Router } = require('express');
const Stats = require('../models/Stats');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = Router()
  .get('/', (req, res, next) => {
    Stats
      .find({ location: 'United States' })
      .select({ newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats))
      .catch(next);
  })

  .post('/text', (req, res, next) => {
    Stats
      .findOne({ location: req.body.Body })
      .select({ newCases: true, newDeaths: true, newRecovered: true })
      // use Twilio API to send a text
      .then(stats => {
        const twiml = new MessagingResponse();
        twiml.message(`New Cases: ${stats.newCases} \n New Deaths: ${stats.newDeaths}
        \n New Recovered: ${stats.newRecovered}`);
        res.send(twiml.toString());
      })
      .catch(next);
  });
