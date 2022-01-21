const express = require('express');
const PORT = 3000;
const HOSTNAME = 'localhost';
var app = express();
const mongoConect = require('./db/db')
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const cors = require('cors');

app.set('llave', config.llave);

app.use(cors ({ 
   origin: "*", 
   methods: "GET, HEAD, PUT, PATCH, POST, DELETE", 
   preflightContinue: false 
 }) )
 
app.use(express.urlencoded({
   extended: true
}));


app.use(express.json());

// RUTAS
app.use(require('./Pedidos/pedidos-router'));
app.use(require('./Usuarios/usuarios-router'));

app.get('/', function (req, res) {
   res.send('Hola Mundo 2');
});

app.listen(PORT, HOSTNAME, () => {
   console.log('El servidor está corriendo en http://' + HOSTNAME + ':' + PORT);
});
