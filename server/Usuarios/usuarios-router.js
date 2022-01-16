const {Router} = require('express'); 
const route = Router();
const {registrarUsuario, traerUsuarios, eliminarUsuario, verificarUsuario } = require('./usuarios-controller');
const autorizacion = require('../middleware');

route.get('/api/usuarios', autorizacion, traerUsuarios  ); 
route.delete('/api/usuarios/:id', autorizacion, eliminarUsuario); 

route.post('/login', verificarUsuario );

route.post('/usuarios', registrarUsuario );
//route.put('/api/usuarios/:id');


module.exports = route;