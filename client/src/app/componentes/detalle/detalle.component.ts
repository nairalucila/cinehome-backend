import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from 'src/app/servicios/peliculas.service';
import { Genero, Peliculas, Detalles } from '../../models/peliculas';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { Pedido } from 'src/app/models/pedidos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectPedidos } from 'src/app/store/pedidos/pedidos.selector';
import { selectStock } from 'src/app/store/stock/stock.selection';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  id: string = '';
  idDetalle: number = 0;
  detalles: Detalles;
  img_url: string = 'https://image.tmdb.org/t/p/w500';
  pathImagen: string = '';
  nuevoPedido: Pedido;
  listaPeliculasRecomendas: Peliculas[] = [];
  idUsuario: string;

  pedidos$ = this.store.select(selectPedidos);
  stock$ = this.store.select(selectStock);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculasService,
    private pedidoService: PedidosService,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    const idlocalstorage = localStorage.getItem('INITIALIZACION_IN');
    if (!idlocalstorage) {
      this.router.navigate(['/login']);
      throw new Error('No se encuentra id');
    }
    this.idUsuario = idlocalstorage;

    this.detalles = {
      original_title: 'title',
      overview: 'overview',
      poster_path: 'img/jpg',
      vote_average: 0,
    };

    this.nuevoPedido = {
      titulo: '',
      precio: 0,
      idUsuario: this.idUsuario,
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.peliculaService.obtenerPeliculaPorId(this.id).subscribe((peli) => {
      let generos: Genero[] = [];
      peli.genres.forEach((gen: any) => {
        let g = gen.name ;
        generos.push(g);
        
      });

      this.detalles = {
        original_title: peli.original_title,
        overview: peli.overview,
        genres: generos,
        poster_path: peli.poster_path,
        vote_average: peli.vote_average,
      };

      this.pathImagen = this.img_url + this.detalles.poster_path;
    });

    this.obtenerRecomendadas();
  }

  obtenerRecomendadas() {
    this.id.toString();
    this.peliculaService.obtenerRelacionadas(this.id).subscribe((peliculas) => {
      peliculas.results.map((p: Peliculas) => {
        return this.listaPeliculasRecomendas.push({
          id: p.id,
          original_title: p.original_title,
          vote_average: p.vote_average,
          poster_path: p.poster_path,
          genre_ids: p.genre_ids,
          vote_count: p.vote_count,
          precio: p.vote_count > 1000 ? 1270 : 965,
          stock: 100,
        });
      });

      this.listaPeliculasRecomendas = [...this.listaPeliculasRecomendas];
    });
  }

 agregarAlCarrito(pelicula: string, precio: any) {
    this.nuevoPedido = {
      titulo: pelicula,
      precio: precio,
      idUsuario: this.idUsuario,
    };

    this.pedidoService
      .registrarPedido(this.nuevoPedido)
      .subscribe((pedido: Pedido) => {
        if (pedido) {
          this.snackBar.open('Película agregada con éxito', '', {
            duration: 1000,
          });

          this.listaPeliculasRecomendas = this.listaPeliculasRecomendas.map(
            (p) => {
              if (p.original_title === pelicula && p.stock) {
                p.stock--;
              }
              return p;
            }
          );
        } else {
          this.snackBar.open('Error al agregar Película', '', {
            duration: 1000,
          });
        }
      });
  }

  detallePelicula(id: number) {
    this.idDetalle = id;
    this.router
      .navigateByUrl('/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/detalle', { id: this.idDetalle }]);
      });
  }
}
