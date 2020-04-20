const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const User = require('../models/User');

const template = stats => `
Thanks for using Social Distance-Ping!
COVID-19 stats for ${stats.location} as of ${stats.time} on ${stats.date}:
New Cases: ${stats.newCases}
New Deaths: ${stats.newDeaths}
New Recovered: ${stats.newRecovered}
`.trim();

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
