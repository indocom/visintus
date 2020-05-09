const { buildErrObject, handleError } = require('../middleware/utils');

const validator = require('../middleware/validator');

exports.forgotPassword = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        user: {
          properties: {
            email: {
              type: 'string',
              format: 'email'
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

exports.list = async (req, res, next) => {
  next();
};

exports.login = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        user: {
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
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

exports.logout = async (req, res, next) => {
  next();
};

exports.register = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        user: {
          properties: {
            name: {
              type: 'string',
              pattern: validator.regexes.name
            },
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
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

exports.resetPassword = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        user: {
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            newPassword: {
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

exports.updateRole = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        user: {
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin']
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

exports.verify = async (req, res, next) => {
  try {
    const schemaBody = {
      properties: {
        user: {
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            verificationId: {
              type: 'string',
              pattern: validator.regexes.verificationId
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

exports.whoami = async (req, res, next) => {
  next();
};
