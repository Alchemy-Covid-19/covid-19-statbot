require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Stats = require('../lib/models/Stats');
const User = require('../lib/models/User');

describe('stats routes', () => {
  beforeAll(() => {
    connect();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets daily stats for the United States', () =>{
    return request(app)
      .get('/api/v1/stats')
      .then(res => {
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          date: expect.any(String),
          newDeaths: expect.any(String),
          newRecovered: expect.any(String),
          newCases: expect.any(String)
        });
      });
  });

  it('gets stats depending on location', async() => {
    const user = await User.create({
      location: 'New York',
      phoneNumber: '5036628396',
      firstName: 'Loki'
    });

    return request(app)
      .get(`/api/v1/stats/${user.location}`)
      .then(res => {
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          date: expect.any(String),
          newDeaths: expect.any(String),
          newRecovered: expect.any(String),
          newCases: expect.any(String)
        });
      });
  });

  it('gets daily stats for a specific location in response to a user text', () =>{
    return request(app)
      .post(`/api/v1/stats/${something.location}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          date: expect.any(String),
          newDeaths: expect.any(Number),
          newRecovered: expect.any(Number),
          newCases: expect.any(Number)
        });
      });
  });
});
