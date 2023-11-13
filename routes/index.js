// import {ManageAccount} from '../js/services/firebase-auth.js'

var express = require('express');
var router = express.Router();


const fs = require('fs');
const apartments = JSON.parse(fs.readFileSync('./views/apartments.json'));
// '../../js/apartments.json'



/* GET home page. */
router.get('/', function (req, res, next) {
  // session = await ManageAccount.authenticate()
  res.render('home', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/analitycs', function (req, res, next) {
  res.render('analitycs', { title: 'Express' });
});

router.get('/add_property', function (req, res, next) {
  res.render('add_property', { title: 'Express' });
});

router.get('/property_detail', function (req, res, next) {
  res.render('property_detail', { title: 'Express' });
});

router.get('/properties_list', function (req, res, next) {
  res.render('properties_list', { apartments });
});
module.exports = router;
