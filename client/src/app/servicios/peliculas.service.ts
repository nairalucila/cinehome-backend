import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Peliculas, PeliculaSeleccionada, Genero} from '../models/peliculas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  
  //API URL FALTA PAG 1
  apiUrlPopulares: string = "popular?api_key=18f44261f2bdf99e218a95146792d24d&language=ES&page=1";

  // url_api_test: string = "https://api.themoviedb.org/3/movie/popular?api_key=18f44261f2bdf99e218a95146792d24d&language=ES&page=";

  //API_MOVIE_PARAM
  // url_api_id: string = "https://api.themoviedb.org/3/movie/{movie_id}"

  concat_apikey_lang: string = "?api_key=18f44261f2bdf99e218a95146792d24d&language=es-ES"

  //IMAGE URL
  img_url: string = "https://image.tmdb.org/t/p/w500/"

  idMovie: string = "";
  
  url_api_relacionados: string = '/similar?api_key=18f44261f2bdf99e218a95146792d24d&language=es&page=1';
  //this.idMovie + "

  constructor(private http: HttpClient) {}
  

  construirUrl(movieId: string){
    return environment.themoviedb +  `${movieId}` + this.concat_apikey_lang;
  }

  construirUrlRecomendados(movieId: string){
    //return environment.themoviedb +  `${movieId}` + this.concat_apikey_lang;
    return environment.themoviedb +  `${movieId}`+ this.url_api_relacionados;
  }
/**'/similar?api_key=18f44261f2bdf99e218a95146792d24d&language=es&page=1' */
  obtenerPeliculaPorId(idPelicula: string){
   //let urlArmada =  this.construirUrl(idPelicula);
    return this.http.get<any>(this.construirUrl(idPelicula));
  }

  obtenerPeliculas(i:number) {
      return this.http.get<Peliculas[]>(environment.themoviedb + this.apiUrlPopulares + i);
  }


  obtenerRelacionadas(movieId: string) {
   // let urlArmada =  this.construirUrlRecomendados(movieId);
    return this.http.get<any>(this.construirUrlRecomendados(movieId));
  }
}
