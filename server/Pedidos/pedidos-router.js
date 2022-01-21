const {Router} = require('express'); 
const route = Router();
const { registrarPedido, traerPedidoDB, eliminarPedido, traerTodosPedidos} = require('./pedidos-controller');
const autorizacionClientes = require('../middleware');
const autorizacion = require('../middleware');

route.get('/pedidos/:idUsuario', traerPedidoDB);

route.get('/api/pedidos', autorizacion , traerTodosPedidos); //middleware

route.post('/pedidos', autorizacionClientes, registrarPedido );
route.delete('/pedidos/:id', autorizacionClientes, eliminarPedido);


module.exports = route;