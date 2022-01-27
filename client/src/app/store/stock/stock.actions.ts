import { createAction, props } from '@ngrx/store';

export const modificarStock = createAction(
  '[Stock] Modificar stock',
  props<any>()
);

export const ocultarNav = createAction(
  '[Stock] Ocultar Barra navegacion',
  props<{ esVisible: boolean }>()
);

