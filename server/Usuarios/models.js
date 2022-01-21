const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema2 = new Schema({

  nombreUsuario: String,
  email: { type: String, unique: true },
  contrasenia: String,
  telefono: String,
  rol: String
});

const usuarioLoginSchema = new Schema({
    id: {type: Number,
    unique: true},
    email: String,
    contrasenia: String
})

const Usuarios = mongoose.model("Usuarios", usuarioSchema2);
const UsuarioLogin = mongoose.model("UsuarioLogin", usuarioLoginSchema);
module.exports = {
    Usuarios,
    UsuarioLogin
}
