const {Router} = require('express'); 
const route = Router();
const {registrarUsuario, traerUsuarios, eliminarUsuario, verificarUsuario } = require('./usuarios-controller');
const {autorizacion, refreshToken} = require('../middleware');

//RUTAS DEL ADMIN
route.get('/api/usuarios', autorizacion, traerUsuarios  ); //falta autorizacion
route.delete('/api/usuarios/:id', autorizacion, eliminarUsuario); 

//RUTAS DEL CLIENTE
route.post('/login', verificarUsuario );
route.post('/usuarios', registrarUsuario );

//RUTA AL PEDO ME PARECE
route.post('/refresh', refreshToken);


module.exports = route;