// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlBack: 'http://localhost:3000/',
  themoviedb: 'https://api.themoviedb.org/3/movie/'
};


/**ubica tus rutas hacia el back dentro de la carpeta "environments", aca es el lugar para poner tus rutas absolutas y ya luego las modificas un ejemplo:
dentro de environments.ts: url :https://api.themoviedb.org/3/,
dentro de una funcion del  service : this._http.get(enviroment.url+''movie/popular?api_key=18f44261f2bdf99e218a95146792d24d&language=ES&page=1") ;
Dentro de tus interceptores agrega que en cada peticion se agregue el parametro de api_key, de esta manera no tendras que escribir por aca ruta el api_key
Agrega el api_key tambien a los envirinments
 */
