require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const request = require('superagent');
const express = require('express');

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const getStatsByLocation = require('./db/data-helpers');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


// dummy function to text US data when user texts United States
app.post('/', (req, res) => {
  const twiml = new MessagingResponse();

  const messageContent = getStatsByLocation(req.location)
    .then(res => {
      return client.messages
        .create({
          body: `New Cases: ${res.body[0].newCases} \n New Deaths: ${res.body[0].newDeaths}
        \n New Recovered: ${res.body[0].newRecovered}`,
          from: '+13094080627',
          to: '+16087124895'
        });
    });

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(7891, () => {
  console.log('Express server listening on port 7891');
});