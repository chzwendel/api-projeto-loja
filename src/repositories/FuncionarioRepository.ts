import db from "../database/database";
import { PedidoItem } from "../models/PedidoItem";

export class PedidoItemRepository {
  salvar(pedido: PedidoItem): PedidoItem {
    const resultado = db
      .prepare("INSERT INTO PedidoItem (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)")
      .run(pedido.id_pedido, pedido.id_produto, pedido.quantidade);

    return { id: Number(resultado.lastInsertRowid), id_pedido: pedido.id_pedido, id_produto: pedido.id_produto, quantidade: pedido.quantidade };
