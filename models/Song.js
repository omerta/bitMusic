/**
 * Módelo de la tabla Users.
 * Vamos a definir el nombre, estructura y tipo de datos de los campos.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Vamos a crear la estructura de la tabla Users
var SongSchema = new Schema({
  name: String,
  artist: String,
  genre: String,
  image: String,
  file: String,
});

module.exports = mongoose.model('Song', SongSchema);