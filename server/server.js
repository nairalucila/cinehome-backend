const express = require('express');
const PORT = 3000;
const HOSTNAME = 'localhost';
var app = express();
const mongoConect = require('./db/db')
//const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({
   extended: false
}));

app.use(require('./Pedidos/pedidos-router'));
app.use(require('./Usuarios/usuarios-router'));

app.get('/', function (req, res) {
   res.send('Bienvenido');
});

app.listen(PORT, HOSTNAME, () => {
   console.log('El servidor está corriendo en http://' + HOSTNAME + ':' + PORT);
});
