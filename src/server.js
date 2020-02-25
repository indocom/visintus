// Set environment variables
require('dotenv').config();

// Load dependencies
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

// Setup application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Use logger for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Setup auth middleware
require('./app/middleware/auth').setup();

// Setup config routing
app.use('/', require('./routes'));

// Load config data
const config = require('./config');

const { setupDbConnection } = require('./app/middleware/db');
setupDbConnection(config.get('db'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send();
});

module.exports = app;
