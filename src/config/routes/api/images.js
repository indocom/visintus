const router = require('express').Router();
const auth = require('../../../app/middleware/auth');
const ImagesController = require('../../../app/controllers/images');
const ImagesValidator = require('../../../app/validators/images');

router.post(
  '/upload',
  auth.requireAuth,
  ImagesValidator.upload,
  ImagesController.upload
);

module.exports = router;
