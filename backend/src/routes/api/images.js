const router = require('express').Router();
const auth = require('../../app/middleware/auth');
const ImagesController = require('../../app/controllers/images');
const ImagesValidator = require('../../app/validators/images');

router.post(
  '/upload',
  auth.requireAuth,
  auth.roleAuthorization(['admin', 'superadmin']),
  ImagesValidator.upload,
  ImagesController.upload
);

router.post(
  '/unlink',
  auth.requireAuth,
  auth.roleAuthorization(['admin', 'superadmin']),
  ImagesValidator.unlink,
  ImagesController.unlink
);

module.exports = router;
