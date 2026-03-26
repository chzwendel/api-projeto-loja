import { app } from "../server";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
  const repository = new ProdutoRepository();

  app.get("/produtos", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const produtos = repository.buscarPorNome(nome as string);
      return res.json(produtos);
    }

    res.json(repository.listar());
  });

  app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = repository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  });

  app.post("/produtos", (req, res) => {
    try {
      const { 
        nome, categoria, tamanho, cor, codigo_barras, 
        marca, valor_custo, valor_venda, quantidade, 
        id_estoque, id_fornecedor, id_usuarios 
      } = req.body;

      if (!nome) throw new Error("Nome é obrigatório");
      if (valor_venda <= 0) throw new Error("Valor de venda deve ser maior que zero");

      const produto = repository.salvar({ 
        nome, categoria, tamanho, cor, codigo_barras, 
        marca, valor_custo, valor_venda, quantidade, 
        id_estoque, id_fornecedor, id_usuarios 
      });

      res.status(201).json(produto);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);
    if (!excluido) return res.status(404).json({ erro: "Produto não encontrado" });
    res.status(204).send();
  });
}