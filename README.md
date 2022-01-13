# cinehome-backend
## Para iniciar esta aplicación primero corra el comando npm i
## Luego ejecute npm run start y ejecute pruebas en postman o en su navegador
## si necesita hacer pruebas con post utilice el siguiente json

 localhost:3000/login

 {
	"email": "email@email.com",
	"contrasenia": "pass"
}

## Traer usuarios
localhost:3000/api/usuarios
## Delete
localhost:3000/api/usuarios/id

## Registro
localhost:3000/usuarios
 {
	"email":"email@email.com",
	"contrasenia": "pass",
	"telefono": 00,
	"nombreUsuario": "usuariocliente1",
	"rol": "CLIENTE",
}