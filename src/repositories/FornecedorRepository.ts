import db from "../database/database";
import { Fornecedor } from "../models/Fornecedor";

export class FornecedorRepository {
  salvar(forn: Fornecedor): Fornecedor {
    const sql = `
      INSERT INTO Fornecedor (nome_empresarial, cnpj, endereco, telefone, forma_pagamento) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      forn.nome_empresarial,
      forn.cnpj,
      forn.endereco,
      forn.telefone,
      forn.forma_pagamento
    );

    // Corrigido: Pegamos os dados originais e aplicamos o ID real do banco
    return { ...forn, id: Number(resultado.lastInsertRowid) } as Fornecedor;
  }

  listar(): Fornecedor[] {
    return db.prepare("SELECT * FROM Fornecedor").all() as Fornecedor[];
  }

  buscarPorId(id: number): Fornecedor | null {
    return (db.prepare("SELECT * FROM Fornecedor WHERE id = ?").get(id) as Fornecedor) ?? null;
  }

  // Função extra: buscar por CNPJ (muito comum para evitar fornecedores duplicados)
  buscarPorCnpj(cnpj: string): Fornecedor | null {
    return (db.prepare("SELECT * FROM Fornecedor WHERE cnpj = ?").get(cnpj) as Fornecedor) ?? null;
  }

  // Retorna boolean para o Controller saber se a atualização deu certo
  atualizarTelefone(id: number, novoTelefone: string): boolean {
    const resultado = db
      .prepare("UPDATE Fornecedor SET telefone = ? WHERE id = ?")
      .run(novoTelefone, id);
    return resultado.changes > 0;
  }

  // Retorna boolean para o seu "if (!removido)" do Controller funcionar
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM Fornecedor WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}