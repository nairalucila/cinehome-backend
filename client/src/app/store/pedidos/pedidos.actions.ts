import { createAction, props } from '@ngrx/store';
import { Pedido } from 'src/app/models/pedidos';

export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId: string }>()
);

export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: string }>()
);

export const retrievedBookList = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ books: ReadonlyArray<any> }>()
);

export const agregarPedido = createAction(
  '[Pedidos service] Agregar pedido',
  props<Pedido>()
)

export const removerPedido = createAction(
  '[Pedidos service] Remover pedido',
  props<{_id: string}>()
)

export const removerTodosPedidos = createAction(
  '[Pedidos service] Remover todos los pedidos',
  props<{idUsuario: string}>()
)

export const inicializarListaPedidos = createAction(
  '[Pedidos service] Inicializar la lista de Pedidos',
  props<{pedidos: Pedido[]}>()
)
//este pedidos: Pedido[] lo desestructura en reducer