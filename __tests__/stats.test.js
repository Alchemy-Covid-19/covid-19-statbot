require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const { getStats } = require('../db/data-helpers');

describe('stats routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets daily stats for the United States', () =>{
    return request(app)
      .get('/api/v1/stats')
      .then(res => {
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          newDeaths: expect.any(Number),
          newRecovered: expect.any(Number),
          newCases: expect.any(Number)
        });
      });
  });

  it('gets daily stats for the user requested location', async() =>{
    const data = await getStats();
    return request(app)
      .get(`/api/v1/stats/${data.location}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          newDeaths: expect.any(Number),
          newRecovered: expect.any(Number),
          newCases: expect.any(Number)
        });
      });
  });

});
