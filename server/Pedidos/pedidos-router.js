const {Router} = require('express'); 
const route = Router();
const { eliminarMuchosPedidos, registrarPedido, traerPedidoBaseDatos, eliminarPedido, traerTodosPedidos} = require('./pedidos-controller');
const {autorizacionClientes, autorizacion} = require('../middleware');


//RUTAS CLIENTE
route.get('/pedidos/:idUsuario', traerPedidoBaseDatos);
route.post('/pedidos', autorizacionClientes, registrarPedido );
route.delete('/pedidos/:id', autorizacionClientes, eliminarPedido);
route.delete('/usuario/pedidos/:id', autorizacionClientes, eliminarMuchosPedidos);

//RUTAS ADMIN
route.get('/api/pedidos', autorizacion , traerTodosPedidos); 




module.exports = route;