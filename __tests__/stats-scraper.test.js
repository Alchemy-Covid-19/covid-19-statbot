require('dotenv').config();
require('../lib/utils/data-helpers');
const scraper = require('../lib/scrapers/stats-scraper');

describe('scraper routes', () => {
  it('creates an object from scraped data', () => {
    return scraper()
      .then(res => {
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
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          __v: 0
        });
      });
  });
});

