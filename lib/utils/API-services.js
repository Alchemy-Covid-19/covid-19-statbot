const request = require('superagent');

const getStats = location => request.get(`https://covid-19-stat-production.herokuapp.com/api/v1/stats/${location}`);

const getUsers = () => request.get('https://covid-19-stat-production.herokuapp.com/api/v1/users');

module.exports = { getStats, getUsers };
