var express = require('express');
var router = express.Router();
var dataController = require('../controllers/json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kopernik' });
});
//simple route for online checking
router.get('/ping', function(req, res, next) {
   res.send(JSON.stringify({pong: 'pong'}));
});
//our main route
router.post('/data', dataController);

module.exports = router;
