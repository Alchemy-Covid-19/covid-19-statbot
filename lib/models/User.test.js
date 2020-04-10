const mongoose = require('mongoose');
const User = require('./User');

describe('User model', () => {
  it('has a location field', () => {
    const user = new User();
    const { errors } = user.validateSync();

    expect(errors.location.message).toEqual('Path `location` is required.');
  });

  it('has a phoneNumber field', () => {
    const user = new User();
    const { errors } = user.validateSync();

    expect(errors.phoneNumber.message).toEqual('Path `phoneNumber` is required.');
  });

  it('has phoneNumber, location, and firstName fields', () => {
    const user = new User({
      location: 'Oregon',
      phoneNumber: '7274575903',
      firstName: 'Jenna'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      location: 'Oregon',
      phoneNumber: '7274575903',
      firstName: 'Jenna'
    });
  });
});
