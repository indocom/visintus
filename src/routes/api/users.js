const router = require('express').Router();
const auth = require('../../app/middleware/auth');
const UsersController = require('../../app/controllers/users');
const UsersValidator = require('../../app/validators/users');

/*
 * Register route
 */
router.post('/register', UsersValidator.register, UsersController.register);

/*
 * Verify route
 */
router.post('/verify', UsersValidator.verify, UsersController.verify);

/*
 * Request forgot password
 */
router.post(
  '/forgot-password',
  UsersValidator.forgotPassword,
  UsersController.forgotPassword
);

/*
 * Reset password route
 */
router.post(
  '/reset',
  UsersValidator.resetPassword,
  UsersController.resetPassword
);

/*
 * Login route
 */
router.post('/login', UsersValidator.login, UsersController.login);

/*
 * Logout route
 */
router.post(
  '/logout',
  auth.requireAuth,
  UsersValidator.logout,
  UsersController.logout
);

module.exports = router;
