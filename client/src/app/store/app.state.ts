import { Pedido } from "../models/pedidos";
import { UsuarioState } from "./usuario/usuario.reducer";


export interface AppState {
  pedidos: ReadonlyArray<Pedido[]>;
  usuario: Readonly<UsuarioState>;
}