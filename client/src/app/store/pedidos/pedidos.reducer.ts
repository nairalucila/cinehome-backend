import { createReducer, on } from '@ngrx/store';
import { Pedido } from 'src/app/models/pedidos';

import { agregarPedido, removerPedido, removerTodosPedidos } from './pedidos.actions';

export const initialState: ReadonlyArray<Pedido> = [];

export const pedidosReducer = createReducer(
  initialState,
  on(agregarPedido, function(state,  pedido) { return [...state, pedido]}),
  on(removerPedido, (state, {_id}) => state.filter(pedido => pedido._id != _id)),
  on(removerTodosPedidos, () => []),
);