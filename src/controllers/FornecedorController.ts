import { app } from "../server";
import { FornecedorRepository } from "../repositories/FornecedorRepository";
import { Fornecedor } from "../models/Fornecedor";

export function FornecedorController() {
  const repository = new FornecedorRepository();

  // GET - Listar todos os fornecedores da loja
  app.get("/fornecedores", (req, res) => {
    res.json(repository.listar());
  });

  // GET - Buscar um fornecedor específico por ID
  app.get("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const fornecedor = repository.buscarPorId(id);
    
    if (!fornecedor) {
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    }
    
    res.json(fornecedor);
  });

  // POST - Cadastrar novo fornecedor (Ex: Fábrica de Camisetas)
  app.post("/fornecedores", (req, res) => {
    try {
      const { nome_empresarial, cnpj, endereco, telefone, forma_pagamento } = req.body;

      // Validações manuais conforme o padrão do professor
      if (!nome_empresarial) throw new Error("O nome empresarial é obrigatório");
      if (!cnpj) throw new Error("O CNPJ é obrigatório");
      if (!telefone) throw new Error("O telefone de contato é obrigatório");

      const novoFornecedor = repository.salvar({ 
        nome_empresarial, 
        cnpj, 
        endereco, 
        telefone, 
        forma_pagamento 
      } as Fornecedor); // O 'as Fornecedor' evita o erro do ID

      res.status(201).json(novoFornecedor);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - Remover fornecedor
  app.delete("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Fornecedor não encontrado para exclusão" });
    }

    res.status(204).send();
  });
}