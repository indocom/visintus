const express = require('express');

const router = express.Router({ mergeParams: true });
const usersController = require('../../app/controllers/users.js');
const plansController = require('../../app/controllers/plans.js');

router.post('/',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin']),
  plansController.createPlan
);

router.post('/:planId',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin']),
  plansController.updatePlan
);

router.delete('/:planId',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin']),
  plansController.deletePlan
);

module.exports = router;
