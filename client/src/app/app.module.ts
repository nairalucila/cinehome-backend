import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { NavbarComponent } from './vistas/navbar/navbar.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AdminComponent } from './componentes/admin/admin.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { HeaderInterceptorService } from './interceptores/header-interceptor.service';
import {MatBadgeModule} from '@angular/material/badge';
import { StoreModule } from '@ngrx/store';
import { pedidosReducer } from './store/pedidos/pedidos.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PagarCompraComponent } from './componentes/pagar-compra/pagar-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListadoComponent,
    CarritoComponent,
    LoginComponent,
    RegistroComponent,
    DetalleComponent,
    AdminComponent,
    PagarCompraComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBadgeModule,
    StoreModule.forRoot({ pedidos: pedidosReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: false,
      autoPause: true, 
    }),
    
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  })
export class AppModule {}
