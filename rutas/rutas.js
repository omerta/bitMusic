const express = require('express'); //Requerimos el módulo de express.
const UserController = require('../controllers/UserController');
const SongController = require('../controllers/SongController');
var multipart = require('connect-multiparty'); //npm i connect-multiparty --save
var imagesDir = multipart({ uploadDir: './assets/images' });

var api = express.Router();

api.get('/', function (req, res) {
    res.send('Welcome')
});

api.post('/createUser', UserController.create);
api.put('/updateUser/:id', UserController.update);
api.post('/loginUser', UserController.login);
api.get('/getUsers', UserController.getUsers);
api.delete('/removeUser/:id', UserController.destory);
api.post('/loadImage/:id', imagesDir, UserController.loadImage);
api.get('/printImage/:image', UserController.printImage);

// retrive all songs
// api.get('/songs', SongController.list);
// retrive a song
// api.get('/song/:id', SongController.show);
// create a song
api.post('/song', SongController.create);
// update a song
api.put('/song/:id', SongController.update);
// delete a song
api.delete('/song/:id', SongController.destroy)
// upload image
api.post('/songUploadImage/:id', SongController.uploadImage);

module.exports = api; //Convertimos las rutas en un módulo.