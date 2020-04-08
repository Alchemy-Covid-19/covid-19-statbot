require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const request = require('superagent');

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

const getStats = () => request.get('http://localhost:7890/api/v1/stats');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  const twiml = new MessagingResponse();

  if(req.body.Body == 'United States') {
    getStats()
      .then(res => {
        return client.messages
          .create({
            body: `New Cases: ${res.body[0].newCases} \n New Deaths: ${res.body[0].newDeaths}
        \n New Recovered: ${res.body[0].newRecovered}`,
            from: '+13094080627',
            to: '+19717320703'
          });
      });
  } else {
    twiml.message(
      'No Body param match, Twilio sends this in the request to your server.'
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
