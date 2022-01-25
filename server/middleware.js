const { llave, refresh } = require("./config/config");
const jwt = require("jsonwebtoken");

function autorizacion(req, res, next) {
  try {
    const token = req.headers["authorization"];
    let decoded = jwt.verify(token, llave);

    if (decoded.usuario.rol === "ADMIN") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }
  } catch (error) {
    return res.status(400).send("[Error Middleware Admin]", error);
  }
}

function autorizacionClientes(req, res, next) {
  try {
    const token = req.headers["authorization"];
    let decoded = jwt.verify(token, llave);

    if (decoded.usuario.rol === "CLIENTE") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }
  } catch (error) {
    return res.status(400).send("[Error Middleware Cliente]", error);
  }
}

const refreshToken = async (req, res) => {

    const refreshToken = req.headers.refresh;

    /**
     * if(!(refreshToken)){
     * res.status.blabla.json(mensaje la bla)
     * }
     */

    if (refreshToken) {
      continue
    } else {
      res.status(401).json({ mensaje: "No se pudo procesar su peticion" });
    }
    try {
      const verifyResult = jwt.verify(refreshToken, refresh);
      console.log(verifyResult);
      //traer el usuario de base de datos segun la decoficcacion(

      const token = jwt.sign({usuarioEntrante: verifyResult}, llave, {expiresIn: '1h'},(err, token) => {
        return res.json({
          token,
          role: usuarioEntrante.rol,
          _id: usuarioEntrante._id,
        });
      })
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo procesar su peticion x2" });
  }
};

module.exports = {
  autorizacion,
  autorizacionClientes,
  refreshToken
};
