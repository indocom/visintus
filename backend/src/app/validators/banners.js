const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createBanner = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: slugRegex
        }
      }
    };
    const schema = {
      id: 'banner',
      properties: {
        image_url: { type: 'string', pattern: validator.regexes.url }
      }
    };
    await validator.approve(paramSchema, req.params);
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        bannerId: { type: 'string', pattern: validator.regexes.objectID }
      }
    };
    await validator.approve(paramSchema, req.params);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
