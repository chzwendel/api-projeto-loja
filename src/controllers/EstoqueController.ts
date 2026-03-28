import { app } from "../server";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export function EstoqueController() {
  const repository = new EstoqueRepository();

  // GET - Listar todo o estoque
  app.get("/estoque", (req, res) => {
    res.json(repository.listar());
  });

  // GET - Buscar registro de estoque por ID
  app.get("/estoque/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const registro = repository.buscarPorId(id);
    
    if (!registro) {
      return res.status(404).json({ erro: "Registro de estoque não encontrado" });
    }
    
    res.json(registro);
  });

  // POST - Criar novo registro de entrada/estoque
  app.post("/estoque", (req, res) => {
    try {
      const { entrada_mercadoria, status_produto, quantidade_produto } = req.body;

      // Validações manuais conforme o modelo do professor
      if (!entrada_mercadoria) throw new Error("A data de entrada é obrigatória");
      if (!status_produto) throw new Error("O status do produto é obrigatório");
      if (quantidade_produto === undefined || quantidade_produto < 0) {
        throw new Error("A quantidade deve ser informada e não pode ser negativa");
      }

      const novoEstoque = repository.salvar({ 
        entrada_mercadoria, 
        status_produto, 
        quantidade_produto 
      });

      res.status(201).json(novoEstoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - Remover registro de estoque
  app.delete("/estoque/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Registro de estoque não encontrado para exclusão" });
    }

    res.status(204).send(); // Sucesso sem conteúdo
  });
}