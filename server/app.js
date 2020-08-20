require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
const routes = require('./api');
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use('/api', routes);

module.exports = app;
