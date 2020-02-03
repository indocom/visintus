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

module.exports = router;
