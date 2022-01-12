const Usuario = require("./models").Usuario;

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
    let usuarioEliminado = await Usuario.deleteOne({ id: usuarioId })
  
    return res.status(200).json({obj: usuarioEliminado,
    mensaje: "Eliminado con éxito"});

  } catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }
};

module.exports = {
  registrarUsuario,
  traerUsuarios,
  eliminarUsuario
};
