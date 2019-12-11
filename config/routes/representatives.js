var express = require('express');
var router = express.Router({ mergeParams: true });

const representativesController = require('../../app/controllers/representatives.js');

router.post('/', representativesController.createRepresentative);
router.post('/:representativeId', representativesController.updateRepresentative);
router.delete('/:representativeId', representativesController.deleteRepresentative);

module.exports = router;
