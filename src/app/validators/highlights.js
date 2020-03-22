const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.createHighlight = async (req, res, next) => {
  try {
    const schema = {
      id: 'highlight',
      properties: {
        image_url: { type: 'string', pattern: validator.regexes.url },
        description: { type: 'string', maxLength: 200 },
        hyperlink: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deleteHighlight = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        highlightId: { type: 'string', pattern: validator.regexes.objectID }
      }
    };
    await validator.approve(paramSchema, req.params);
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
    const paramSchema = {
      properties: {
        highlightId: { type: 'string', pattern: validator.regexes.objectID }
      }
    };
    const schema = {
      id: 'highlight',
      properties: {
        image_url: { type: 'string', pattern: validator.regexes.url },
        description: { type: 'string', maxLength: 200 },
        hyperlink: { type: 'string' }
      }
    };
    await validator.approve(paramSchema, req.params);
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
