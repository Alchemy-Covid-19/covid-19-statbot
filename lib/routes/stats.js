const { Router } = require('express');
const Stats = require('../models/Stats');
const { incomingSmsHandler } = require('../utils/sms-handler');

module.exports = Router()
// test route that only works for US
  .get('/', (req, res, next) => {
    Stats
      .find({ location: 'United States' })
      .select({ createdAt: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats))
      .catch(next);
  })

// gets stats for the location a user designated on sign-up
  .get('/:location', (req, res, next) => {
    Stats
      .findOne({ location: req.params.location })
      .sort({ createdAt: -1 }) // sort the createdAt to get the latest value
      .select({ createdAt: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats.toJSON({ virtuals: true })))
      .catch(next);
  })

// gets stats for a location based on a received text message from a user
  .post('/', (req, res, next) => {
    incomingSmsHandler(req.body)
      .then(twiml => res.send(twiml))
      .catch(next);
  });

