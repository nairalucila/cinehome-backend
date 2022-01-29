import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //ESTE SERVICIO ES PARA QUE NO SE MUESTRE LA BARRA DE NAVEGACION EN COMPONENTE LOGIN Y REGISTRO
  public loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  constructor() { }

}
