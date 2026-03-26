import db from "../database/database";
import { Produto } from "../models/Produto";

export class ProdutoRepository {
  salvar(p: Produto): Produto {
    const sql = `
      INSERT INTO produtos 
      (nome, categoria, tamanho, cor, codigo_barras, marca, valor_custo, valor_venda, quantidade, id_estoque, id_fornecedor, id_usuarios) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      p.nome, p.categoria, p.tamanho, p.cor, p.codigo_barras, 
      p.marca, p.valor_custo, p.valor_venda, p.quantidade, 
      p.id_estoque, p.id_fornecedor, p.id_usuarios
    );

    return { ...p, id: Number(resultado.lastInsertRowid) };
  }

  // - Listar todos
  listar(): Produto[] {
    return db.prepare("SELECT * FROM produtos").all() as Produto[];
  }

  // - Buscar por ID
  buscarPorId(id: number): Produto | null {
    const produto = db.prepare("SELECT * FROM produtos WHERE id = ?").get(id) as Produto | undefined;
    return produto ?? null;
  }

  // - Buscar por Nome (Filtro útil para busca rápida)
  buscarPorNome(nome: string): Produto[] {
    return db.prepare("SELECT * FROM produtos WHERE nome LIKE ?").all(`%${nome}%`) as Produto[];
  }

  // - Atualização de estoque simplificada
  atualizarEstoque(id: number, novaQuantidade: number): boolean {
    const resultado = db.prepare("UPDATE produtos SET quantidade = ? WHERE id = ?").run(novaQuantidade, id);
    return resultado.changes > 0;
  }

  // DELETE
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM produtos WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}