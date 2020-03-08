const User = require('../models/Users');
const crypto = require('crypto'); //npm install crypto --save Módulo para encriptar las contraseñas.
// Nos permite leer archivos externos como los pueden ser css, html, js, img, música, documentos, etc
const fs = require('fs');
const path = require('path');//npm i path --save

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
  if (params.password !== "" && params.password !== undefined) {
    user.password = encriptar(params.password);
  }


  user.save((error, userCreated) => {
    if (error) {
      res.status(500).send({
        message: "Error al crear el usuario",
        statusCode: 500
      })
    } else {
      res.status(200).send({
        message: "Usuario creado correctamente",
        user: userCreated,
        statusCode: 200
      })
    }
  })

}

function encriptar(pass) {
  var algoritmo = 'aes-256-cbc'
  var key = crypto.createCipher(algoritmo, algoritmo);
  var password = key.update(pass, 'utf8', 'hex');
  password += key.final('hex');
  console.log(password);
  return password;
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
  console.log("Este es:", params.password)
  if (params.password !== "" && params.password !== undefined) {
    params.password = encriptar(params.password);
  }
  //------------------- Encriptación de la contraseña-----------

  User.findByIdAndUpdate(id, params, (error, userUpdated) => {
    if (error) {
      res.send({
        message: "Error en el servidor",
        statusCode: 500
      })
    } else {
      if (!userUpdated) {
        res.send({
          message: "Error al actualizar el usuario",
          statusCode: 400
        })
      } else {
        res.send({
          message: "Uusario actualizado",
          statusCode: 200
        })
      }
    }
  })
}

function login(req, res) {
  var params = req.body;
  var correo = params.email;

  User.findOne({ email: correo.toLowerCase() }, (error, userLogged) => {
    if (error) {
      res.send({
        message: "Error en el servidor",
        statusCode: 500
      })
    } else {
      if (!userLogged) {
        res.send({
          message: "El usuario no existe",
          statusCode: 400
        })
      } else {
        var password = encriptar(params.password);
        //console.log("Contraseña encriptada: ", password);
        //console.log(" Contraseña guardada en la DB : ", userLogged.password);
        console.log(userLogged);
        if (password === userLogged.password) {
          res.send({
            message: "Los datos son correctos",
            statusCode: 200,
            dataUser: userLogged
          })
        } else {
          res.send({
            message: "La contraseña no es correcta",
            statusCode: 401
          })
        }
      }
    }

  })

}

function getUsers(req, res) {
  User.find({}, (error, users) => {
    if (error) {
      res.send({
        message: "Error en el servidor",
        statusCode: 500
      })
    } else {
      res.send({
        allUsers: users,
        statusCode: 200
      })
    }
  });
}

//La diferencia entre findByIdAndDelete y findByIdAndRemove es que el último devuelde el documento eliminado
function destory(req, res) {
  var id = req.params.id;
  User.findByIdAndRemove(id, (error, data) => {
    if (error) {
      res.send({
        message: "Error en el servidor " + error,
        statusCode: 500
      })
    } else {
      res.send({
        statusCode: 200
      })
    }
  })
}

function loadImage(req, res) {
  var id = req.params.id;
  var imageName = 'No cargó ninguna imagen';
  if (req.files) {
    var imageRoute = req.files.imagen.path;

    var imageName = imageRoute.split('\\');
    if (imageName.length === 1) {
      var imageName = imageRoute.split('/');
    }

    var imageName = imageName[2];

    User.findByIdAndUpdate(id, {
      image: imageName
    }, (err, dataUser) => {
      if (err) {
        res.send({
          message: 'Error en el servidor',
          statusCode: 500
        });
      } else {
        if (!dataUser) {
          res.send({
            message: 'No fue posible actualizar la imagen',
            statusCode: 401
          });
        } else {
          res.send({
            imagen: imageName,
            dataUser: dataUser,
            statusCode: 200
          });
        }
      }
    });

  } else {
    res.status(404).send({
      message: "No ha subido ninguna imagen"
    });
  }
}

function printImage(req, res) {
  var image = req.params.image;
  
  // pedir el archivo que queremos mostrar
  if (image === 'undefined') {
    image = 'whitoutImage.png'
  }
  console.log(image);

  // verificar la carpeta archivos/usuarios para encontrar el archivo
  var rutaArchivo = './assets/images/' + image;

  // Validar si dentro de la carpeta archivos/usuarios existe el archivo
  // exists -> método propio de file system (fs)
  // fs.exists('en donde debo ir a buscar', (existe o no)=>{})

  fs.exists(rutaArchivo, (exists) => {
    if (exists) {
      // envíe la imagen o el archivo
      // senFile -> propio de file system permite enviar archivos como rta
      res.sendFile(path.resolve(rutaArchivo));
    } else {
      res.send({
        message: "Imagen no encontrada",
        statusCode: 404
      });
    }
  });
}

/* Exportamos el módulo del controllador junto con la función de crear usuario */
module.exports = {
  create,
  update,
  login,
  getUsers,
  destory,
  loadImage,
  printImage
}