export interface Usuarios {
    _id?: string;
    nombreUsuario: string;
    email: string;
    contrasenia?: string;
    telefono: string;
    rol: 'CLIENTE' | 'ADMIN';
  }
  
  export interface UsuarioLogin {
    email: string;
    contrasenia: string;
  }