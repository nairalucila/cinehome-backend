import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  constructor() { }

}
