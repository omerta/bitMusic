/**
 * Módelo de la tabla Users.
 * Vamos a definir el nombre, estructura y tipo de datos de los campos.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

//Vamos a crear la estructura de la tabla Users
var UsersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  salt: String,
  image: String
});

UsersSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, 'thisIsSecret');
};

UsersSchema.methods.validPassword = function (password) {
  // const hash = crypto
  //   .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
  //   .toString('hex');
  // return this.hash === hash;
  return password;
};

module.exports = mongoose.model('Users', UsersSchema);