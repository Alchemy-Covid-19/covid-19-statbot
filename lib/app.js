const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/stats', require('./routes/stats'));
app.use('/api/v1/users', require('./routes/users'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
