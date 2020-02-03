const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/user');

const algorithm = 'aes-256-ecb';
const secret = process.env.JWT_SECRET;
const { handleError, buildErrObject, itemNotFound } = require('./utils');

require('../../config/passport');

/* Checks if password matches */
exports.checkPassword = async (password, user) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }
      if (!isMatch) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

/* Encrypts text */
exports.encrypt = text => {
  const cipher = crypto.createCipher(algorithm, secret);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

/* Decrypts text */
exports.decrypt = text => {
  const decipher = crypto.createDecipher(algorithm, secret);
  try {
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (err) {
    return err;
  }
};

/* Authentication */
exports.requireAuth = async (req, res, next) => {
  passport.authenticate('jwt', (_, user, err) => {
    if (err) return handleError(res, buildErrObject(422, err.message));
    if (!user) return handleError(res, buildErrObject(422, 'Unknown user'));

    req.user = user;
    next();
  })(req, res, next);
};

/* Checks permissions of a user */
const checkPermissions = async (data, next) => {
  return new Promise((resolve, reject) => {
    User.findById(data.id, (err, result) => {
      itemNotFound(err, result, reject, 'NOT_FOUND');
      if (data.roles.indexOf(result.role) > -1) {
        return resolve(next());
      }
      return reject(buildErrObject(422, 'UNAUTHORIZED'));
    });
  });
};

/* Verify a role */
exports.roleAuthorization = roles => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    };
    await checkPermissions(data, next);
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};
