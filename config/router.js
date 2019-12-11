var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to visintus API!\n');
})

router.use('/categories', require('./routes/categories'));

module.exports = router;
