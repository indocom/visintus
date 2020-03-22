const router = require('express').Router();
const CategoriesController = require('../../../app/controllers/categories');
const CategoriesValidator = require('../../../app/validators/categories');

router.get(
  '/',
  CategoriesValidator.getCategoryList,
  CategoriesController.getCategoryList
);

router.get(
  '/:slug',
  CategoriesValidator.getCategoryInfo,
  CategoriesController.getCategoryInfo
);

router.post(
  '/',
  CategoriesValidator.createCategory,
  CategoriesController.createCategory
);

router.post(
  '/:slug',
  CategoriesValidator.updateCategory,
  CategoriesController.updateCategory
);

router.delete(
  '/:slug',
  CategoriesValidator.deleteCategory,
  CategoriesController.deleteCategory
);

router.use('/:slug/banners', require('./banners'));
router.use('/:slug/plans', require('./plans'));
router.use('/:slug/representatives', require('./representatives'));

module.exports = router;
