import db from "../database/database";
import { Pedido } from "../models/Pedido";

export class PedidoRepository {
  // Salvar um novo pedido no banco de dados
  salvar(p: Pedido): Pedido {
    const sql = `
      INSERT INTO pedidos (id_usuarios, valor_total, status_pedido) 
      VALUES (?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      p.id_usuarios, 
      p.valor_total, 
      p.status_pedido
    );

    return { 
      ...p, 
      id: Number(resultado.lastInsertRowid) 
    };
  }

  // Listar todos os pedidos cadastrados
  listar(): Pedido[] {
    return db.prepare("SELECT * FROM pedidos").all() as Pedido[];
  }

  // Buscar um pedido específico pelo ID
  buscarPorId(id: number): Pedido | null {
    const pedido = db.prepare("SELECT * FROM pedidos WHERE id = ?").get(id) as Pedido | undefined;
    return pedido ?? null;
  }

  // Remover um pedido permanentemente
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM pedidos WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}