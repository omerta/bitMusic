/**
 * Módelo de la tabla Users.
 * Vamos a definir el nombre, estructura y tipo de datos de los campos.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Vamos a crear la estructura de la tabla Users
var UsersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  image: String
});

module.exports = mongoose.model('Users', UsersSchema);