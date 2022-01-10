const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  nombreUsuario: String,
  email: { type: String, unique: true },
  contrasenia: String,
  telefono: String,
});

const usuarioLoginSchema = new Schema({
    id: {type: Number,
    unique: true},
    email: String,
    contrasenia: String
})

const Usuario = mongoose.model("Usuario", usuarioSchema);
const UsuarioLogin = mongoose.model("UsuarioLogin", usuarioLoginSchema);
module.exports = {
    Usuario,
    UsuarioLogin
}
