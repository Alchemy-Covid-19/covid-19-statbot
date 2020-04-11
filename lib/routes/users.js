const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })

  .post('/welcome', async(req, res, next) => {
    // using async await to make it easier to respond with the user object
    try {
      const user = await User.create(req.body);
      // use instance method to make responding with texts easier
      await user.sendSms('Thanks for signing up for Social Distance-Pings! You will receive up-to-date stats at 5pm PST every day.');
      res.send(user);
    } catch(e) {
      next(e);
    }
  });
