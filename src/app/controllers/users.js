const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const passport = require('passport');
const { addHours } = require('date-fns');
const { matchedData } = require('express-validator');

const User = require('../models/user');
const UserAccess = require('../models/userAccess');
const ForgotPassword = require('../models/forgotPassword');
const utils = require('../middleware/utils');
const auth = require('../middleware/auth');
const emailer = require('../middleware/emailer');

require('../../config/passport');

const HOURS_TO_BLOCK = 2;
const LOGIN_ATTEMPTS = 5;

/*********************
 * Private functions *
 *********************/

/*
Generates a token
*/
const generateToken = user => {
  // Gets expiration time
  const expiration =
    Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES;

  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign(
      {
        data: { _id: user },
        exp: expiration
      },
      process.env.JWT_SECRET
    )
  );
};

/* Creates an object with user info */

const setUserInfo = data => {
  let user = {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
    verified: data.verified
  };

  // For testing purposes
  if (process.env.NODE_ENV !== 'production') {
    user = {
      ...user,
      verification: data.verification
    };
  }

  return user;
};

/* Blocks a user */

const blockUser = async user => {
  return new Promise((resolve, reject) => {
    user.blockExpires = addHours(new Date(), HOURS_TO_BLOCK);
    user.save((err, result) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message));
      }
      if (result) {
        resolve(utils.buildSuccObject(409, 'BLOCKED_USER'));
      }
    });
  });
};

/* Saves a new user access and then returns token */

const saveUserAccessAndReturnToken = async (req, user) => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email
    });
    userAccess.save(err => {
      if (err) {
        reject(utils.buildErrObject(422, err.message));
      }
      const userInfo = setUserInfo(user);
      // returns token
      resolve({
        token: generateToken(user._id),
        user: userInfo
      });
    });
  });
};

/* Saves login attempts to database */

const saveLoginAttemptsToDB = async user => {
  return new Promise((resolve, reject) => {
    user.save((err, result) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message));
      }
      if (result) {
        resolve(true);
      }
    });
  });
};

/* Checks permissions of a user */

const checkPermissions = async (data, next) => {
  return new Promise((resolve, reject) => {
    User.findById(data.id, (err, result) => {
      utils.itemNotFound(err, result, reject, 'NOT_FOUND');
      if (data.roles.indexOf(result.role) > -1) {
        return resolve(next());
      }
      return reject(utils.buildErrObject(422, 'UNAUTHORIZED'));
    });
  });
};

/* 
  Checks if login attempts are greater than the allowed restriction
  and also that blockexpires is less than now 
*/

const blockIsExpired = user =>
  user.loginAttempts > LOGIN_ATTEMPTS && user.blockExpires <= new Date();

const checkLoginAttemptsAndBlockExpires = async user => {
  return new Promise((resolve, reject) => {
    if (blockIsExpired(user)) {
      user.loginAttempts = 0;
      user.save((err, result) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message));
        }
        if (result) {
          resolve(true);
        }
      });
    } else {
      // User is not blocked, check password
      resolve(true);
    }
  });
};

/* Checks if blockExpires from user is greater than now */

const userIsBlocked = async user => {
  return new Promise((resolve, reject) => {
    if (user.blockExpires > new Date()) {
      reject(utils.buildErrObject(422, 'BLOCKED_USER'));
    }
    resolve(true);
  });
};

/* Finds user by email  */

const findUser = async email => {
  return new Promise((resolve, reject) => {
    User.findOne(
      { email },
      'password loginAttempts blockExpires name email role verified verification',
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'USER_DOES_NOT_EXIST');
        resolve(item);
      }
    );
  });
};

/* Finds user by Token */

const findUserByToken = async token => {
  return new Promise((resolve, reject) => {
    User.findOne(
      { token },
      'password loginAttemps blockExpires name email role verified verification token isTokenValid',
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'USER_DOES_NOT_EXIST');
        resolve(item);
      }
    );
  });
};

/* Adds one attempts to loginAttempts, if password does not match and 
    compares loginAttempts with the constant LOGIN_ATTEMPTS, if it is less 
    returns wrong password, else returns blockUser function */

const passwordsDoNotMatch = async user => {
  user.loginAttempts += 1;
  await saveLoginAttemptsToDB(user);
  return new Promise((resolve, reject) => {
    if (user.loginAttempts <= LOGIN_ATTEMPTS) {
      resolve(utils.buildErrObject(409, 'WRONG_PASSWORD'));
    } else {
      resolve(blockUser(user));
    }
    reject(utils.buildErrObject(422, 'ERROR'));
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

/* Builds the registration token */

const returnRegisterToken = (item, userInfo) => {
  if (process.env.NODE_ENV !== 'production') {
    userInfo.verification = item.verification;
  }
  const data = {
    token: generateToken(item._id),
    user: userInfo
  };
  return data;
};

/* Checks if verification id exists for user */

const verificationExists = async id => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        verification: id,
        verified: false
      },
      (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND_OR_ALREADY_VERIFIED');
        resolve(user);
      }
    );
  });
};

/* Verifies an user */

