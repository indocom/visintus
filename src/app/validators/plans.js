const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createPlan = async (req, res, next) => {
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
      id: 'plan',
      properties: {
        name: { type: 'string' },
        description: { type: 'string', maxLength: 200 }
      }
    };
    await validator.approve(paramSchema, req.params);
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        planId: { type: 'string', pattern: validator.regexes.objectID }
      }
    };
    await validator.approve(paramSchema, req.params);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        planId: { type: 'string', pattern: validator.regexes.objectID }
      }
    };
    const schema = {
      id: 'plan',
      properties: {
        name: { type: 'string' },
        description: { type: 'string', maxLength: 200 }
      }
    };
    await validator.approve(paramSchema, req.params);
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
