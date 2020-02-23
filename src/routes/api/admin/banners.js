const router = require('express').Router({ mergeParams: true });
const BannersController = require('../../../app/controllers/banners');
const BannersValidator = require('../../../app/validators/banners');

router.post('/', BannersValidator.createBanner, BannersController.createBanner);

router.delete(
  '/:bannerId',
  BannersValidator.deleteBanner,
  BannersController.deleteBanner
);

module.exports = router;
