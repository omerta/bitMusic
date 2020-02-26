const User = require('../models/Users');
const crypto = require('crypto'); //npm install crypto --save Módulo para encriptar las contraseñas.

/**
 * 
 * @param {*} req => Vamos a acceder a los datos enviados
 * @param {*} res => Devolvera una respuesta de un mensaje de confirmación o error.
 */
function create(req, res) {
  var user = new User(); //Creamos una nueva instancia de un usuario
  var params = req.body;

  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.email = params.email;



  user.save((error, userCreated) => {
    if (error) {
      res.status(500).send({
        message: "Error al crear el usuario"
      })
    } else {
      res.status(200).send({
        message: "Usuario creado correctamente",
        user: userCreated
      })
    }
  })

}


/**
 * El método findByIdAndUpdate nos permite buscar un registro y actualizarlo.
 * La estructura es: colleccion.findByIdAndUpdate( 'A quien se debe buscar y actualizar', 'Que se debe actualizar.' )
 * @param {*} req 
 * @param {*} res 
 */
function update(req, res) {
  var params = req.body; //Parametros que se envian desde el body.
  var id = req.params.id; //Parametro que llega desde la url.

  //------------------- Encriptación de la contraseña-----------
  var algoritmo = 'aes-256-cbc'
  var key = crypto.createCipher(algoritmo, algoritmo);
  var password = key.update( params.password, 'utf8', 'hex' );
  password += key.final('hex');
  params.password = password;
  console.log(params.password);
  //------------------- Encriptación de la contraseña-----------



  User.findByIdAndUpdate(id, params, (error, userUpdated) => {
    if (error) {
      res.status(500).send({
        message: "Error en el servidor"
      })
    } else {
      if (!userUpdated) {
        res.status(400).send({
          message: "Error al actualizar el usuario"
        })
      } else {
        res.status(200).send({
          message: "Uusario actualizado"
        })
      }
    }
  })
}

/* Exportamos el módulo del controllador junto con la función de crear usuario */
module.exports = {
  create,
  update
}