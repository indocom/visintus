const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.forgotPassword = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        email: { type: 'string', format: 'email' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.list = async (req, res, next) => {
  next();
};

exports.login = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.logout = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.register = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        email: { type: 'string', format: 'email' },
        newPassword: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        email: { type: 'string', format: 'email' },
        role: { type: 'string', enum: ['user', 'admin'] }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.verify = async (req, res, next) => {
  try {
    const schema = {
      id: 'user',
      properties: {
        email: { type: 'string', format: 'email' },
        verificationId: { type: 'string' }
      }
    };
    await validator.approve(schema, req.body);
    next();
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
