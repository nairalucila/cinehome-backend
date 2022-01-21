const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.Promise = global.Promise

const pedidoSchema = new Schema({
    titulo: String,
    precio: Number,
    idUsuario: String,

});

module.exports = mongoose.model('Pedido', pedidoSchema);