var express = require('express');
var router = express.Router();

const categoriesController = require('../../app/controllers/categories.js');

router.get('/', categoriesController.getCategoryList);
router.post('/', categoriesController.createCategory);
router.get('/:slug', categoriesController.getCategoryInfo);
router.post('/:slug', categoriesController.updateCategory);
router.delete('/:slug', categoriesController.deleteCategory);
router.delete('/plan-info', categoriesController.getPlansInfo);

const bannersRouter = require('./banners.js');
const plansRouter = require('./plans.js');
const representativesRouter = require('./representatives.js');

router.use('/:slug/banners', bannersRouter);
router.use('/:slug/plans', plansRouter);
router.use('/:slug/representatives', representativesRouter);

module.exports = router;
