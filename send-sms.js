require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const request = require('superagent');

const phoneNumbers = [
  '9714092051',
  '6087124895',
  '9717320703',
  '6508041083',
  '5036628396'
];

// change to heroku url
const getStats = () => request.get('http://localhost:7890/api/v1/stats');

phoneNumbers.forEach(phoneNumber => {
  getStats()
    .then(res => {
      return client.messages
        .create({
          body: `New Cases: ${res.body[0].newCases} \n New Deaths: ${res.body[0].newDeaths}
          \n New Recovered: ${res.body[0].newRecovered}`,
          from: '+13094080627',
          to: `+1${phoneNumber}`
        });
    })
    .then(message => console.log(message.sid));
});


//create GET route for stats
//use superagent to hit GET route to pull data from mongo
//pass pulled mongo data into body of created message (line 9)
