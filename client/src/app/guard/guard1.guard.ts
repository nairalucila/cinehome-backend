import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../servicios/auth.service';
import { obtenerSiHayUsuario } from '../store/usuario/usuario.actions';

@Injectable({
  providedIn: 'root',
})
export class Guard1Guard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}

  //si es false te lo muestra en blanco.

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let idUsuarioLogueado = localStorage.getItem('INITIALIZACION_IN');


    const existeId = idUsuarioLogueado ? true : false;
    this.store.dispatch(obtenerSiHayUsuario({hayUsuario: existeId}))
    // this.authService.isLoggedIn.pipe(
    //   take(1),
    //   map((value: boolean) => {
    //     if (!value) {
    //     }
    //   })
    // );

    if (!idUsuarioLogueado) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
