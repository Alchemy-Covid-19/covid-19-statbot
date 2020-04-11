const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const User = require('../models/User');

// you can make multi-line strings with `
const template = stats => `
Thanks for using Social Distance-Ping!
COVID-19 stats for for ${stats.location} as of ${stats.time} on ${stats.date}:
New Cases: ${stats.newCases}
New Deaths: ${stats.newDeaths}
New Recovered: ${stats.newRecovered}
`.trim();

const handleStop = ({ From }) => {
  return User
    .findOneAndDelete({ phoneNumber: From })
    .then(user => {
      const twiml = new MessagingResponse();
      // handle if there is no user
      twiml.message(`${user ? user.firstName: 'Thanks'}, you have been unsubscribed from Social Distance-Pings.`);
      return twiml.toString();
    });
}

const handleLocation = ({ Body }) => {
  return Stats
      .findOne({ location: new RegExp(Body.trim(), 'i') })
      .select({ createdAt: true, location: true, newCases: true, newDeaths: true, newRecovered: true })
      // use Twilio API to send a text
      .then(stats => {
        const twiml = new MessagingResponse();
        if(stat) twiml.message(template(stats));
        else twiml.message(`Unrecognized location: ${Body}`);

        return twiml.toString();
      })
}

// as you have more sms keywords to handle you can add additional
// key value pairs here
const handlers = {
  stop: handleStop,
  default: handleLocation
}

// picks a handler function based on the body of the message
const incomingSmsHandler = message => {
  const keyword = message.Body.trim().toLowerCase();
  const handler = handlers[keyword] || handlers.default;
  return handler(message);
};

const outgoingSmsHandler = (to, message) => {
  return client.messages
    .create({
      body: message,
      from: '+15034835572',
      to: `+1${to.replace('+1', '')}`
    });
}

module.exports = {
  handleStop,
  handleLocation,
  incomingSmsHandler,
  outgoingSmsHandler
}
