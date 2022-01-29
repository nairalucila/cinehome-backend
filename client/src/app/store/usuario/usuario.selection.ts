import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsuarioState } from './usuario.reducer';

export const selectUsuario =
  createFeatureSelector<UsuarioState>('usuario');

export const selectUsuarioIsLogged = createSelector(
  selectUsuario,
  (state: UsuarioState) => state.isLogged
)
