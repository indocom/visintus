const express = require('express');

const router = express.Router({ mergeParams: true });
const usersController = require('../../app/controllers/users.js');
const representativesController = require('../../app/controllers/representatives.js');

router.post(
  '/',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin', 'superadmin']),
  representativesController.createRepresentative
);

router.post(
  '/:representativeId',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin', 'superadmin']),
  representativesController.updateRepresentative
);

router.delete(
  '/:representativeId',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin', 'superadmin']),
  representativesController.deleteRepresentative
);

module.exports = router;
