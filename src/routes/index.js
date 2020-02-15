const router = require('express').Router();

router.options('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, \
    Access-Control-Allow-Origin, Access-Control-Allow-Headers, \
    Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.send(200);
});

router.get('/', (req, res) => {
  res.send('Welcome to visintus API!\n');
});

router.use('/', require('./api'));

module.exports = router;
