import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { selectPedidos } from 'src/app/store/pedidos/pedidos.selector';
import { selectStock } from 'src/app/store/stock/stock.selection';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  mostrarNav: boolean;
  esVisible: boolean = true;
  currentRoute: string = "";
  hayProductos: boolean;
  esAdmin: boolean;

  totalPedidos: number = 0
  pedidos$ = this.store.select(selectPedidos);
  stock$ = this.store.select(selectStock)

  //Almacena la referencia del observable
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn;

  constructor(private route: Router, private cookie: CookieService,
    private store: Store, private authService: AuthService
    ) {
    this.mostrarNav = true;
    this.hayProductos = false;
    this.esAdmin = false;
  }

  ngOnInit(): void {

    this.irPanelAdmin();
    this.pedidos$.subscribe({
      next: pedidos => {
        this.totalPedidos = pedidos.length
      }
    })
  }

  irPanelAdmin(){
    
    let rol = this.cookie.get('rol');
    if(rol === "ADMIN"){
      this.esAdmin = true;
    }
   }

   desloguearUsuario(){
     this.cookie.deleteAll();
     localStorage.clear();
     this.esAdmin = false;
     this.route.navigate(['/login']);
     this.ocultarBarraNavegacion();
   }

  

  ocultarBarraNavegacion(){
    this.authService.loggedIn.next(false);
  }
}
