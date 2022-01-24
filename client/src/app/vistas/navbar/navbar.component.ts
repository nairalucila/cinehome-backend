import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { selectPedidos } from 'src/app/store/pedidos/pedidos.selector';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  mostrarNav: boolean;
  currentRoute: string = "";
  hayProductos: boolean;
  esAdmin: boolean;

  totalPedidos: number = 0


  pedidos$ = this.store.select(selectPedidos)

  constructor(private route: Router, private cookie: CookieService,
    private store: Store
    ) {
    this.mostrarNav = true;
    this.hayProductos = false;
    this.esAdmin = false;

  }

  ngOnInit(): void {
    this.ocultarBarraNavegacion();
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
   }

  ocultarBarraNavegacion(){
    // this.route.config.forEach(rutas => {
    //   if(rutas.path === "login" || rutas.path === "registro"){
    //     this.mostrarNav = false;
    //   }
    // });
  };
}
