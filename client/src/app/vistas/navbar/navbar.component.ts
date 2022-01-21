import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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

  constructor(private route: Router, private cookie: CookieService) {
    this.mostrarNav = true;
    this.hayProductos = false;
    this.esAdmin = false;

  }

  ngOnInit(): void {
    this.ocultarBarraNavegacion();
    this.irPanelAdmin();
    
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
