const router = require('express').Router();
const HighlightsController = require('../../../app/controllers/highlights');
const HighlightsValidator = require('../../../app/validators/highlights');

router.get(
  '/',
  HighlightsValidator.getAllHighlights,
  HighlightsController.getAllHighlights
);

router.post(
  '/',
  HighlightsValidator.createHighlight,
  HighlightsController.createHighlight
);

router.post(
  '/:highlightId',
  HighlightsValidator.updateHighlight,
  HighlightsController.updateHighlight
);

router.delete(
  '/:highlightId',
  HighlightsValidator.deleteHighlight,
  HighlightsController.deleteHighlight
);

module.exports = router;
