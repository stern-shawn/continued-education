const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber', {
    useMongoClient: true, // To get rid of the deprecation warning for connect() without config
  });
}

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
