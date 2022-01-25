const Usuario = require("./models").Usuarios;
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const express = require("express");
const app = express();
//const {llaveSeteada} = require('../server');

const registrarUsuario = async function (req, res) {
  try {
    let nuevoUsuario = new Usuario(req.body);
    let exist = await Usuario.findOne({ email: nuevoUsuario.email });

    if (exist) {
      return res.status(400).json(exist);
    } else {
      await nuevoUsuario.save();
      return res.status(200).json(nuevoUsuario);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: error,
      mensaje: error.message,
      aviso: "Hubo un error en su peticion",
    });
  }
};

const verificarUsuario = async function (req, res) {
  try {
    let usuarioEntrante;
    let result = await Usuario.findOne({
      email: req.body.email,
      contrasenia: req.body.contrasenia,
    });

    usuarioEntrante = {
      _id: result._id,
      email: result.email,
      contrasenia: result.contrasenia,
      rol: result.rol,
    };

    if (result) {
      jwt.sign({ usuario: usuarioEntrante }, config.llave, { expiresIn: "1h" }, (err, token) => {
        return res.json({
          token,
          role: usuarioEntrante.rol,
          _id: usuarioEntrante._id,
        });
      });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    return res.status(400).send({
      error: error,
      mensaje: "No pudo ingresar al sistema, revise alguno de sus datos",
    });
  }
};

const traerUsuarios = async function (req, res) {
  try {
    let usuarios = await Usuario.find();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }
};

const eliminarUsuario = async function (req, res) {
  try {
    let usuarioId = req.params.id;
    let usuarioEliminado = await Usuario.deleteOne({ _id: usuarioId });

    return res
      .status(200)
      .json({ obj: usuarioEliminado, mensaje: "Eliminado con éxito" });
  } catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }
};

module.exports = {
  registrarUsuario,
  traerUsuarios,
  eliminarUsuario,
  verificarUsuario,
};
