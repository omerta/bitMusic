const express = require('express'); //Requerimos el módulo de express.
const UserController = require('../controllers/UserController');
var multipart = require('connect-multiparty'); //npm i connect-multiparty --save
var imagesDir = multipart({ uploadDir: './assets/images' });

var api = express.Router();

api.post('/createUser', UserController.create);
api.put('/updateUser/:id', UserController.update);
api.post('/loginUser', UserController.login);
api.get('/getUsers', UserController.getUsers);
api.delete('/removeUser/:id', UserController.destory);
api.post('/loadImage/:id', imagesDir, UserController.loadImage);
api.get('/printImage/:image', UserController.printImage);
module.exports = api; //Convertimos las rutas en un módulo.