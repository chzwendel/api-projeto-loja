import db from "../database/database";
import { Fornecedor } from "../models/Fornecedor";

export class FornecedorRepository {
  salvar(forn: Fornecedor): Fornecedor {
    const resultado = db
      .prepare("INSERT INTO Fornecedor (nome_empresarial, cnpj, endereco, telefone, forma_pagamento) VALUES (?, ?, ?, ?, ?)")
      .run(forn.nome_empresarial, forn.cnpj, forn.endereco, forn.telefone, forn.forma_pagamento);

     return { id: Number(resultado.lastInsertRowid), id: forn.id, nome_empresarial: forn.nome_empresarial, cnpj: forn.cnpj, endereco: forn.endereco, telefone: forn.telefone, forma_pagamento: forn.forma_pagamento };
