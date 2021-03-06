import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ParamMap,
  ActivatedRouteSnapshot,
  NavigationEnd,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { selectPedidos } from 'src/app/store/pedidos/pedidos.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  mostrarNav: boolean;
  esVisible: boolean = true;
  currentRoute: string = '';
  hayProductos: boolean;
  esAdmin: boolean;

  totalPedidos: number = 0;
  pedidos$ = this.store.select(selectPedidos);

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn;

  constructor(
    private route: Router,
    private cookie: CookieService,
    private store: Store,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.mostrarNav = true;
    this.hayProductos = false;
    this.esAdmin = false;
  }

  ngOnInit(): void {
    const cambiosRuta$ = this.route.events.pipe(
      filter((evt) => evt instanceof NavigationEnd)
    );

    cambiosRuta$.subscribe((event: any) => {
      console.log(event);
      if (
        event.url == '/login' ||
        event.url == '/registro' ||
        event.urlAfterRedirects == '/login'
      ) {
        this.esVisible = false;
      } else {
        this.esVisible = true;
      }
    });

    cambiosRuta$.subscribe(() => {
      this.irPanelAdmin();
    });

    this.pedidos$.subscribe({
      next: (pedidos) => {
        this.totalPedidos = pedidos.length;
      },
    });
  }

  irPanelAdmin() {
    let rol = this.cookie.get('rol');
    if (rol == 'ADMIN') {
      this.esAdmin = true;
    }
  }

  desloguearUsuario() {
    this.cookie.deleteAll();
    localStorage.clear();
    this.esAdmin = false;
    this.route.navigate(['/login']);
  }

  mostrarBarraNavegacion() {
    return this.route.url !== 'login';
  }
}
