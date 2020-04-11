require('dotenv').config();
require('./lib/utils/connect')();

const mongoose = require('mongoose');
const User = require('./lib/models/User');
const Stats = require('./lib/models/Stats');


const template = (user, stat) => `
Here's your daily update from Social Distance-Ping!
COVID-19 stats for ${user.location} as of 4:30 pm PST today:
New Cases: ${stat.newCases}
New Deaths: ${stat.newDeaths}
New Recovered: ${stat.newRecovered}`.trim();

// you can user your User model instead of hitting your API here
Promise.all([
  User.find(), // find all users
  Stats.getLatest() // get latest stats
])
  .then(([users, stats]) => {
    // send an sms for each user and wait for all messages to get sent 
    return Promise.all(users.map(user => {
      const stat = stats.find(stat => stat.location === user.location);
      return user.sendSms(template(user, stat));
    }));
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());

// refactored old way
// make sure to wait for texts te be sent

// getUsers()
//   .then(users => {
//     // need to wait for all stats to come back
//     // can use forEach without promise.all because there
//     // is no guarantee that all text messages are send before the
//     // function finishes. It may work for a small amount of users
//     // but as you gain more users the function may finish before sending
//     // all users a text message, since you are not waiting for the promises
//     // to finish
//     return Promise.all(users.map(user => Promise.all([user, getStats(user.location)])))
//     })
//     .then(userStats => Promise.all(userStats.map(([user, stats]) => {
//       return outgoingSmsHandler(user.to, template(user, stats))
//     })))
