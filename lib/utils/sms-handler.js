const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { onDemandMessage, invalidLocationMessage, stopMessage } = require('./message-templates');
const Stats = require('../models/Stats');
const User = require('../models/User');

// outgoing sms used in sendSms instance method on User model (for welcome and daily stats texts)
const outgoingSmsHandler = (to, message) => {
  return client.messages
    .create({
      body: message,
      // CHANGE THIS: need to modify 'from'; welcome message uses a different phone number than daily sms (welcome text #: '+15034835572')
      from: '+13094080627',
      to: `+1${to.replace('+1', '')}`
    });
};

// if user sends location, reply with stats (send error message if invalid)
const handleLocation = ({ Body }) => {
  return Stats
    .findOne({ location: new RegExp(Body.trim(), 'i') })
    .select({ updatedAt: true, time: true, location: true, newCases: true, newDeaths: true, newRecovered: true })
    .then(stats => {
      const twiml = new MessagingResponse();
      if(stats) twiml.message(onDemandMessage(stats));
      else twiml.message(invalidLocationMessage(Body));
      return twiml.toString();
    });
};

// if user sends 'stop', remove from database and reply with acknowledgement
const handleStop = ({ From }) => {  
  return User
    .findOneAndDelete({ phoneNumber: From })
    .then(user => {
      const twiml = new MessagingResponse();
      twiml.message(stopMessage(user));
      return twiml.toString();
    });
};

const handlers = {
  stop: handleStop,
  default: handleLocation
};

// execute function depending on the message a user sends
const incomingSmsHandler = message => {
  const keyword = message.Body.trim().toLowerCase();
  const handler = handlers[keyword] || handlers.default;
  return handler(message);
};

module.exports = {
  outgoingSmsHandler,
  incomingSmsHandler
};
