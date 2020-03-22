const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.upload = async (req, res, next) => {
  next();
};

exports.unlink = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        image: {
          properties: {
            url: {
              type: 'string',
              format: 'uri'
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    };

    await validator.approve(schemaBody, req.body);

    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
