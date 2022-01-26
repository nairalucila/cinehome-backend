const { llave } = require("./config/config");
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
    console.log("paSO POR ACA", decoded);

    if (decoded.usuario.rol === "CLIENTE") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }
  } catch (error) {
    // if (error) {
    //   jwt.sign(
    //     { usuario: decoded.usuario },
    //     llave,
    //     { expiresIn: "1h" },
    //     (err, token) => {
    //       return res.json({
    //         token,
    //         role: decoded.usuario.rol,
    //         _id: decoded.usuario._id,
    //       });
    //     }
    //   );
    // }
    return res.status(401).json({ mensaje: "No autorizado", error: error });
  }
}

module.exports = {
  autorizacion,
  autorizacionClientes,
};
