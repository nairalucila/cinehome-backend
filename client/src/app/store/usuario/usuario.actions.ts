import { createAction, props } from '@ngrx/store';

export const obtenerSiHayUsuario = createAction(
  '[Usuario] Logeado',
  props<{hayUsuario: boolean}>()
);
