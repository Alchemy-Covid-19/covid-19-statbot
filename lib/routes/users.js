const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  });