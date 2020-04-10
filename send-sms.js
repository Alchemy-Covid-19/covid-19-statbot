require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { getStats, getUsers } = require('./lib/utils/API-services');

getUsers()
  .then(res => {
    return res.body.forEach(user => {
      getStats(user.location)
        .then(res => {
          console.log(res.body);
          return client.messages
            .create({
              body: `
              Here's your daily update from Social Distance-Ping!\nCOVID-19 stats for ${user.location} as of 4:30 pm PST today:\nNew Cases: ${res.body.newCases}\nNew Deaths: ${res.body.newDeaths}\nNew Recovered: ${res.body.newRecovered}`,
              from: '+13094080627',
              to: `+1${user.phoneNumber.replace('+1', '')}`
            });
        })
        .then(message => console.log(message.sid));
    });
  });
