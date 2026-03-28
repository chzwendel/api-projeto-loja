import db from "../database/database";
import { Avaliacao } from "../models/Avaliacao";

export class AvaliacaoRepository {
  // Salva a avaliação e retorna com o ID gerado pelo banco
  salvar(a: Avaliacao): Avaliacao {
    const sql = `
      INSERT INTO avaliacoes (curtida, estrelas, comentario, id_usuarios) 
      VALUES (?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      a.curtida,
      a.estrelas,
      a.comentario,
      a.id_usuarios
    );

    return { ...a, id: Number(resultado.lastInsertRowid) } as Avaliacao;
  }

  // Lista todas as avaliações cadastradas
  listar(): Avaliacao[] {
    return db.prepare("SELECT * FROM avaliacoes").all() as Avaliacao[];
  }

  // Busca uma avaliação específica por ID
  buscarPorId(id: number): Avaliacao | null {
    const avaliacao = db.prepare("SELECT * FROM avaliacoes WHERE id = ?").get(id) as Avaliacao | undefined;
    return avaliacao ?? null;
  }

  // Lista todas as avaliações de um usuário específico
  listarPorUsuario(id_usuario: number): Avaliacao[] {
    return db.prepare("SELECT * FROM avaliacoes WHERE id_usuarios = ?").all(id_usuario) as Avaliacao[];
  }

  // Exclui e retorna true se deletou, ou false se o ID não existia
  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM avaliacoes WHERE id = ?").run(id);
    return resultado.changes > 0;
  }

  // Atualiza o comentário e retorna se a operação foi bem-sucedida
  atualizarComentario(id: number, novoComentario: string): boolean {
    const resultado = db
      .prepare("UPDATE avaliacoes SET comentario = ? WHERE id = ?")
      .run(novoComentario, id);
    return resultado.changes > 0;
  }
}