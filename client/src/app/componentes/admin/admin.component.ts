import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pedido } from 'src/app/models/pedidos';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuarios } from '../../models/usuarios';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  value: any = 'Clear me';
  idForDelete = new FormControl('');
  esInputVisible: boolean;
  listaUsuarios: Usuarios[] = [];
  listaPedidos: Pedido[] = [];
  totalFacturado: number;
  hayDinero: boolean;

  constructor(
    private usuarioService: UsuariosService,
    private snackBar: MatSnackBar,
    private pedidoService: PedidosService
  ) {
    this.esInputVisible = false;
    this.totalFacturado = 0;
    this.hayDinero = false;
  }

  ngOnInit(): void {
   
  }

  traerListaUsuarios() {
    this.usuarioService.traerUsuarios().subscribe((usuarios: Usuarios[]) => {
      this.listaUsuarios = usuarios;

      for (let i = 0; i < usuarios.length; i++) {
        this.listaUsuarios[i]._id = usuarios[i]._id;
      }
    });
  }

  traerTodosLosPedidos() {
    this.pedidoService.traerTodosPedidos().subscribe((pedidos: Pedido[]) => {
      this.listaPedidos = pedidos;
      this.facturarTotal(this.listaPedidos);
      return this.listaPedidos;
    });
  }

  mostrarInput() {
    this.esInputVisible = true;
  }

  sendValue(id: any) {
    this.esInputVisible = false;

    let idValor = id.value;
    this.eliminarUsuario(idValor);
  }

  facturarTotal(pedidos: Pedido[]): number {
    this.totalFacturado = pedidos
      .map((t) => t.precio)
      .reduce((a, b) => a + b, 0);

    if (this.totalFacturado > 0) {
      this.hayDinero = true;
    }
    return this.totalFacturado;
  }

  eliminarUsuario(id: string) {
    this.usuarioService.eliminarUsuario(id).subscribe((res) => {
      this.snackBar.open('Usuario Eliminado con Éxito', 'OK', {
        duration: 1200,
      });
    });
  }
}
