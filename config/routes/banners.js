var express = require('express');
var router = express.Router({ mergeParams: true });

const bannersController = require('../../app/controllers/banners.js');

router.post('/', bannersController.createBanner);
router.delete('/:bannerId', bannersController.deleteBanner);

module.exports = router;
