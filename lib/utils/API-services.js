const request = require('superagent');

const getStats = location => request
  .get(`${process.env.API_URL}/api/v1/stats/${location}`)
  .then(res => res.body);

const getUsers = () => request
  .get(`${process.env.API_URL}/api/v1/users`)
  .then(res => res.body);

module.exports = { getStats, getUsers };
