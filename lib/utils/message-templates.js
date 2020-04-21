const dailyMessage = (user, location) => `
Here's your daily update from Social Distance-Ping!
COVID-19 stats for ${user.location} as of 4:30 pm PST today:
New Cases: ${location.newCases}
New Deaths: ${location.newDeaths}
New Recoveries: ${location.newRecovered}
`.trim();

const onDemandMessage = stats => `
Thanks for using Social Distance-Ping!
COVID-19 stats for ${stats.location} as of ${stats.time} on ${stats.date}:
New Cases: ${stats.newCases}
New Deaths: ${stats.newDeaths}
New Recoveries: ${stats.newRecovered}
`.trim();

module.exports = {
  dailyMessage,
  onDemandMessage
}