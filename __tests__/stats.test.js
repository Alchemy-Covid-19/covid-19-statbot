require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Stats = require('../lib/models/Stats');

describe('recipe routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets daily stats for the United States', () =>{
    return request(app)
      .get('/api/v1/stats')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          totalCases: expect.any(Number),
          totalDeaths: expect.any(Number),
          newDeaths: expect.any(Number),
          totalRecovered: expect.any(Number),
          newRecovered: expect.any(Number),
          fatalityRate: expect.any(String),
          location: expect.any(String),
          newCases: expect.any(Number),
          date: expect.any(String),
          __v: 0
        });
      });
  });
});
