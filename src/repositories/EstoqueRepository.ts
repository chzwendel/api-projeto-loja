import db from "../database/database";
import { Estoque } from "../models/Estoque";

export class EstoqueRepository {
  salvar(est: Estoque): Estoque {
    const resultado = db
      .prepare("INSERT INTO Estoque (entrada_mercadoria, status_produto, quantidade_produto) VALUES (?, ?, ?)")
      .run(est.entrada_mercadoria, est.status_produto, est.quantidade_produto);

     return { id: Number(resultado.lastInsertRowid), id: est.id, entrada_mercadoria: est.entrada_mercadoria, status_produto: est.status_produto, quantidade_produto: est.quantidade_produto };