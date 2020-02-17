const crypto = require('crypto');
const passport = require('passport');

const config = require('../../config');
const User = require('../models/user');

const algorithm = 'aes-256-ecb';
const secret = process.env.JWT_SECRET;
const { handleError, buildErrObject, itemNotFound } = require('./utils');

const JwtStrategy = require('passport-jwt').Strategy;

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

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = req => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.trim();
  } else if (req.body.token) {
    token = req.body.token.trim();
  } else if (req.query.token) {
    token = req.query.token.trim();
  }
  if (token) {
    token = auth.decrypt(token);
  }
  return token;
};

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET
};

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.data._id, (err, user) => {
    if (err) return done(err, false);
    return !user ? done(null, false) : done(null, user);
  });
});

passport.use(jwtLogin);

/* Checks if password matches */
exports.checkPassword = async (user, password) => {
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

/* Authentication */
exports.requireAuth = async (req, res, next) => {
  passport.authenticate('jwt', (_, user, err) => {
    if (err) return handleError(res, buildErrObject(422, err.message));
    if (!user) return handleError(res, buildErrObject(422, 'Unknown user'));

    req.user = user;
    next();
  })(req, res, next);
};

/* Verify a role */
exports.roleAuthorization = roles => async (req, res, next) => {
  User.findById(req.user._id)
    .select('role')
    .lean()
    .then(user => {
      if (!user) {
        handleError(res, buildErrObject(422, 'User not found'));
      } else if (roles.indexOf(user.role) < 0) {
        handleError(res, buildErrObject(422, 'Unauthorized'));
      } else {
        return next();
      }
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};
