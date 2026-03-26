import db from "../database/database";
import { Funcionario } from "../models/Funcionario";

export class FuncionarioRepository {
  salvar(f: Funcionario): Funcionario {
    const resultado = db
      .prepare("INSERT INTO Funcionario (nome, cpf, data_nascimento, senha, cargo, nivel_permissao) VALUES (?, ?, ?, ?, ?, ?)")
      .run(f.nome, f.cpf, f.data_nascimento, f.senha, f.cargo, f.nivel_permissao);

     return { id: Number(resultado.lastInsertRowid), id: f.id, nome: f.nome, cpf: f.cpf, data_nascimento: f.data_nascimento, senha: f.senha, cargo: f.cargo, nivel_permissao: f.nivel_permissao };
