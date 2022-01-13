const express = require('express');
const PORT = 3000;
const HOSTNAME = 'localhost';
var app = express();
const mongoConect = require('./db/db')
const jwt = require('jsonwebtoken');
const config = require('./config/config');

app.set('llave', config.llave);
app.use(express.urlencoded({
   extended: true
}));
app.use(express.json());

// RUTAS
app.use(require('./Pedidos/pedidos-router'));
app.use(require('./Usuarios/usuarios-router'));

app.get('/', function (req, res) {
   res.send('Bienvenido');
});

app.listen(PORT, HOSTNAME, () => {
   console.log('El servidor está corriendo en http://' + HOSTNAME + ':' + PORT);
});
