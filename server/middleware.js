const { llave, refresh } = require("./config/config");
const jwt = require("jsonwebtoken");
const Usuario = require("./Usuarios/models").Usuarios;

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
    console.log(decoded);
/** _id:'61e70a615a22ab264456179b'
contrasenia:'admin'
email:'admin@admin.com'
rol:'ADMIN'

exp:1643210203
*/


    if (decoded.usuario.rol === "CLIENTE") {
      next();
    } else {
      return res.status(401).json("No autorizado");
    }
  } catch (error) {
    return res.status(401).json({error: error,
      mensaje: "[No autorizado]", });
  }
}

const refreshToken = async (req, res) => {
  const refreshToken = req.headers.authorization;

  /**
   * if(!(refreshToken)){
   * res.status.blabla.json(mensaje la bla)
   * }
   */

  if (!refreshToken) {
    res.status(401).json({ mensaje: "No se pudo procesar su peticion" });
  }

  /***
     * 
iat:1643206603
exp:1643210203
_id:'61e70a615a22ab264456179b'
contrasenia:'admin'
email:'admin@admin.com'
rol:'ADMIN'
     */

  try {
    const verifyResult = jwt.verify(refreshToken, llave);
    console.log(verifyResult);
    
    const usuarioEntrante = await Usuario.findOne({
      email: verifyResult.usuario.email,
    });
    res.json({
      verifyR: verifyResult,
      usuario: usuarioEntrante,
    });
    const token = jwt.sign(
      { usuarioEntrante: verifyResult.usuario },
      refresh,
      { expiresIn: "1h" },
      (err, token) => {
        return res.json({
          token,
          role: usuarioEntrante.rol,
          _id: usuarioEntrante._id,
        });
      }
    );
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo procesar su peticion x2" });
  }
};

module.exports = {
  autorizacion,
  autorizacionClientes,
  refreshToken,
};
