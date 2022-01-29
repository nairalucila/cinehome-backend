import { createReducer, on, State } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Usuarios } from 'src/app/models/usuarios';
import { AppState } from '../app.state';
import { obtenerSiHayUsuario } from './usuario.actions';

export interface UsuarioState {
  isLogged: boolean;
}

//ReadonlyArray<any>
export const initialState: UsuarioState = {
  isLogged: false,
};

export const usuarioReducer = createReducer(
  initialState,
  on(obtenerSiHayUsuario, (state, payload) =>
    cambiarLoggedProp(state, payload.hayUsuario)
  )
);

function cambiarLoggedProp(state: UsuarioState, estaLogeado: boolean) {
  return {
    ...state,
    isLogged: estaLogeado,
  };
}
