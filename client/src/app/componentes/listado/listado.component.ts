import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { Pedido } from '../../models/pedidos';
import { PeliculasService } from 'src/app/servicios/peliculas.service';
import {
  Genero,
  PeliculaSeleccionada,
  Peliculas,
} from '../../models/peliculas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectPedidos } from 'src/app/store/pedidos/pedidos.selector';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit, OnChanges {
  listaPeliculas: Peliculas[] = [];
  cantidadPeliculas: number;
  peliculaSeleccionadas: PeliculaSeleccionada[];

  nuevoPedido: Pedido;
  seAgrego: boolean;
  animacionCheck: boolean;
  listaPelicuasPopulares: any;

  img_url: string = 'https://image.tmdb.org/t/p/w500';

  idRegistroUsuario: string;
  pedidos$ = this.store.select(selectPedidos);

  constructor(
    private router: Router,
    private pedidoService: PedidosService,
    private peliculaService: PeliculasService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {
    this.seAgrego = true;
    this.animacionCheck = false;
    this.peliculaSeleccionadas = [];
    this.cantidadPeliculas = 0;

    const idlocalstorage = localStorage.getItem('INITIALIZACION_IN');
    if (!idlocalstorage) {
      this.router.navigate(['/login']);
      throw new Error('No se encuentra id');
    }

    this.idRegistroUsuario = idlocalstorage;

    this.nuevoPedido = {
      titulo: '',
      precio: 0,
      idUsuario: this.idRegistroUsuario,
    };
  }

  ngOnInit(): void {
    for (let i = 0; i <= 5; i++) {
      this.peliculaService.obtenerPeliculas(i).subscribe((pelis: any) => {
        pelis.results.map((peli: Peliculas) => {
          this.listaPeliculas.push({
            id: peli.id,
            original_title: peli.original_title,
            vote_average: peli.vote_average,
            poster_path: peli.poster_path,
            genre_ids: peli.genre_ids,
            vote_count: peli.vote_count,
            precio: peli.vote_count > 1000 ? 1270 : 965,
            stock: 100,
          });
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  detallePelicula(id: number) {
    this.router.navigate(['/detalle', { id: id }]);
  }

  agregarAlCarrito(pelicula: string, precio: any) {
    this.nuevoPedido = {
      titulo: pelicula,
      precio: precio,
      idUsuario: this.idRegistroUsuario,
    };
    this.pedidoService
      .registrarPedido(this.nuevoPedido)
      .subscribe((pedido: Pedido) => {
        if (pedido) {
          this._snackBar.open('Pel??cula agregada con ??xito', '', {
            duration: 1000,
          });
          
          this.listaPeliculas = this.listaPeliculas.map(p => {
            if (p.original_title === pelicula && p.stock) {
              p.stock--;
            }
            return p;
          })
        } else {
          this._snackBar.open('Error al agregar Pel??cula', '', {
            duration: 1000,
          });
        }
      });
  }
}
