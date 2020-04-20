require('dotenv').config();
require('./lib/utils/connect')();

const mongoose = require('mongoose');
const User = require('./lib/models/User');
const Stats = require('./lib/models/Stats');

// create template for message
const template = (user, stat) =>
  `
    Here's your daily update from Social Distance-Ping!\nCOVID-19 stats for ${user.location} as of 4:30 pm PST today:\nNew Cases: ${stat.newCases}\nNew Deaths: ${stat.newDeaths}\nNew Recovered: ${stat.newRecovered}`.trim();

// use models instead of hitting API to find all users and get latest stats
Promise.all([
  User.find(),
  Stats.getLatest()
])
// send an SMS to each user and wait for all messages to get sent
  .then(([users, stats]) => {
    return Promise.all(users.map(user => {
      const stat = stats.find(stat => stat.location === user.location);
      return user.sendSms(template(user, stat));
    }));
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;
// const client = require('twilio')(accountSid, authToken);
// const { getStats, getUsers } = require('./lib/utils/API-services'); 
// const outgoingSmsHandler = require('./lib/utils/sms-handler');

// getUsers()
//   .then(users => {
//     return Promise.all(users.map(user => Promise.all([user, getStats(user.location)])));
//   })
//   .then(userStats => Promise.all(userStats.map(([user, stats]) => {
//     return outgoingSmsHandler(user.phoneNumber, template(user, stats));
//   })));






// getUsers()
//   .then(res => {
//     return res.body.forEach(user => {
//       getStats(user.location)
//         .then(res => {
//           console.log(res.body);
//           return client.messages
//             .create({
//               body: `
//               Here's your daily update from Social Distance-Ping!\nCOVID-19 stats for ${user.location} as of 4:30 pm PST today:\nNew Cases: ${res.body.newCases}\nNew Deaths: ${res.body.newDeaths}\nNew Recovered: ${res.body.newRecovered}`,
//               from: '+13094080627',
//               to: `+1${user.phoneNumber.replace('+1', '')}`
//             });
//         })
//         .then(message => console.log(message.sid));
//     });
//   });
