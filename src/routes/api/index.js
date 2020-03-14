const router = require('express').Router();
const auth = require('../../app/middleware/auth');

const CategoriesController = require('../../app/controllers/categories');
const CategoriesValidator = require('../../app/validators/categories');

router.use(
  '/admin',
  auth.requireAuth,
  auth.roleAuthorization(['admin', 'superadmin']),
  require('./admin')
);

router.use('/categories', require('./categories'));
router.use('/highlights', require('./highlights'));
router.use('/users', require('./users'));
router.use('/images', require('./images'));

router.post(
  '/checkout',
  CategoriesValidator.checkoutPlans,
  CategoriesController.checkoutPlans
);

module.exports = router;
