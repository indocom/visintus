const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../app/models/user');
const auth = require('../app/middleware/auth');

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
    // Decrypts token
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
