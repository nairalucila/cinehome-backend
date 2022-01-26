const {Router} = require('express'); 
const route = Router();
const {registrarUsuario, traerUsuarios, eliminarUsuario, verificarUsuario } = require('./usuarios-controller');
const {autorizacionClientes, autorizacion, generarNuevoToken} = require('../middleware');

route.get('/api/usuarios', traerUsuarios  ); //falta autorizacion
route.delete('/api/usuarios/:id', eliminarUsuario); 

route.post('/login', verificarUsuario );

route.post('/usuarios', registrarUsuario );

route.post('/refresh', generarNuevoToken );



module.exports = route;