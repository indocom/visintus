const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const auth = require('../middleware/auth');
const date = require('../middleware/date');

const config = require('../../config');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

const User = require('../models/user');
const UserMailer = require('../mailers/user_mailer');

/*********************
 * Private functions *
 *********************/

/* Finds user by email  */
const findVerifiedUserByEmail = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .select('name email role password isVerified')
      .then(user => {
        if (!user) {
          reject(buildErrObject(422, 'User does not exist'));
        } else if (!user.isVerified) {
          reject(buildErrObject(422, 'User has not been verified'));
        } else {
          resolve(item); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Creates a new access token for a particular user */
const generateAccessToken = async user => {
  // Computes expiration time
  const exp = date.getEpochSecond() + config.get('user.accessTokenExp');
  // Generates signed and encrypted token
  const token = auth.encrypt(
    jwt.sign({ data: { _id: user._id }, exp }, config.get('jwt.secret'))
  );

  return token;
};

const generateResetPasswordToken = async user => {
  return generateAccessToken(user);
};

/* Registers a new user in the database */
const registerUser = async user => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    });

    newUser.save((err, item) => {
      if (err) reject(utils.buildErrObject(422, err.message));
      resolve(item);
    });
  });
};

/* Checks User model if user with a specific email exists */
const isEmailRegistered = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, item) => {
      if (err) reject(buildErrObject(422, err.message));
      if (item) resolve(true);
      else resolve(false);
    });
  });
};

/* Invalidates a token */
const invalidateTokens = async user => {
  return new Promise((resolve, reject) => {
    user.accessToken = null;
    user.accessTokenExpiry = null;

    user.refreshToken = null;
    user.refreshTokenExpiry = null;

    user.save((err, item) => {
      if (err) reject(buildErrObject(422, err.message));
      resolve(item);
    });
  });
};

/* Updates a user password in database */
const updatePassword = async (user, newPassword) => {
  return new Promise((resolve, reject) => {
    user.password = newPassword;
    user.save((err, item) => {
      if (err) reject(buildErrObject(422, err.message));
      if (!item) reject(buildErrObject(422, 'User not found'));
      resolve(item);
    });
  });
};

/********************
 * Public functions *
 ********************/

/* Login function called by route */
exports.login = async (req, res) => {
  try {
    const user = await findVerifiedUserByEmail(req.body.user.email);
    const isPasswordMatch = await auth.checkPassword(
      user,
      req.body.user.password
    );

    if (!isPasswordMatch) {
      handleError(res, buildErrObject(409, 'Authentication failed'));
    } else {
      // password is correct, all ok. register access and returns token
      const token = generateAccessToken(user._id);
      await updateAccessToken(user, token);

      handleSuccess(
        res,
        buildSuccObject({
          user: {
            name: user.name,
            initials: user.name[0],
            email: user.email,
            role: user.role,
            verification: user.verification,
            token
          }
        })
      );
    }
  } catch (error) {
    // to prevent attackers from identifying valid users
    // change the error message to 'Authentication failed'
    handleError(res, error);
  }
};

/* Register / Sign-up called by route */
exports.register = async (req, res) => {
  try {
    if (await isEmailRegistered(req.body.user.email)) {
      handleError(res, buildErrObject(409, 'Email is already registered'));
      return;
    }

    const user = await registerUser(req.body.user);
    emailer.sendRegistrationEmailMessage(user);
    handleSuccess(
      res,
      buildSuccObject('User has been created. Please verify your email!')
    );
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.verify = async (req, res) => {
  User.find({ _id: req.body.user.id, email: req.body.user.email })
    .select('isVerified')
    .then(user => {
      if (!user) handleError(res, buildErrObject(422, 'Unknown user'));
      else if (user.isVerified)
        handleSuccess(res, buildSuccObject('User has been verified'));
      else {
        user.isVerified = true;
        user.save((err, item) => {
          if (err) handleError(res, buildErrObject(422, err.message));
          handleSuccess(res, buildSuccObject('User verified'));
        });
      }
    })
    .catch(error => handleError(res, buildErrObject(422, err.message)));
};

/* Forgot password function called by route */
exports.forgotPassword = async (req, res) => {
  try {
    const user = await findVerifiedUserByEmail(req.body.user.email);
    UserMailer.resetPassword(user);
    handleSuccess(
      res,
      buildSuccObject('An email to reset password has been sent')
    );
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

/* Reset password function called by route */
exports.resetPassword = async (req, res) => {
  try {
    const user = await findVerifiedUserByEmail(req.user.email);
    await updatePassword(user, req.body.user.newPassword);
    handleSuccess(res, buildSuccObject('Password updated!'));
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

/* Signout called by route */
exports.logout = async (req, res) => {
  try {
    await invalidateToken(user);
    handleSuccess(res, buildSuccObject('User logged out'));
  } catch (error) {
    handleError(res, buildErrObject(422, error.message));
  }
};

exports.list = async (req, res) => {
  User.find()
    .select('-_id name email role')
    .lean()
    .then(users => handleSuccess(res, buildSuccObject(users)))
    .catch(error => handleError(res, buildErrObject(error.message)));
};

exports.updateRole = async (req, res) => {
  User.updateOne({ email: req.body.user.email }, { role: req.body.user.role })
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Role updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'User not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};
