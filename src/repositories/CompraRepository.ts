import db from "../database/database";
import { Compra } from "../models/Compra";

export class CompraRepository {
  // Salva a compra e retorna com o ID do banco
  salvar(c: Compra): Compra {
    const sql = `
      INSERT INTO compras (cep, numero_casa, frete, forma_pagamento, quantidade, status, data) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      c.cep,
      c.numero_casa,
      c.frete,
      c.forma_pagamento,
      c.quantidade,
      c.status,
      c.data instanceof Date ? c.data.toISOString() : c.data
    );

    return { ...c, id: Number(resultado.lastInsertRowid) } as Compra;
  }

  // Lista todas as compras
  listar(): Compra[] {
    return db.prepare("SELECT * FROM compras").all() as Compra[];
  }

  // Busca uma compra específica por ID
  buscarPorId(id: number): Compra | null {
    const compra = db.prepare("SELECT * FROM compras WHERE id = ?").get(id) as Compra | undefined;
    return compra ?? null;
  }

  // Atualiza o status (ex: 'Pendente' para 'Pago') e retorna boolean
  atualizarStatus(id: number, novoStatus: string): boolean {
    const resultado = db
      .prepare("UPDATE compras SET status = ? WHERE id = ?")
      .run(novoStatus, id);
    return resultado.changes > 0;
  }

  // Exclui a compra e retorna boolean para o Controller
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM compras WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}