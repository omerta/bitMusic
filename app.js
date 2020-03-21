/**
 * Lógica de express.
 */

const express = require('express'); // Importamos el módulo de expressJS.
const bodyParser = require('body-parser'); //npm install body-parser --save
const passport = require('passport');
const routes = require('./rutas/rutas');
require('./config/passport');

 const app = express(); //Convertimos express en un objeto.

 // Configurar permisos de acceso a cualquier cliente
app.use((req, res, next) =>{
  // Todos estos permisos se envian por las cabeceras de las aplicaciones
  // Estos permisos derivan de AJAX (Asynchronous JavaScript XHML)

  // todos los dominios
  res.header('Access-Control-Allow-Origin', '*');
  // todos los metadatos - cookies
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  // todos los métodos http - métodos de petición
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Confirmación estricta de los métodos a utilizar
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

  // app.use((req, res, next)=>{}) Es un middleware
  // next() -> Salga del middleware y ejecute el siguiente proceso o dele por terminado
  next();
});

 app.use( bodyParser.json() ); //Analizamos los parametros que se pasan por la url.

 app.use(passport.initialize());
 app.use('/api', routes);
 module.exports = app; //Convertimos el archivo en un módulo.
