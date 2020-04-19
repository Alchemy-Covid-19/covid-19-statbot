const request = require('superagent');

const API_URL = process.env.API_URL;

const getStats = location => request
  .get(`${API_URL}/api/v1/stats/${location}`)
  .then(res => res.body);

const getUsers = () => request
  .get(`${API_URL}/api/v1/users`)
  .then(res => res.body);



module.exports = { getStats, getUsers };