const verifyUser = async user => {
  return new Promise((resolve, reject) => {
    user.verified = true;
    user.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message));
      }
      resolve({
        email: item.email,
        verified: item.verified
      });
    });
  });
};

/* Updates a user password in database */

const updatePassword = async (password, user) => {
  return new Promise((resolve, reject) => {
    user.password = password;
    user.save((err, item) => {
      utils.itemNotFound(err, item, reject, 'NOT_FOUND');
      resolve(item);
    });
  });
};
/* Builds an object with created forgot password object */

const forgotPasswordResponse = item => {
  let data = {
    msg: 'RESET_EMAIL_SENT',
    email: item.email
  };
  if (process.env.NODE_ENV !== 'production') {
    data = {
      ...data,
      verification: item.verification
    };
  }
  return data;
};

/* Finds user by email */

const findUserToResetPassword = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, user) => {
      utils.itemNotFound(err, item, reject, 'NOT_FOUND');
      resolve(user);
    });
  });
};

/* Checks if a forgot password verification exists */

const findForgotPassword = async id => {
  return new Promise((resolve, reject) => {
    ForgotPassword.findOne(
      {
        verification: id,
        used: false
      },
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'NOT_FOUND_OR_ALREADY_USED');
        resolve(item);
      }
    );
  });
};

/* Marks a request to reset password as used */
const markResetPasswordAsUsed = async (req, forgot) => {
  return new Promise((resolve, reject) => {
    forgot.used = true;
    forgot.save((err, item) => {
      utils.itemNotFound(err, item, reject, 'NOT_FOUND');
      resolve(utils.buildSuccObject('PASSWORD_CHANGED'));
    });
  });
};

/* Save the new password through forgot password method */

const saveForgotPassword = async req => {
  return new Promise((resolve, reject) => {
    const forgot = new ForgotPassword({
      email: req.body.email,
      verification: uuid.v4()
    });
    forgot.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message));
      }
      resolve(item);
    });
  });
};

/* Updates a token for a particular user */

const updateToken = async (token, user) => {
  return new Promise((resolve, reject) => {
    user.token = token;
    user.isTokenValid = true;
    user.save((err, item) => {
      utils.itemNotFound(err, item, reject, 'NOT_FOUND');
      resolve(item);
    });
  });
};

/* Invalidates a token */

const invalidateToken = async user => {
  return new Promise((resolve, reject) => {
    user.isTokenValid = false;
    user.save((err, item) => {
      utils.itemNotFound(err, item, reject, 'ERROR');
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
    const user = await findUser(req.body.user.email);
    await userIsBlocked(user);
    await checkLoginAttemptsAndBlockExpires(user);
    const isPasswordMatch = await auth.checkPassword(
      req.body.user.password,
      user
    );

    if (!isPasswordMatch) {
      utils.handleError(res, await passwordsDoNotMatch(user));
    } else {
      // password is correct, all ok. register access and returns token
      user.loginAttempts = 0;
      const userAccess = await saveUserAccessAndReturnToken(req, user);
      await updateToken(userAccess.token, user);
      await saveLoginAttemptsToDB(user);
      utils.handleSuccess(
        res,
        utils.buildSuccObject({
          token: userAccess.token
        })
      );
    }
  } catch (error) {
    utils.handleError(res, error);
  }
};

/* Register / Sign-up called by route */

exports.register = async (req, res) => {
  try {
    //if(!doesEmailExists){
    const item = await registerUser(req.body.user);
    console.log(item);

    const userInfo = setUserInfo(item);
    const response = returnRegisterToken(item, userInfo);
    const user = await findUser(req.body.user.email);
    await updateToken(response.token, user);

    utils.handleSuccess(
      res,
      utils.buildSuccObject({
        token: response.token
      })
    );
    //}
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
  }
};

/* Verify function called by route */

exports.verify = async (req, res) => {
  try {
    // req = matchedData(req)
    const user = await verificationExists(req.id);
    utils.handleSuccess(await verifyUser(user));
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
  }
};

/* Forgot password function called by route */

exports.forgotPassword = async (req, res) => {
  try {
    const locale = req.getLocale();
    const data = matchedData(req);
    await findUser(data.email);
    const item = await saveForgotPassword(req);
    // emailer.sendResetPasswordEmailMessage(locale, item)
    // res.status(200).json(forgotPasswordResponse(item))
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

/* Authentication */

exports.requireAuth = async (req, res, next) => {
  passport.authenticate('jwt', (_, user, err) => {
    if (err)
      return utils.handleError(res, utils.buildErrObject(422, err.message));
    if (!user)
      return utils.handleError(res, utils.buildErrObject(422, 'Unknown user'));

    req.user = user;
    next();
  })(req, res, next);
};

// exports.requireAuth = passport.authenticate('jwt', { session: false });

/* Verify a role */

exports.roleAuthorization = roles => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    };
    await checkPermissions(data, next);
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
  }
};

/* Signout called by route */

exports.logout = async (req, res) => {
  try {
    const user = await findUserByToken(req.body.token);
    await invalidateToken(user);
    utils.handleSuccess(res, utils.buildSuccObject('User logged out'));
  } catch (error) {
    utils.handleError(res, utils.buildErrObject(422, error.message));
  }
};
