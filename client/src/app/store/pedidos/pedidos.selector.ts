import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pedido } from 'src/app/models/pedidos';

export const selectPedidos =
  createFeatureSelector<ReadonlyArray<Pedido[]>>('pedidos');


