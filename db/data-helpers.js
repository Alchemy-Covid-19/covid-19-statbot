const request = require('superagent');
require('dotenv').config();
// const connect = require('../lib/utils/connect');
// const seed = require('../db/seed');
// const mongoose = require('mongoose');
// const fs = require('fs');

const getStats = () => request.get('http://localhost:7890/api/v1/stats');

const getStatsByLocation = (location) => request.get(`http://localhost:7890/api/v1/stats/${location}`);

// const getUser = async() => await request.get('http://localhost:7890/api/v1/users/').then(res => console.log(res.body));

module.exports = {
  getStats,
  getStatsByLocation
  // getUser
};
