import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedidos';
import { Store } from '@ngrx/store';
import { selectPedidos } from 'src/app/store/pedidos/pedidos.selector';
import {MatDialog} from '@angular/material/dialog';
import { PagarCompraComponent } from '../pagar-compra/pagar-compra.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit, OnChanges {
  productoSeleccionados: Pedido[] = [];
  displayedColumns: string[] = ['pelicula', 'precio', 'eliminar'];
  producto: object;
  idUsuario: string;

  pedidos$ = this.store.select(selectPedidos)

  constructor(
    private pedidoService: PedidosService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.producto = {};
    const idlocalstorage = localStorage.getItem('INITIALIZACION_IN');
    if (!idlocalstorage) {
      this.route.navigate(['/login']);
      throw new Error('No se encuentra id');
    }
    this.idUsuario = idlocalstorage;
  }

  ngOnInit(): void {
    this.traerPedidosBaseDatos();
    this.pedidoService.traerPedidosBaseDatos(this.idUsuario).subscribe()
    
  }

  obtenerMontoTotal() {
    return this.productoSeleccionados
      .map((peli) => peli.precio)
      .reduce((acc, value) => acc + value, 0);
  }

  traerPedidosBaseDatos() {
    this.pedidos$
      .subscribe((pedidos) => {
        this.productoSeleccionados = [...pedidos];
      });
  }

  eliminarTodo(todosProductos: any) {
     this.pedidoService.eliminarTodosLosPedidos(this.idUsuario).subscribe((res) => {
    });
  }

  ngOnChanges(changes: SimpleChanges) {}

  eliminarPelicula(productoSelec: any){
    this.pedidoService.eliminarPedido(productoSelec._id).subscribe((info) => {
      this.productoSeleccionados = this.productoSeleccionados.filter((p) => {
        return p._id !== productoSelec._id;
      });
      this._snackBar.open('Pedido eliminado con ??xito', '', { duration: 1000 });
    });
  }

  pagar():void{
   this.dialog.open(PagarCompraComponent);
   
  }
}
