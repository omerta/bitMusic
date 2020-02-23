/**
 * Lógica de express.
 */

 const express = require('express'); // Importamos el módulo de expressJS.
 const bodyParser = require('body-parser'); //npm install body-parser --save
 const routes = require('./rutas/rutas');

 const app = express(); //Convertimos express en un objeto.

 app.use( bodyParser.json() ); //Analizamos los parametros que se pasan por la url.

 app.use('/api', routes);
 module.exports = app; //Convertimos el archivo en un módulo.
