const request = require('supertest');
const app = require('../lib/app');


describe('national scraper routes', () => {
  it('creates a national scrape', () => {
    return request(app)
      .post('/api/v1/nationalstats')
      .send({
        totalNationalCases: 1,
        todayNewNationalCases: 2,
        totalNationalDeaths: 3,
        todayNewNationalDeaths: 4,
        totalNationalRecovered: 5,
        todayNewNationalRecovered: 6,
        todayNewNationalFatalityRate: 7
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          totalNationalCases: expect.any(Number),
          todayNewNationalCases: expect.any(Number),
          totalNationalDeaths: expect.any(Number),
          todayNewNationalDeaths: expect.any(Number),
          totalNationalRecovered: expect.any(Number),
          todayNewNationalRecovered: expect.any(Number),
          todayNewNationalFatalityRate: expect.any(Number)
        });
      });
  });
});

