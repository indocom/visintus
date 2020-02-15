const router = require('express').Router({ mergeParams: true });
const RepresentativesController = require('../../../../app/controllers/representatives');
const RepresentativesValidator = require('../../../../app/validators/representatives');

router.post(
  '/',
  RepresentativesValidator.createRepresentative,
  RepresentativesController.createRepresentative
);

router.post(
  '/:representativeId',
  RepresentativesValidator.updateRepresentative,
  RepresentativesController.updateRepresentative
);

router.delete(
  '/:representativeId',
  RepresentativesValidator.deleteRepresentative,
  RepresentativesController.deleteRepresentative
);

module.exports = router;
