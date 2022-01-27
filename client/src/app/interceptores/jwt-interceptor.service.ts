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
import {catchError} from 'rxjs/operators';
import {UsuariosService} from '../servicios/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  
  //ACA EMPIEZA Q ME CONFUNDO
  token: string;
  
  constructor(private cookieService: CookieService, private usuarioService: UsuariosService) {
    this.token = this.cookieService.get('token');
   
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log("LEE TOKEN", this.token);

    const headers = new HttpHeaders({
      'authorization': this.token,
      'content-type' : 'application/json'
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
    
  }

  refreshToken(){
    debugger
    const _id = localStorage.getItem('INITIALIZACION_IN');
    this.usuarioService.refreshToken(_id).subscribe(res =>{
      console.log(res)
      debugger
    });
    
  }

  manejarError(error: HttpErrorResponse){
    if(error){
      this.refreshToken();
    }
    console.log('[ERROR]:', error);
    return throwError("Error en Interceptor")

  }
}

