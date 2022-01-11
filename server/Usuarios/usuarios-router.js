const {Router} = require('express'); 
const route = Router();
const {registrarUsuario, traerUsuarios, eliminarUsuario } = require('./usuarios-controller');


route.get('/api/usuarios', traerUsuarios  ); //agregar middleware
route.delete('/api/usuarios/:id', eliminarUsuario); //agregar middleware

route.post('/usuarios', registrarUsuario );
//route.put('/api/usuarios/:id');


module.exports = route;