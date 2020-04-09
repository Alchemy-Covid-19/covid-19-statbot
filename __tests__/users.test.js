require('dotenv').config();
require('../lib/utils/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
// const { getUser } = require('../db/data-helpers');

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

  it('deletes a user by phone number', async() => {
    const user = await User.create({ 
      location: 'california', 
      phoneNumber: '0001234567',
      firstName: 'corona'
    });
    return request(app)
      .post('/api/v1/users/stop')
      .send({
        From: '0001234567'
      })
      .then(res => {
        expect(res.text).toEqual('<?xml version="1.0" encoding="UTF-8"?><Response><Message>corona, you have been unsubscribed from Pings</Message></Response>');
      });
  });
});
