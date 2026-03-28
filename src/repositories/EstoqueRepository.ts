import db from "../database/database";
import { Estoque } from "../models/Estoque";

export class EstoqueRepository {
  // Salva e retorna o objeto com o ID real
  salvar(est: Estoque): Estoque {
    const sql = `
      INSERT INTO Estoque (entrada_mercadoria, status_produto, quantidade_produto) 
      VALUES (?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      est.entrada_mercadoria,
      est.status_produto,
      est.quantidade_produto
    );

    return { ...est, id: Number(resultado.lastInsertRowid) } as Estoque;
  }

  // Lista todos os registros de estoque
  listar(): Estoque[] {
    return db.prepare("SELECT * FROM Estoque").all() as Estoque[];
  }

  // Busca um registro específico por ID
  buscarPorId(id: number): Estoque | null {
    return (db.prepare("SELECT * FROM Estoque WHERE id = ?").get(id) as Estoque) ?? null;
  }

  // Atualiza a quantidade e retorna se deu certo
  atualizarQuantidade(id: number, novaQuantidade: number): boolean {
    const resultado = db
      .prepare("UPDATE Estoque SET quantidade_produto = ? WHERE id = ?")
      .run(novaQuantidade, id);
    return resultado.changes > 0;
  }

  // Exclui e retorna boolean para o Controller
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM Estoque WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}