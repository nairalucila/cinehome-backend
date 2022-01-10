const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.Promise = global.Promise

const pedidoSchema = new Schema({
    titulo: String,
    precio: Number,
    idUsuario: Number,
    id: Number
});

module.exports = mongoose.model('Pedido', pedidoSchema);