require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const request = require('superagent');

const getStats = location => request.get(`https://covid-19-stat-production.herokuapp.com/api/v1/stats/${location}`);

const getUsers = () => request.get('https://covid-19-stat-production.herokuapp.com/api/v1/users');

getUsers()
  .then(res => {
    return res.body.forEach(user => {
      getStats(user.location)
        .then(res => {
          return client.messages
            .create({
              body: `
              Daily stats for ${user.location} as of 4:30 pm PST today:\nNew Cases: ${res.body[0].newCases}\nNew Deaths: ${res.body[0].newDeaths}\nNew Recovered: ${res.body[0].newRecovered}`,
              from: '+13094080627',
              to: `+1${user.phoneNumber}`
            });
        })
        .then(message => console.log(message.sid));
    });
  });
