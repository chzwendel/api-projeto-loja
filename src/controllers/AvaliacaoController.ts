import { app } from "../server";
import { EstoqueRepository } from "../repositories/EstoqueRepository";
import { Estoque } from "../models/Estoque";

export function EstoqueController() {
  const repository = new EstoqueRepository();

  app.get("/estoque", (req, res) => {
    res.json(repository.listar());
  });

  app.post("/estoque", (req, res) => {
    try {
      const { quantidade, data_atualizacao, id_produto } = req.body;

      if (id_produto === undefined) throw new Error("ID do produto é obrigatório");
      if (quantidade < 0) throw new Error("A quantidade não pode ser negativa");

      const novoEstoque = repository.salvar({ 
        quantidade, 
        data_atualizacao, 
        id_produto,
        entrada_mercadoria: new Date().toISOString(),
        status_produto: "ativo",
        quantidade_produto: quantidade
      } as Estoque);

      res.status(201).json(novoEstoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}