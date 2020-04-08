require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const request = require('superagent');

// change to heroku url
const getStats = () => request.get('http://localhost:7890/api/v1/stats');

getStats()
  .then(res => {
    return client.messages
      .create({
        body: `New Cases: ${res.body[0].newCases} \n New Deaths: ${res.body[0].newDeaths}
        \n New Recovered: ${res.body[0].newRecovered}`,
        from: '+13094080627',
        to: '+17274575903'
      });
  })
  .then(message => console.log(message.sid));


//create GET route for stats
//use superagent to hit GET route to pull data from mongo
//pass pulled mongo data into body of created message (line 9)
