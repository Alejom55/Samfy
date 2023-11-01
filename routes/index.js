// import {ManageAccount} from '../js/services/firebase-auth.js'

var express = require('express');
var router = express.Router();
var homes = [
  {
    "comuna": "Aranjuez",
    "barrio": "Santa Lucía",
    "area": 90,
    "habitaciones": 3,
    "baños": 2,
    "precio": 260000000,
    "urbanizacion": "Villa Santa Lucía"
  },
  {
    "comuna": "Laureles - Estadio",
    "barrio": "Conquistadores",
    "area": 120,
    "habitaciones": 4,
    "baños": 3,
    "precio": 400000000,
    "urbanizacion": "Conquistadores Residencial"
  },
  {
    "comuna": "El Poblado",
    "barrio": "El Tesoro",
    "area": 150,
    "habitaciones": 5,
    "baños": 4,
    "precio": 600000000,
    "urbanizacion": "Tesoro Heights"
  },
  {
    "comuna": "Belén",
    "barrio": "Las Playas",
    "area": 80,
    "habitaciones": 3,
    "baños": 2,
    "precio": 230000000,
    "urbanizacion": "Playa Verde"
  },
  {
    "comuna": "Manrique",
    "barrio": "Manrique Central",
    "area": 75,
    "habitaciones": 2,
    "baños": 1,
    "precio": 170000000,
    "urbanizacion": "Manrique Central Park"
  },
  {
    "comuna": "Guayabal",
    "barrio": "San Pablo",
    "area": 95,
    "habitaciones": 3,
    "baños": 2,
    "precio": 270000000,
    "urbanizacion": "Pablo Estates"
  },
  {
    "comuna": "La América",
    "barrio": "Santa Rita",
    "area": 70,
    "habitaciones": 2,
    "baños": 1,
    "precio": 180000000,
    "urbanizacion": "Santa Rita Residencial"
  },
  {
    "comuna": "Buenos Aires",
    "barrio": "La Pradera",
    "area": 100,
    "habitaciones": 4,
    "baños": 3,
    "precio": 320000000,
    "urbanizacion": "Pradera del Sur"
  },
  {
    "comuna": "Robledo",
    "barrio": "San Blas",
    "area": 85,
    "habitaciones": 3,
    "baños": 2,
    "precio": 240000000,
    "urbanizacion": "San Blas Gardens"
  },
  {
    "comuna": "Castilla",
    "barrio": "Doce de Octubre",
    "area": 65,
    "habitaciones": 2,
    "baños": 1,
    "precio": 190000000,
    "urbanizacion": "Doce de Octubre Residencial"
  }
]


/* GET home page. */
router.get('/', function(req, res, next) {
  // session = await ManageAccount.authenticate()
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

router.get('/properties_list', function(req, res, next) {
  res.render('properties_list', homes);
});
module.exports = router;
