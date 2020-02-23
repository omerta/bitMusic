const express = require('express'); //Requerimos el módulo de express.
const UserController = require('../controllers/UserController');

var api = express.Router();

api.post('/createUser', UserController.create);

module.exports = api; //Convertimos las rutas en un módulo.