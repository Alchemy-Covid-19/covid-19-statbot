require('dotenv').config();
require('./lib/utils/connect')();

const mongoose = require('mongoose');
const User = require('./lib/models/User');
const Stats = require('./lib/models/Stats');
const { dailyMessage } = require('./lib/utils/message-templates');

// hit database directly to get all users and latest stats
Promise.all([
  User.find(),
  Stats.getLatest()
])
// send an SMS to each user and wait for all messages to get sent
  .then(([users, stats]) => {
    return Promise.all(users.map(user => {
      const location = stats.find(stat => stat._id === user.location);
      return user.sendSms(dailyMessage(user, location.stat));
    }));
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());
