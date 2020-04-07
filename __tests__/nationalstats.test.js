require('dotenv').config();
const mongoose = require('mongoose');

const connect = require('../lib/utils/connect');
const scraper = require('../lib/scrapers/stats-scraper');


describe('national scraper routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a national scrape', () => {
    return scraper()
      .then(res => {
        console.log(res[0]);
        expect(res[0].toJSON()).toEqual({
          _id: expect.any(Object),
          totalCases: expect.any(Number),
          totalDeaths: expect.any(Number),
          newDeaths: expect.any(String),
          totalRecovered: expect.any(Number),
          newRecovered: expect.any(String),
          fatalityRate: expect.any(String),
          location: expect.any(String),
          newCases: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          __v: 0
        });
      });
  });
});

