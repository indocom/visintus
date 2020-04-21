const config = require('../../config');

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
  // Prints error in console for development mode
  if (config.get('env') === 'development') {
    console.log(err);
  }
  // Sends error to user
  res.status(err.code).json({
    error: {
      message: err.message
    }
  });
};

exports.handleSuccess = (res, obj) => {
  // Prints response in console for development mode
  if (config.get('env') === 'development') {
    console.log(obj);
  }
  // Sends obj to user
  res.status(200).json(obj);
};

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  if (config.get('env') === 'development') {
    // return the original error message for development mode
    return {
      code,
      message
    };
  }

  switch (code) {
    case 400:
      return { code, message: 'Bad request' }
    case 401:
      return { code, message: 'Unauthorized' }
    case 403:
      return { code, message: 'Forbidden access' }
    case 409:
      return { code, message: 'Conflict' }
    case 422:
      return { code, message: 'Unprocessable entity' }
    case 500:
      return { code, message: 'Internal server error' }
    default:
      return { code: 501, message: 'Unexpected error occurred' }
  }
};

/**
 * Builds success object
 * @param {string} message - success text
 */
exports.buildSuccObject = message => {
  return {
    message
  };
};
