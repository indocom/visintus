const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createHighlight = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        highlight: {
          properties: {
            image_url: {
              type: 'string',
              format: 'uri'
            },
            description: {
              type: 'string',
              pattern: validator.regexes.safeChars,
              maxLength: 200
            },
            hyperlink: {
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

exports.deleteHighlight = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        highlightId: {
          type: 'string',
          pattern: validator.regexes.highlightId
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

exports.getAllHighlights = async (req, res, next) => {
  next();
};

exports.updateHighlight = async (req, res, next) => {
  try {
    const schemaParams = {
      properties: {
        highlightId: {
          type: 'string',
          pattern: validator.regexes.highlightId
        },
        additionalProperties: false
      }
    };

    const schemaBody = {
      properties: {
        highlight: {
          properties: {
            image_url: {
              type: 'string',
              format: 'uri'
            },
            description: {
              type: 'string',
              pattern: validator.regexes.safeChars,
              maxLength: 200
            },
            hyperlink: {
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
