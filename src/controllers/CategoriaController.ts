import { app } from "../server";
import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { Categoria } from "../models/Categoria";

export function CategoriaController() {
  const repository = new CategoriaRepository();

  // GET - Listar todas as categorias
  app.get("/categorias", (req, res) => {
    res.json(repository.listar());
  });

  // GET - Buscar uma categoria por ID
  app.get("/categorias/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoria = repository.buscarPorId(id);
    
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    
    res.json(categoria);
  });

  // POST - Criar nova categoria (Ex: "Inverno", "Masculino")
  app.post("/categorias", (req, res) => {
    try {
      const { nome, beneficios, preco, id_categoria } = req.body;

      // Validações manuais (Padrão do professor)
      if (!nome || nome.trim().length === 0) throw new Error("O nome da categoria é obrigatório");
      if (preco < 0) throw new Error("O preço base não pode ser negativo");

      const novaCategoria = repository.salvar({ 
        nome, 
        beneficios, 
        preco, 
        id_categoria 
      } as Categoria);

      res.status(201).json(novaCategoria);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - Remover categoria
  app.delete("/categorias/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Categoria não encontrada para exclusão" });
    }

    res.status(204).send();
  });
}