// Set environment variables
require('dotenv').config();

// Load dependencies
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

// Setup application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use logger for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Load config data
const config = require('./config');

// Setup DB connection
const { setupDbConnection } = require('./app/middleware/db');
setupDbConnection(config.get('db'));

// Setup auth middleware
require('./app/middleware/auth').setup();

// Setup config routing
app.use('/', require('./routes'));

module.exports = app;
