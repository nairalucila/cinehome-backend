import { createReducer, on, State } from '@ngrx/store';
import { modificarStock } from './stock.actions';
//ReadonlyArray<any>
export const initialState:  any = "";


export const stockReducer = createReducer(
  initialState,
  on(modificarStock, (state, payload)=> console.log(state, payload))
  
);