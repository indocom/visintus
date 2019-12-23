var express = require('express');
var router = express.Router();

const categoriesController = require('../app/controllers/categories.js');

router.get('/', (req, res) => {
  res.send('Welcome to visintus API!\n');
})

router.get('/plan-info', categoriesController.getPlansInfo);

router.use('/categories', require('./routes/categories'));

module.exports = router;
