var express = require('express');
var router = express.Router({ mergeParams: true });

const plansController = require('../../app/controllers/plans.js');

router.post('/', plansController.createPlan);
router.post('/:planId', plansController.updatePlan);
router.delete('/:planId', plansController.deletePlan);

module.exports = router;
