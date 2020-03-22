const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.checkoutPlans = async (req, res, next) => {
  try {
    const schema = {
      id: 'orderInfo',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        visitDate: { type: 'string' },
        organization: { type: 'string' },
        remarks: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const schema = {
      id: 'category',
      properties: {
        name: { type: 'string' },
        logo_url: { type: 'string', pattern: validator.regexes.url },
        description: { type: 'string', maxLength: 200 }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const schema = {
      properties: {
        slug: { type: 'string', pattern: validator.regexes.slug }
      }
    };
    await validator.approve(schema, req.params);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.getCategoryInfo = async (req, res, next) => {
  next();
};

exports.getCategoryList = async (req, res, next) => {
  try {
    const schema = {
      properties: {
        slug: { type: 'string', pattern: validator.regexes.slug }
      }
    };
    await validator.approve(schema, req.params);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.getPlansInfo = async (req, res, next) => {
  try {
    const schema = {
      id: 'categories',
      properties: {
        $slug: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const paramSchema = {
      properties: {
        slug: { type: 'string', pattern: validator.regexes.slug }
      }
    };
    const schema = {
      id: 'category',
      properties: {
        name: { type: 'string' },
        logo_url: { type: 'string', pattern: validator.regexes.url },
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
