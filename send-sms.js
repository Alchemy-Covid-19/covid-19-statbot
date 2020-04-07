require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Would you like to know some COVID-19 stats?',
    from: '+12017338240',
    to: '+17274575903'
  })
  .then(message => console.log(message.sid));


//create GET route for stats
//use superagent to hit GET route to pull data from mongo
//pass pulled mongo data into body of created message (line 9)
