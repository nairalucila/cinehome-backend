const {llave} = require("./config/config");
const jwt = require("jsonwebtoken");

module.exports = function autorizacion(req, res, next) {
  try {
    const token = req.headers["autorizacion"];
    let decoded = jwt.verify(token, llave);

    if (decoded.usuario.rol === "ADMIN") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }
  } catch (error) {
    console.log("ERRORRR", error);
  }
  // decodificas con jwt
  // desp tenes el usuario
  // buscas el rol de ee usuario
  // si es admin next
  // sino 401 not autorizedh
};
