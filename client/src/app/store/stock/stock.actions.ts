import { createAction, props } from '@ngrx/store';

export const modificarStock = createAction(
  '[Stock] Modificar stock',
  props<any>()
);


