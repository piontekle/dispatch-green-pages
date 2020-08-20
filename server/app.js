require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('express-pino-logger')();

const app = express();
const routes = require('./api');
const db = require('./db');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);
app.use('/api', routes);

module.exports = app;
