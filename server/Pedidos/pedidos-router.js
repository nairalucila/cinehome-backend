const {Router} = require('express'); 
const route = Router();
const { registrarPedido, traerPedidoDB, eliminarPedido} = require('./pedidos-controller');

route.get('/pedidos/:idUsuario',  traerPedidoDB);
route.post('/pedidos', registrarPedido );
route.delete('/pedidos/:id', eliminarPedido);


module.exports = route;