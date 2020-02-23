const router = require('express').Router();
const auth = require('../../../app/middleware/auth');
const UsersController = require('../../../app/controllers/users');
const UsersValidator = require('../../../app/validators/users');

/*
 * List all users
 */
router.get(
  '/list',
  auth.roleAuthorization(['superadmin']),
  UsersValidator.list,
  UsersController.list
);

/*
 * Update user role
 */
router.post(
  '/update-role',
  auth.roleAuthorization(['superadmin']),
  UsersValidator.updateRole,
  UsersController.updateRole
);

module.exports = router;
