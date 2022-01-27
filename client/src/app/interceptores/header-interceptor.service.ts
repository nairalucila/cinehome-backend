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

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  token: string;
  constructor(
    private cookieService: CookieService,
    private usuarioService: UsuariosService
  ) {
    this.token = this.cookieService.get('token');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('api.themoviedb')) {
      return next.handle(req).pipe(catchError(this.manejarError));
    }

    const headers = new HttpHeaders({
      authorization: this.token,
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
    }
    return throwError({
      mensaje: 'Error en Interceptor',
      error: err,
    });
  }
}
