var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/analitycs', function(req, res, next) {
  res.render('analitycs', { title: 'Express' });
});

router.get('/add_property', function(req, res, next) {
  res.render('add_property', { title: 'Express' });
});

router.get('/property_detail', function(req, res, next) {
  res.render('property_detail', { title: 'Express' });
});

router.get('/properties', function(req, res, next) {
  res.render('properties', { title: 'Express' });
});
module.exports = router;
