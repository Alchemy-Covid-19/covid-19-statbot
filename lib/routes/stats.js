const { Router } = require('express');
const Stats = require('../models/Stats');

module.exports = Router()
  .get('/', (req, res, next) => {
    Stats
      .find({ location: 'United States' })
      .then(stats => res.send(stats))
      .catch(next);
  });

