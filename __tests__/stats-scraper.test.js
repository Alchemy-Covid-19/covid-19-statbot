require('dotenv').config();
const mongoose = require('mongoose');

const connect = require('../lib/utils/connect');
const scraper = require('../lib/scrapers/stats-scraper');


describe('scraper routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
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
          newDeaths: expect.any(Number),
          totalRecovered: expect.any(Number),
          newRecovered: (expect.any(Number) || expect.toBeNull()),
          fatalityRate: expect.any(String),
          location: expect.any(String),
          newCases: (expect.any(Number) || expect.toBeNull()),
          date: expect.any(String),
          __v: 0
        });
      });
  });
});

