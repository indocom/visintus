const router = require('express').Router({ mergeParams: true });
const PlansController = require('../../../../app/controllers/plans');
const PlansValidator = require('../../../../app/validators/plans');

router.post('/', PlansValidator.createPlan, PlansController.createPlan);

router.post('/:planId', PlansValidator.updatePlan, PlansController.updatePlan);

router.delete(
  '/:planId',
  PlansValidator.deletePlan,
  PlansController.deletePlan
);

module.exports = router;
