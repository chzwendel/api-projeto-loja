import db from "../database/database";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository {
  salvar(c: Usuario): Usuario {
    const sql = `
      INSERT INTO usuarios (nome, email, cpf, telefone, data_nascimento, endereco, senha) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      c.nome, 
      c.email, 
      c.cpf, 
      c.telefone, 
      c.data_nascimento, 
      c.endereco, 
      c.senha
    );

    return { 
      ...c, 
      id: Number(resultado.lastInsertRowid) 
    };
  }

  listar(): Usuario[] {
    return db.prepare("SELECT * FROM usuarios").all() as Usuario[];
  }

  buscarPorId(id: number): Usuario | null {
    const usuario = db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id) as Usuario | undefined;
    return usuario ?? null;
  }

  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM usuarios WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}