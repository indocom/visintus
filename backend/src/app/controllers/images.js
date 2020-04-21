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
} = require('../middleware/utils');

exports.upload = async (req, res) => {
  var fileName;
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, config.get('fileStorage.images'));
    },
    filename: function(req, file, cb) {
      fileName = uuid.v4() + path.extname(file.originalname);
      cb(null, fileName);
    }
  });
  const upload = multer({ storage: storage }).single('file');

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      handleError(res, buildErrObject(500, err.message));
    } else if (err) {
      handleError(res, buildErrObject(500, err.message));
    } else {
      handleSuccess(
        res,
        buildSuccObject({
          image: {
            url: config.get('host') + '/static/images/' + fileName
          }
        })
      );
    }
  });
};

exports.unlink = async (req, res) => {
  const fileName = path.parse(req.body.image.url).base;
  const filePath = path.join(config.get('fileStorage.images'), fileName);

  fs.unlink(filePath, err => {
    if (err) handleError(res, buildErrObject(err.message));
    else
      handleSuccess(
        res,
        buildSuccObject('Image has been successfully removed')
      );
  });
};
