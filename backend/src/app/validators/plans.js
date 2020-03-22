const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createPlan = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        }
      },
      additionalProperties: false
    };

    const schemaBody = {
      properties: {
        plan: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            description: {
              type: 'string',
              pattern: validator.regexes.safeChars,
              maxLength: 200
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

exports.deletePlan = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        planId: {
          type: 'string',
          pattern: validator.regexes.planId
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

exports.updatePlan = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        planId: {
          type: 'string',
          pattern: validator.regexes.planId
        }
      },
      additionalProperties: false
    };

    const schemaBody = {
      properties: {
        plan: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            description: {
              type: 'string',
              pattern: validator.regexes.safeChars,
              maxLength: 200
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
