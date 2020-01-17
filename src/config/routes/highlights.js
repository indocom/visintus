const express = require('express');

const router = express.Router();
const usersController = require('../../app/controllers/users.js');
const highlightsController = require('../../app/controllers/highlights.js');

router.get('/', highlightsController.getAllHighlights);

router.post(
  '/',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin']),
  highlightsController.createHighlight
);

router.post(
  '/:highlightId',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin']),
  highlightsController.updateHighlight
);

router.delete(
  '/:highlightId',
  usersController.requireAuth,
  usersController.roleAuthorization(['admin']),
  highlightsController.deleteHighlight
);

module.exports = router;
