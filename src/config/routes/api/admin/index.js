const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/highlights', require('./highlights'));
router.use('/users', require('./users'));

module.exports = router;
