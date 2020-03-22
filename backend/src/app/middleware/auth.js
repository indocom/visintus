const crypto = require('crypto');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const config = require('../../config');
const User = require('../models/user');
const { handleError, buildErrObject } = require('./utils');

const secret = Buffer.from(config.get('crypto.aes128cbc.secret'), 'hex');

/* Encrypts text */
exports.encrypt = text => {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-128-cbc', secret, iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

/* Decrypts text */
exports.decrypt = text => {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');

  let decipher = crypto.createDecipheriv('aes-128-cbc', secret, iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

const setupAuthJwt = () => {
  // extract token
  const extractor = req => {
    let token = null;
    if (req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '').trim();
    } else if (req.body.token) {
      token = req.body.token.trim();
    } else if (req.query.token) {
      token = req.query.token.trim();
    }
    if (token) {
      token = exports.decrypt(token);
    }
    return token;
  };

  // register to passport
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: extractor,
        secretOrKey: config.get('jwt.secret')
      },
      (payload, done) => {
        User.findById(payload.data._id, (err, user) => {
          if (err) return done(err);
          return user ? done(null, user) : done();
        });
      }
    )
  );
};

exports.setup = () => {
  setupAuthJwt();
};

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

/* 
  Authenticates user.
*/
exports.requireAuth = async (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return handleError(res, buildErrObject(401, 'Unauthenticated'));
    if (!user) return handleError(res, buildErrObject(401, 'Unauthenticated'));

    req.user = user;
    next();
  })(req, res, next);
};

/* 
  Verify user role(s). 
  `requireAuth` must precede this function.
*/
exports.roleAuthorization = roles => async (req, res, next) => {
  User.findById(req.user._id)
    .select('role')
    .lean()
    .then(user => {
      if (!user) {
        handleError(res, buildErrObject(401, 'Unauthenticated'));
      } else if (roles.indexOf(user.role) < 0) {
        handleError(res, buildErrObject(403, 'Unauthorized'));
      } else {
        return next();
      }
    })
    .catch(err => handleError(res, buildErrObject(403, 'Unauthorized')));
};
