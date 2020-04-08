const { Router } = require('express');
const Stats = require('../models/Stats');

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
      .find({ location: req.params.location })
      .select({ date: true, newCases: true, newDeaths: true, newRecovered: true })
      .then(stats => res.send(stats))
      .catch(next);
  });

