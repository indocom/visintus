const express = require('express');

const router = express.Router();
const usersController = require('../../app/controllers/users.js');

/*
 * Register route
 */
router.post('/register', usersController.register);

/*
 * Verify route
 */
router.post('/verify', usersController.verify);

/*
 * Forgot password route
 */
router.post('/forgot', usersController.forgotPassword);

/*
 * Reset password route
 */
router.post('/reset', usersController.forgotPassword);

/*
 * Login route
 */
router.post('/login', usersController.login);

/*
 * Signout route
 */
router.post('/logout', usersController.requireAuth, usersController.logout);

/*
 * List all users
 */
router.get(
  '/list',
  usersController.requireAuth,
  usersController.roleAuthorization(['superadmin']),
  usersController.list
);

/*
 * Update user role
 */
router.post(
  '/update-role',
  usersController.requireAuth,
  usersController.roleAuthorization(['superadmin']),
  usersController.updateRole
);

module.exports = router;
