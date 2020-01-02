const express = require('express');

const router = express.Router({ mergeParams: true });
const usersController = require('../../app/controllers/users.js');
const bannersController = require('../../app/controllers/banners');

router.post('/', 
  usersController.requireAuth, 
  usersController.roleAuthorization(['admin']),
  bannersController.createBanner
);

router.delete('/:bannerId', bannersController.deleteBanner);

module.exports = router;
