const {Router} = require('express'); 
const route = Router();
const { eliminarMuchosPedidos, registrarPedido, traerPedidoBaseDatos, eliminarPedido, traerTodosPedidos} = require('./pedidos-controller');
const {autorizacionClientes, autorizacion} = require('../middleware');

route.get('/pedidos/:idUsuario', traerPedidoBaseDatos);

route.get('/api/pedidos', autorizacion , traerTodosPedidos); //middleware

route.post('/pedidos', autorizacionClientes, registrarPedido );
route.delete('/pedidos/:id', autorizacionClientes, eliminarPedido);

route.delete('/usuario/pedidos/:id', autorizacionClientes, eliminarMuchosPedidos);


module.exports = route;