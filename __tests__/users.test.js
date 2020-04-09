require('dotenv').config();
require('../lib/utils/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('users routes', () => {
  it('gets all users', async() => {
    const users = await User.create([{
      location: 'Oregon',
      phoneNumber: '9714092051',
      firstName: 'Dannie'
    }, {
      location: 'Florida',
      phoneNumber: '5036628396',
      firstName: 'Loki'
    }]);

    return request(app)
      .get('/api/v1/users')
      .then(res => {
        users.forEach(user => {
          expect(res.body).toContainEqual({
            location: user.location,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            _id: expect.any(String),
            __v: 0
          });
        });
      });
  });

  it('deletes a user', async() => {
    const user = await User.create({
      location: 'Colorado',
      phoneNumber: '9714092047',
      firstName: 'Butters'
    });

    return request(app)
      .delete(`/api/v1/users/${user._id}`)
      .then(res => {
        expect(res.body).toEqual(user);
      });
  });
});
