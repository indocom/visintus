const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createRepresentative = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        }
      }
    };
    const schema = {
      id: 'representative',
      properties: {
        name: { type: 'string' },
        description: { type: 'string', maxLength: 200 },
        photo_url: { type: 'string', pattern: validator.regexes.url }
      }
    };
    await validator.approve(paramSchema, req.params);
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deleteRepresentative = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        representativeId: {
          type: 'string',
          pattern: validator.regexes.objectID
        }
      }
    };
    await validator.approve(schema, req.params);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.updateRepresentative = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        representativeId: {
          type: 'string',
          pattern: validator.regexes.objectID
        }
      }
    };
    const schema = {
      id: 'representative',
      properties: {
        name: { type: 'string' },
        description: { type: 'string', maxLength: 200 },
        photo_url: { type: 'string' }
      }
    };
    await validator.approve(paramSchema, req.params);
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
