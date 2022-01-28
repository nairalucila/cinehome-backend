import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Peliculas, PeliculaSeleccionada, Genero} from '../models/peliculas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  
  //API PARA TRAER PELIS EN HOME
  apiUrlPopulares: string = "popular?api_key=18f44261f2bdf99e218a95146792d24d&language=ES&page=1";

  concat_apikey_lang: string = "?api_key=18f44261f2bdf99e218a95146792d24d&language=es-ES"

  //SE NECESITA ESTA URL PARA MOSTRAR IMAGENES
  img_url: string = "https://image.tmdb.org/t/p/w500/"

  idMovie: string = "";
  
   //API PARA TRAER PELIS EN DETALLES RELACIONADAS A LA ELEGIDA
  url_api_relacionados: string = '/similar?api_key=18f44261f2bdf99e218a95146792d24d&language=es&page=1';
  

  constructor(private http: HttpClient) {}
  

  construirUrl(movieId: string){
    return environment.themoviedb +  `${movieId}` + this.concat_apikey_lang;
  }

  construirUrlRecomendados(movieId: string){
    
    return environment.themoviedb +  `${movieId}`+ this.url_api_relacionados;
  }

  obtenerPeliculaPorId(idPelicula: string){
   
    return this.http.get<any>(this.construirUrl(idPelicula));
  }

  obtenerPeliculas(i:number) {
      return this.http.get<Peliculas[]>(environment.themoviedb + this.apiUrlPopulares + i);
  }


  obtenerRelacionadas(movieId: string) {
 
    return this.http.get<any>(this.construirUrlRecomendados(movieId));
  }
}
