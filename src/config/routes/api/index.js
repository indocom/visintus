const router = require('express').Router();
const auth = require('../../../app/middleware/auth');

router.use(
  '/admin',
  auth.requireAuth,
  auth.roleAuthorization(['admin', 'superadmin']),
  require('./admin')
);

router.use('/categories', require('./categories'));
router.use('/highlights', require('./highlights'));
router.use('/users', require('./users'));

module.exports = router;
