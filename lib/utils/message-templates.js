const dailyMessage = (user, location) => `
Here's your daily update from Social Distance-Ping!
COVID-19 stats for ${user.location} as of 4:30 pm PST today:
New Cases: ${location.newCases}
New Deaths: ${location.newDeaths}
Total Tests: ${location.totalTests}
`.trim();

const onDemandMessage = stats => `
Thanks for using Social Distance-Ping!
COVID-19 stats for ${stats.location} as of ${stats.time} on ${stats.date}:
New Cases: ${stats.newCases}
New Deaths: ${stats.newDeaths}
Total Tests: ${stats.totalTests}
`.trim();

const welcomeMessage = () => 'Thanks for signing up for Social Distance-Pings! You will receive up-to-date stats at 5pm PST every day.';

const invalidLocationMessage = textBody => `Unrecognized location: ${textBody}. Please use full state names.`;

const stopMessage = user => `${user ? user.firstName : 'Thanks'}, you have been unsubscribed from Social Distance-Pings.`;

module.exports = {
  dailyMessage,
  onDemandMessage,
  welcomeMessage,
  invalidLocationMessage,
  stopMessage
};
