import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { UsuarioLogin, Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  apiUrl: string = 'https://61c5170cc003e70017b795a8.mockapi.io/users';
  apiUrlBack: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  loguearUsuario(usuario: any) {
    let loginApi = this.apiUrlBack + 'login';
    return this.http.post(loginApi, usuario);
  }

  traerUsuarios() {
    let apiGetUsuario = this.apiUrlBack + 'api/usuarios';
    return this.http.get<Usuarios[]>(apiGetUsuario);
  }

  registrarUsuario(usuario: Usuarios): Observable<Usuarios> {
    let apiRegistrar = this.apiUrlBack + 'usuarios';
    return this.http.post<Usuarios>(apiRegistrar, usuario);
  }

  eliminarUsuario(id: string) {
    let apiEliminar = this.apiUrlBack + 'api/usuarios/' + id;
    return this.http.delete(apiEliminar);
  }

  desloguearUsuario() {

  
    localStorage.clear();
    this.cookie.deleteAll();
    this.route.navigate(['/login']);
    this.snackBar.open('Su sesión expiró, vuelva a ingresar', 'Time Off', {
      duration: 7000,
    });
  }

  //GENERAR NUEVO TOKEN
  refreshToken(usuario: any) {
    let loginApi = this.apiUrlBack + 'refresh';
    return this.http.post(loginApi, usuario);
  }
}
