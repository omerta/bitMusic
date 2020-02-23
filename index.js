/**
 * Archivo para conectarnos a nuestra base de datos.
 */

const mongoose = require('mongoose'); //Requerimos en módulo de mongoose para poder usarlo.
const app = require('./app'); //Requerimos el módulo de app.
const port = 4200;

/**
 * mongodb: Motor de base de datos.
 * localhost:27017: Donde va a escuchar.
 * bit: Base de datos.
 */
mongoose.connect('mongodb://localhost:27017/bit', (error, res) => {
  //Preguntamos si hay algún error de conexión
  if (error) {
    console.log("No nos pudimos conectar");
  } else {
    console.log("Bien!!!");
    //Escuchamos en el puerto.
    app.listen(port, () => {
      console.log("Escuchando en el puerto => " + port);
    })
  }
})