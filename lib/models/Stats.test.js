const mongoose = require('mongoose');
const Stats = require('./Stats');

describe('Stats model', () => {
  it('has a totalCases field', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.totalCases.message).toEqual('Path `totalCases` is required.');
  });

  it('has totalCases, newCases, totalDeaths, newDeaths, activeCases, totalTests and location fields', () => {
    const stats = new Stats({
      location: 'Test',
      totalCases: '1000',
      newCases: '100',
      totalDeaths: '1000',
      newDeaths: '100',
      activeCases: '1000',
      totalTests: '100'
    });

    expect(stats.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      location: 'Test',
      totalCases: '1000',
      newCases: '100',
      totalDeaths: '1000',
      newDeaths: '100',
      activeCases: '1000',
      totalTests: '100'
    });
  });
});
