import db from "../database/database";
import { Funcionario } from "../models/Funcionario";

export class FuncionarioRepository {
  salvar(f: Funcionario): Funcionario {
    const sql = `
      INSERT INTO Funcionario (nome, cpf, data_nascimento, senha, cargo, nivel_permissao) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      f.nome, 
      f.cpf, 
      f.data_nascimento, 
      f.senha, 
      f.cargo, 
      f.nivel_permissao
    );

    // Usando o spread (...) para pegar tudo de f e apenas atualizar o ID correto
    return { ...f, id: Number(resultado.lastInsertRowid) } as Funcionario;
  }

  listar(): Funcionario[] {
    return db.prepare("SELECT * FROM Funcionario").all() as Funcionario[];
  }

  buscarPorId(id: number): Funcionario | null {
    return (db.prepare("SELECT * FROM Funcionario WHERE id = ?").get(id) as Funcionario) ?? null;
  }

  // Função extra muito útil: buscar por CPF (para login ou verificação)
  buscarPorCpf(cpf: string): Funcionario | null {
    return (db.prepare("SELECT * FROM Funcionario WHERE cpf = ?").get(cpf) as Funcionario) ?? null;
  }

  // Retorna boolean para o Controller saber se a atualização funcionou
  atualizarCargo(id: number, novoCargo: string): boolean {
    const resultado = db
      .prepare("UPDATE Funcionario SET cargo = ? WHERE id = ?")
      .run(novoCargo, id);
    return resultado.changes > 0;
  }

  // Retorna boolean para evitar aquele erro do "!removido" no Controller
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM Funcionario WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}