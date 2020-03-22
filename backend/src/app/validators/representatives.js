const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createRepresentative = async (req, res, next) => {
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
        representative: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            description: { type: 'string', maxLength: 200 },
            photo_url: {
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

exports.deleteRepresentative = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        representativeId: {
          type: 'string',
          pattern: validator.regexes.representativeId
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

exports.updateRepresentative = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        slug: {
          type: 'string',
          pattern: validator.regexes.slug
        },
        representativeId: {
          type: 'string',
          pattern: validator.regexes.representativeId
        }
      },
      additionalProperties: false
    };

    const schemaBody = {
      properties: {
        representative: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            description: {
              type: 'string',
              pattern: validator.regexes.safeChars,
              maxLength: 200
            },
            photo_url: {
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
