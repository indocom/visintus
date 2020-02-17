const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { addHours } = require('date-fns');

const auth = require('../middleware/auth');
const config = require('../../config');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils.js');

const User = require('../models/user');
const ForgotPassword = require('../models/forgotPassword');

/*********************
 * Private functions *
 *********************/

/* Finds user by email  */
const findVerifiedUserByEmail = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .select(
        'password loginAttempts blockExpires name email role verification'
      )
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

/* Generates a token */
const generateAccessToken = user => {
  // Gets expiration time
  const expiration =
    Math.floor(Date.now() / 1000) + 60 * config.get('jwt.expiration');

  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign(
      {
        data: { _id: user },
        exp: expiration
      },
      config.get('jwt.secret')
    )
  );
};

/* Updates a token for a particular user */
const updateAccessToken = async (user, token) => {
  return new Promise((resolve, reject) => {
    user.accessToken = token;
    user.save((err, item) => {
      if (err) reject(buildErrObject(422, err.message));
      resolve(item);
    });
  });
};

/* Registers a new user in the database */
const registerUser = async user => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
      verification: uuid.v4()
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
const invalidateToken = async user => {
  return new Promise((resolve, reject) => {
    user.token = null;
    user.save((err, item) => {
      if (err) reject(buildErrObject(422, err.message));
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
      handleError(res, buildErrObject(409, 'Password does not match'));
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
      buildSuccObject('User has been created! Please verify your email.')
    );
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

/* Verify function called by route */
exports.verify = async (req, res) => {
  try {
    // const user = await verificationExists(req.id);
    utils.handleSuccess(await verifyUser(req.body.user));
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
  }
};

/* Forgot password function called by route */
exports.forgotPassword = async (req, res) => {
  try {
    const userInfo = await findUser(req.body.user.email);
    const item = await saveForgotPassword(req.body.user);
    emailer.sendResetPasswordEmailMessage('en', userInfo);
    utils.handleSuccess(
      res,
      utils.buildSuccObject(forgotPasswordResponse(item))
    );
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
  }
};

/* Reset password function called by route */
exports.resetPassword = async (req, res) => {
  try {
    const data = matchedData(req);
    const forgotPassword = await findForgotPassword(data.id);
    const user = await findUserToResetPassword(forgotPassword.email);
    await updatePassword(data.password, user);
    const result = await markResetPasswordAsUsed(req, forgotPassword);
    utils.handleSuccess(res, utils.buildSuccObject(result));
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
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
