const { Router } = require('express');
const { welcomeMessage, stopMessage } = require('../utils/message-templates');
const User = require('../models/User');

module.exports = Router()
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })

  .post('/welcome', async(req, res, next) => {
    try {
      const user = await User.create(req.body);
      await user.sendSms(welcomeMessage());
      res.send(user);
    } catch(e) {
      next(e);
    }
  })

  .delete('/', async(req, res, next) => {
    try {
      const user = await User.findOneAndDelete({ phoneNumber: req.body.phoneNumber });
      await user.sendSms(stopMessage());
      res.send(user);
    } catch(e) {
      next(e);
    }
  });
