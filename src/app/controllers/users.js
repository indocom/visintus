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
          resolve(user); // returns mongoose object
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
      if (err) reject(buildErrObject(422, err.message));
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
    console.log(user);
    const isPasswordMatch = await auth.checkPassword(
      user,
      req.body.user.password
    );

    if (!isPasswordMatch) {
      handleError(res, buildErrObject(409, 'Authentication failed'));
    } else {
      // password is correct, all ok. register access and returns token
      const token = await generateAccessToken(user);

      handleSuccess(
        res,
        buildSuccObject({
          user: {
            name: user.name,
            initials: user.name[0],
            email: user.email,
            role: user.role
          },
          token
        })
      );
    }
  } catch (err) {
    // to prevent attackers from identifying valid users
    // change the err message to 'Authentication failed'
    handleError(res, err);
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
    UserMailer.verifyRegistration(user)
      .then((info, response) => {
        handleSuccess(
          res,
          buildSuccObject('User has been created. Please verify your email!')
        );
      })
      .catch(err => handleError(err, buildErrObject(422, err.message)));
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.verify = async (req, res) => {
  User.findOne({
    _id: req.body.user.verificationId,
    email: req.body.user.email
  })
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
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

/* Forgot password function called by route */
exports.forgotPassword = async (req, res) => {
  try {
    const user = await findVerifiedUserByEmail(req.body.user.email);
    const token = await generateResetPasswordToken(user);

    UserMailer.resetPassword(user, token)
      .then((info, response) => {
        handleSuccess(
          res,
          buildSuccObject('An email to reset password has been sent')
        );
      })
      .catch(err => handleError(res, buildErrObject(err.message)));
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

/* Reset password function called by route */
exports.resetPassword = async (req, res) => {
  try {
    if (req.body.user.email != req.user.email) {
      handleError(
        res,
        buildErrObject(422, 'Invalid request to reset password')
      );
      return;
    }

    const user = await findVerifiedUserByEmail(req.user.email);
    await updatePassword(user, req.body.user.newPassword);
    handleSuccess(res, buildSuccObject('Password updated!'));
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

/* Signout called by route */
exports.logout = async (req, res) => {
  try {
    await invalidateToken(user);
    handleSuccess(res, buildSuccObject('User logged out'));
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.list = async (req, res) => {
  User.find()
    .select('-_id name email role')
    .lean()
    .then(users => handleSuccess(res, buildSuccObject(users)))
    .catch(err => handleError(res, buildErrObject(err.message)));
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
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};
