import db from "../database/database";
import { Categoria } from "../models/Categoria";

export class CategoriaRepository {
  // Salva e retorna a categoria com o ID gerado
  salvar(cat: Categoria): Categoria {
    const sql = `
      INSERT INTO categorias (nome, beneficios, preco, id_categoria) 
      VALUES (?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      cat.nome,
      cat.beneficios,
      cat.preco,
      cat.id_categoria
    );

    return { ...cat, id: Number(resultado.lastInsertRowid) } as Categoria;
  }

  // Lista todas as categorias
  listar(): Categoria[] {
    return db.prepare("SELECT * FROM categorias").all() as Categoria[];
  }

  // Busca uma categoria específica por ID
  buscarPorId(id: number): Categoria | null {
    const categoria = db.prepare("SELECT * FROM categorias WHERE id = ?").get(id) as Categoria | undefined;
    return categoria ?? null;
  }

  // Atualiza o preço da categoria e retorna boolean (sucesso/falha)
  atualizarPreco(id: number, novoPreco: number): boolean {
    const resultado = db
      .prepare("UPDATE categorias SET preco = ? WHERE id = ?")
      .run(novoPreco, id);
    return resultado.changes > 0;
  }

  // Exclui a categoria e retorna boolean para o Controller
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM categorias WHERE id = ?").run(id);
    return resultado.changes > 0;
  }

  // Busca subcategorias vinculadas a uma categoria pai
  listarPorCategoriaPai(id_pai: number): Categoria[] {
    return db.prepare("SELECT * FROM categorias WHERE id_categoria = ?").all(id_pai) as Categoria[];
  }
}