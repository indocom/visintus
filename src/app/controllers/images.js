const fs = require('fs');
const uuid = require('uuid');
const config = require('../../config');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils.js');

exports.upload = async (req, res) => {
  console.log(req);
  handleSuccess(res, buildSuccObject('https://source.unsplash.com/random'));
};
