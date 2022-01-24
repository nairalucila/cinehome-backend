import { createReducer, on } from '@ngrx/store';
import { Pedido } from 'src/app/models/pedidos';

import { agregarPedido, inicializarListaPedidos, removerPedido, removerTodosPedidos } from './pedidos.actions';

export const initialState: ReadonlyArray<Pedido> = [];

//el caalback de la funcion on actua sobre el estado
export const pedidosReducer = createReducer(
  initialState,
  on(agregarPedido, function(state,  pedido) { return [...state, pedido]}),
  on(removerPedido, (state, {_id}) => state.filter(pedido => pedido._id != _id)),
  on(removerTodosPedidos, () => []),
  on(inicializarListaPedidos, (state, {pedidos})=> pedidos)
  
);