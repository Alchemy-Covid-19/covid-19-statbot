require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const scraper = require('../lib/scrapers/stats-scraper');

expect.extend({
  toBeTypeOrNull(received, argument) {
    const pass = expect(received).toEqual(expect.any(argument));
    if(pass || received === null) {
      return {
        message: () => 'Ok',
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to be ${argument} type or null`,
        pass: false
      };
    }
  }
});

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
          totalCases: expect.any(Number),
          totalDeaths: expect.any(Number),
          newDeaths: expect.toBeTypeOrNull(Number),
          totalRecovered: expect.any(Number),
          newRecovered: expect.toBeTypeOrNull(Number),
          fatalityRate: expect.any(String),
          location: expect.any(String),
          newCases: expect.toBeTypeOrNull(Number),
          date: expect.any(String),
          __v: 0
        });
      });
  });
});

