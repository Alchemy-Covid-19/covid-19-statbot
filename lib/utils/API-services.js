const request = require('superagent');

// the urls that you hit here are environment dependent (the url should change if you are in
// production, staging, or local). Make it an environment variable
const API_URL = process.env.API_URL;

const getStats = location => request
  .get(`${API_URL}/api/v1/stats/${location}`)
  .then(res => res.body);

const getUsers = () => request
  .get('${API_URL}/api/v1/users')
  .then(res => res.body);

module.exports = { getStats, getUsers };
