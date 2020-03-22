const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createBanner = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        additionalProperties: false
      },
      additionalProperties: false
    };

    const schemaBody = {
      properties: {
        banner: {
          properties: {
            image_url: {
              type: 'string',
              format: 'uri'
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    };

    await validator.approve(schemaParams, req.params);
    await validator.approve(schemaBody, req.body);

    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        bannerId: {
          type: 'string',
          pattern: validator.regexes.bannerId
        }
      },
      additionalProperties: false
    };

    await validator.approve(schemaParams, req.params);

    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
