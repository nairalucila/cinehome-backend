import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pedido } from '../models/pedidos';
import {
  agregarPedido,
  inicializarListaPedidos,
  removerPedido,
  removerTodosPedidos,
} from '../store/pedidos/pedidos.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  // apiUrlBack: string = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store) {}

  //API PARA EL ADMIN
  traerTodosPedidos() {
    return this.http.get<Pedido[]>(environment.apiUrlBack + 'api/pedidos');
  }

  registrarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http
      .post<Pedido>(environment.apiUrlBack + 'pedidos', pedido)
      .pipe(
        tap((pedido) => {
          this.store.dispatch(agregarPedido(pedido));
        })
      );
  }

  traerPedidosBaseDatos(idUsuario: string) {
    return this.http
      .get<Pedido[]>(environment.apiUrlBack + 'pedidos/' + idUsuario)
      .pipe(
        tap((pedidos) => {
          this.store.dispatch(inicializarListaPedidos({ pedidos }));
        })
      );
  }

  eliminarPedido(idPedido: string) {
    return this.http
      .delete<Pedido>(environment.apiUrlBack + 'pedidos/' + idPedido)
      .pipe(
        tap((pedido) => {
          this.store.dispatch(removerPedido({ _id: idPedido }));
        })
      );
  }

  eliminarTodosLosPedidos(idUsuario: string) {
    return this.http
      .delete<Pedido>(environment.apiUrlBack + 'usuario/pedidos/' + idUsuario)
      .pipe(
        tap((pedidos) => {
          this.store.dispatch(removerTodosPedidos({ idUsuario: idUsuario }));
        })
      );
  }
}
