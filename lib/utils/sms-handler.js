const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const outgoingSmsHandler = (to, message) => {
  return client.messages
    .create({
      body: message,
      from: '+13094080627',
      to: `+1${to.replace('+1', '')}`
    });
};


module.exports = {
  outgoingSmsHandler
};
