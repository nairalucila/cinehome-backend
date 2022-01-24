import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pedido } from '../models/pedidos';
import { agregarPedido, inicializarListaPedidos, removerPedido, removerTodosPedidos } from '../store/pedidos/pedidos.actions';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  apiUrl: string = 'https://61c5170cc003e70017b795a8.mockapi.io/pedidos';
  apiUrlBack: string = 'http://localhost:3000/';

  private pedidoEntrante = new Subject<Pedido[]>();

  constructor(private http: HttpClient, private store: Store) {}

  //APIS CON NUEVA URL

  //API PARA EL ADMIN
  traerTodosPedidos() {
    let apiUrlPedidos = this.apiUrlBack + 'api/pedidos';
    return this.http.get<Pedido[]>(apiUrlPedidos);
  }

  registrarPedido(pedido: Pedido): Observable<Pedido> {
    let apiUrlPedidos = this.apiUrlBack + 'pedidos';
    return this.http.post<Pedido>(apiUrlPedidos, pedido).pipe(
      tap((pedido) => {
        console.log(pedido, "pedido agregado")
        this.store.dispatch(agregarPedido(pedido));
      })
    );
  }

  traerPedidosBaseDatos(idUsuario: string) {
    let apiUrlPedidos = this.apiUrlBack + 'pedidos/' + idUsuario;

    return this.http.get<Pedido[]>(apiUrlPedidos).pipe(
      tap((pedidos)=>{
        console.log(pedidos, "inicializacion de pedidos");
        this.store.dispatch(inicializarListaPedidos({pedidos}));
      })
    );
  }

  eliminarPedido(idPedido: string) {
    let apiUrlPedidos = this.apiUrlBack + 'pedidos/' + idPedido;
    return this.http.delete<Pedido>(apiUrlPedidos).pipe(
      tap((pedido)=>{
        console.log(pedido, "se elimino 1 pedido");
        this.store.dispatch(removerPedido({_id: idPedido}))
      })
    );
  }

  eliminarTodosLosPedidos(idUsuario: string) {
    let apiUrlPedidos = this.apiUrlBack + 'usuario/pedidos/' + idUsuario;
    return this.http.delete<Pedido>(apiUrlPedidos).pipe(
      tap((pedidos)=>{
        console.log(pedidos, "eliminar todos los pedidos");
        this.store.dispatch(removerTodosPedidos({idUsuario: idUsuario}))

      })
    );
  }

  //APIS CON VIEJA URL

  // traerPedidosBaseDatos2(idUsuario: number) {
  //   let urlConEndpoint = this.apiUrl + '?idUsuario=' + idUsuario;

  //   return this.http.get<Pedido[]>(urlConEndpoint);
  // }

  // registrarPedido2(pedido: Pedido): Observable<Pedido> {
  //   return this.http.post<Pedido>(this.apiUrl, pedido);
  // }

  // eliminarPedido2(idPedido: number) {
  //   let apiUrlConId = this.apiUrl + '/' + idPedido;
  //   return this.http.delete<Pedido>(apiUrlConId);
  // }
}
