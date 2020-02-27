const express = require('express'); //Requerimos el módulo de express.
const UserController = require('../controllers/UserController');

var api = express.Router();

api.post('/createUser', UserController.create);
api.put('/updateUser/:id', UserController.update);
api.post('/loginUser', UserController.login);
module.exports = api; //Convertimos las rutas en un módulo.