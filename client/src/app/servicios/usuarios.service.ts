import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { UsuarioLogin, Usuarios } from '../models/usuarios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  //apiUrlBack: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  loguearUsuario(usuario: any) {
   
    return this.http.post(environment.apiUrlBack  + 'login', usuario);
  }

  traerUsuarios() {
  
    return this.http.get<Usuarios[]>(environment.apiUrlBack + 'api/usuarios');
  }

  registrarUsuario(usuario: Usuarios): Observable<Usuarios> {
 
    return this.http.post<Usuarios>(environment.apiUrlBack + 'usuarios', usuario);
  }

  eliminarUsuario(id: string) {
    
    return this.http.delete(environment.apiUrlBack + 'api/usuarios/' + id );
  }

  desloguearUsuario() {
    localStorage.clear();
    this.cookie.deleteAll();
    this.route.navigate(['/login']);
    this.snackBar.open('Su sesión expiró, vuelva a ingresar', 'Time Off', {
      duration: 7000,
    });
  }

}
