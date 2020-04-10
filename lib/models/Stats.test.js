const mongoose = require('mongoose');
const Stats = require('./Stats');

describe('Stats model', () => {
  it('has a totalCases field', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.totalCases.message).toEqual('Path `totalCases` is required.');
  });

  it('has totalCases, newCases, totalDeaths, newDeaths, totalRecovered, newRecovered, location, date, and time fields', () => {
    const stats = new Stats({
      totalCases: '1000',
      newCases: '100',
      totalDeaths: '1000',
      newDeaths: '100',
      totalRecovered: '1000',
      newRecovered: '100',
      location: 'Test',
      time: '16:30',
      date: 'Apr 09 2020'
    });

    expect(stats.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      totalCases: '1000',
      newCases: '100',
      totalDeaths: '1000',
      newDeaths: '100',
      totalRecovered: '1000',
      newRecovered: '100',
      location: 'Test',
      time: '16:30',
      date: 'Apr 09 2020'
    });
  });
});
