const Song = require('../models/Song');
const fs = require('fs');
const path = require('path');

function create(req, res) {
  var song = new Song();
  var params = req.body;

  song.name = params.name;
  song.artist = params.artist;
  song.genre = params.genre;
  song.image = params.image;
  song.file = params.file;

  song.save((error, songCreated) => {
    if (error) {
      res.status(500).send({
        message: "Error: unwilling to performance songs creation.",
        statusCode: 500
      })
    } else {
      res.status(200).send({
        message: "Yuujuu! the song has been created.",
        song: songCreated,
        statusCode: 200
      })
    }
  })

}

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

//La diferencia entre findByIdAndDelete y findByIdAndRemove es que el último devuelde el documento eliminado
function destroy(req, res) {
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

function uploadImage(req, res) {
  var id = req.params.id;
  var imageName = 'No cargó ninguna image';
  if (req.files) {
    var imageRoute = req.files.image.path;

    var imageName = imageRoute.split('\\');
    if (imageName.length === 1) {
      var imageName = imageRoute.split('/');
    }

    var imageName = imageName[2];

    Song.findByIdAndUpdate(id, {
      image: imageName
    }, (err, dataSong) => {
      if (err) {
        res.send({
          message: 'Error en el servidor',
          statusCode: 500
        });
      } else {
        if (!dataSong) {
          res.send({
            message: 'No fue posible actualizar la imagen',
            statusCode: 401
          });
        } else {
          res.send({
            imagen: imageName,
            dataSong: dataSong,
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

module.exports = {
  create,
  update,
  destroy,
  uploadImage
}