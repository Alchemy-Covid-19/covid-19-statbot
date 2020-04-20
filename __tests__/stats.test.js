require('dotenv').config();
require('../lib/utils/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const scrape = require('../lib/scrapers/stats-scraper');
const User = require('../lib/models/User');

describe('stats routes', () => {
  beforeAll(() => {
    return scrape();
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
        expect(res.body).toEqual({
          _id: expect.any(String),
          date: expect.any(String),
          time: expect.any(String),
          newDeaths: expect.any(String),
          newRecovered: expect.any(String),
          newCases: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  // it('gets daily stats for a specific location in response to a user text', () =>{
  //   return request(app)
  //     .post(`/api/v1/stats/${something.location}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         date: expect.any(String),
  //         time: expect.any(String),
  //         newDeaths: expect.any(Number),
  //         newRecovered: expect.any(Number),
  //         newCases: expect.any(Number)
  //       });
  //     });
  // });
});
