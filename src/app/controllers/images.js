const fs = require('fs');
const uuid = require('uuid');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils.js');

exports.upload = async (req, res) => {
  handleSuccess(req, buildSuccObject('https://source.unsplash.com/random'));
};
