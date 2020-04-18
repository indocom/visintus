const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const config = require('./../config');

const express = require('express');

// Serve front-end code
const distDir = path.join(__dirname, '../../dist');
router.use('/', express.static(distDir));

// Create directory to serve static images
const imagesDir = config.get('fileStorage.images')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, {recursive: true});
}

// Serve static images
router.use('/static/images', express.static(imagesDir));

// Server API
router.use('/api', require('./api'));

// By default, always serve index.html file
router.get('/*', function (req, res) {
  res.sendFile(path.join(distDir, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send();
});

module.exports = router;
