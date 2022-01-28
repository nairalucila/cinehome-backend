import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,

} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, tap } from 'rxjs/operators';
import { UsuariosService } from '../servicios/usuarios.service';
import { Error } from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private usuarioService: UsuariosService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('api.themoviedb')) {
      return next.handle(req).pipe(catchError(this.manejarError));
    }

    const token = this.cookieService.get('token')
    const headers = new HttpHeaders({
      authorization: token,
      'content-type': 'application/json',
    });

    const reqClone = req.clone({
      headers,
    });

    return next.handle(reqClone).pipe(catchError((err) => this.manejarError(err)), tap(res => {
    } ));
  }

  manejarError(err: HttpErrorResponse) {
    
    if (err.status == 401) {
      this.usuarioService.desloguearUsuario();
    }else{
      //const errorStatus = new Error('Error en la peticion');
      throw new Error('Error en la peticion');
    }
    return throwError({
      mensaje: 'Error en Interceptor',
      error: err,
    });
  }
}
