const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.checkoutPlans = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        orderInfo: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            email: {
              type: 'string',
              format: 'email'
            },
            visitDate: {
              type: 'string',
              format: 'date' // YYYY-MM-DD
            },
            organization: {
              type: 'string',
              pattern: validator.regexes.name
            },
            remarks: {
              type: 'string',
              pattern: validator.regexes.safeChars
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

exports.createCategory = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        category: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            logo_url: {
              type: 'string',
              format: 'uri'
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

    await validator.approve(schemaBody, req.body);

    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deleteCategory = async (req, res, next) => {
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

    await validator.approve(schemaParams, req.params);

    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.getCategoryInfo = async (req, res, next) => {
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

    await validator.approve(schemaParams, req.params);

    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.getCategoryList = async (req, res, next) => {
  next();
};

exports.getPlansInfo = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        categories: {
          patternProperties: {
            '[\\w-]': {
              type: 'array',
              items: {
                type: 'string',
                pattern: validator.regexes.planId
              }
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

exports.updateCategory = async (req, res, next) => {
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
        category: {
          properties: {
            name: { type: 'string' },
            logo_url: {
              type: 'string',
              format: 'uri'
            },
            description: { type: 'string', maxLength: 200 }
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
