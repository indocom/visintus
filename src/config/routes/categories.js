const express = require('express');

const router = express.Router();
const usersController = require('../../app/controllers/users.js');
const categoriesController = require('../../app/controllers/categories');

router.get('/', categoriesController.getCategoryList);

router.get('/:slug', categoriesController.getCategoryInfo);

router.post(
  '/',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin', 'superadmin']),
  categoriesController.createCategory
);

router.post(
  '/:slug',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin', 'superadmin']),
  categoriesController.updateCategory
);

router.delete(
  '/:slug',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin', 'superadmin']),
  categoriesController.deleteCategory
);

const bannersRouter = require('./banners.js');
const plansRouter = require('./plans.js');
const representativesRouter = require('./representatives.js');

router.use('/:slug/banners', bannersRouter);
router.use('/:slug/plans', plansRouter);
router.use('/:slug/representatives', representativesRouter);

module.exports = router;
