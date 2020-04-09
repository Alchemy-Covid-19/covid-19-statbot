const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const connect = require('./connect');

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
