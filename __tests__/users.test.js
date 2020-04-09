require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('users routes', () => {
  const mongod = new MongoMemoryServer();
  beforeAll(() => {
    return mongod.getUri()
      .then(uri => {
        return connect(uri);
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  afterAll(() => {
    return mongod.stop();
  });

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
});
