const Usuario = require("./models").Usuario;
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const express = require("express");
const app = express();
//const {llaveSeteada} = require('../server');

const registrarUsuario = async function (req, res) {
  try {
    let nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    return res.status(200).send("Usuario registrado con éxito");
  } catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
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
      email: result.email,
      contrasenia: result.contrasenia,
      rol: result.rol
    }

    if (result) {
      jwt.sign({ usuario: usuarioEntrante }, config.llave, (err, token) => {
        return res.json({
          token,
          role: usuarioEntrante.rol
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
    let usuarioEliminado = await Usuario.deleteOne({ id: usuarioId });

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
