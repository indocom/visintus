const fs = require('fs');
const uuid = require('uuid');
const config = require('../../config');
const multer = require('multer');
const path = require('path');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils.js');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '/../../../public/images'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage }).single('file');

exports.upload = async (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      handleError(res, buildErrObject(500, err));
    } else if (err) {
      handleError(res, buildErrObject(500, err));
    }
    handleSuccess(res, buildSuccObject(req.file));
  });
};
