import db from "../database/database";
import { PedidoItem } from "../models/PedidoItem";

export class PedidoItemRepository {
  salvar(pi: PedidoItem): PedidoItem {
    const sql = `
      INSERT INTO PedidoItem (id_pedido, id_produto, quantidade) 
      VALUES (?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      pi.id_pedido, 
      pi.id_produto, 
      pi.quantidade
    );

    return { 
      ...pi, 
      id: Number(resultado.lastInsertRowid) 
    } as PedidoItem;
  }

  listar(): PedidoItem[] {
    return db.prepare("SELECT * FROM PedidoItem").all() as PedidoItem[];
  }

  buscarPorId(id: number): PedidoItem | null {
    return (db.prepare("SELECT * FROM PedidoItem WHERE id = ?").get(id) as PedidoItem) ?? null;
  }

  // Muito útil para listar todos os itens de um pedido específico
  buscarPorPedido(id_pedido: number): PedidoItem[] {
    return db.prepare("SELECT * FROM PedidoItem WHERE id_pedido = ?").all(id_pedido) as PedidoItem[];
  }

  // Retorna boolean para o Controller saber se a atualização deu certo
  atualizarQuantidade(id: number, novaQuantidade: number): boolean {
    const resultado = db
      .prepare("UPDATE PedidoItem SET quantidade = ? WHERE id = ?")
      .run(novaQuantidade, id);
    return resultado.changes > 0;
  }

  // Retorna boolean para evitar o erro no Controller
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM PedidoItem WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}