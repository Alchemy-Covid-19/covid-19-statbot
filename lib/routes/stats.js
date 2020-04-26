const { Router } = require('express');
const Stats = require('../models/Stats');
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
