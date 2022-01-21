const {llave} = require("./config/config");
const jwt = require("jsonwebtoken");

module.exports = function autorizacion(req, res, next) {
  try {
    const token = req.headers["Authorization"];
    let decoded = jwt.verify(token, llave);

    if (decoded.usuario.rol === "ADMIN") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }
  } catch (error) {
    console.log("ERRORRR", error);
  }

};

module.exports = function autorizacionClientes(req, res, next){

  try {
    const token = req.headers["authorization"];
    let decoded = jwt.verify(token, llave);

    if (decoded.usuario.rol === "CLIENTE") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }


  } catch (error) {
    
  }
};
