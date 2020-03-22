const router = require('express').Router();
const HighlightsController = require('../../app/controllers/highlights');
const HighlightsValidator = require('../../app/validators/highlights');

router.get(
  '/',
  HighlightsValidator.getAllHighlights,
  HighlightsController.getAllHighlights
);

module.exports = router;
