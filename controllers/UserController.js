const User = require('../models/Users');

/**
 * 
 * @param {*} req => Vamos a acceder a los datos enviados
 * @param {*} res => Devolvera una respuesta de un mensaje de confirmación o error.
 */
function create(req, res){
  var user = new User(); //Creamos una nueva instancia de un usuario
  var params = req.body;

  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.email = params.email;

  user.save( (error, userCreated) => {
    if(error){
      res.status(500).send({
        message: "Error al crear el usuario"
      })
    }else{
      res.status(200).send({
        message: "Usuario creado correctamente",
        user: userCreated
      })
    }
  } )

}

/* Exportamos el módulo del controllador junto con la función de crear usuario */
module.exports = {
  create
}