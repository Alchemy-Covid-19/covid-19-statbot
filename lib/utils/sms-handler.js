const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { onDemandMessage } = require('./message-templates');
const Stats = require('../models/Stats');

const outgoingSmsHandler = (to, message) => {
  return client.messages
    .create({
      body: message,
      from: '+13094080627',
      to: `+1${to.replace('+1', '')}`
    });
};

const handleLocation = ({ Body }) => {
  return Stats
    .findOne({ location: new RegExp(Body.trim(), 'i') })
    .select({ updatedAt: true, time: true, location: true, newCases: true, newDeaths: true, newRecovered: true })
    .then(stats => {
      const twiml = new MessagingResponse();
      if(stats) twiml.message(onDemandMessage(stats));
      else twiml.message(`Unrecognized location: ${Body}`);
      return twiml.toString();
    });
};

const handlers = {
  default: handleLocation
};

const incomingSmsHandler = message => {
  const keyword = message.Body.trim().toLowerCase();
  const handler = handlers[keyword] || handlers.default;
  return handler(message);
};

module.exports = {
  outgoingSmsHandler,
  incomingSmsHandler,
  handleLocation
};
