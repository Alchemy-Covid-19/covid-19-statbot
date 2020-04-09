require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const scraper = require('../lib/scrapers/stats-scraper');

describe('scraper routes', () => {
  beforeAll(() => {
    connect();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates an object from scraped data', () => {
    return scraper()
      .then(res => {
        console.log(res[0]);
        expect(res[0].toJSON()).toEqual({
          _id: expect.any(Object),
          totalCases: expect.any(String),
          totalDeaths: expect.any(String),
          newDeaths: expect.any(String),
          totalRecovered: expect.any(String),
          newRecovered: expect.any(String),
          fatalityRate: expect.any(String),
          location: expect.any(String),
          newCases: expect.any(String),
          date: expect.any(String),
          __v: 0
        });
      });
  });
});

