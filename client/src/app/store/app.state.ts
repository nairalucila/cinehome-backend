import { Pedido } from "../models/pedidos";


export interface AppState {
  pedidos: ReadonlyArray<Pedido[]>;
}