import { app } from "../server";
import { CompraRepository } from "../repositories/CompraRepository";
import { Compra } from "../models/Compra";

export function CompraController() {
  const repository = new CompraRepository();

  // GET - Listar todas as compras realizadas
  app.get("/compras", (req, res) => {
    res.json(repository.listar());
  });

  // GET - Buscar uma compra específica por ID
  app.get("/compras/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const compra = repository.buscarPorId(id);
    
    if (!compra) {
      return res.status(404).json({ erro: "Registro de compra não encontrado" });
    }
    
    res.json(compra);
  });

  // POST - Registrar uma nova compra
  app.post("/compras", (req, res) => {
    try {
      const { cep, numero_casa, frete, forma_pagamento, quantidade, status, data } = req.body;

      // Validações manuais (Padrão do professor)
      if (!cep) throw new Error("O CEP é obrigatório para a entrega");
      if (!forma_pagamento) throw new Error("A forma de pagamento é obrigatória");
      if (!quantidade || quantidade <= 0) throw new Error("A quantidade deve ser maior que zero");
      if (!status) throw new Error("O status da compra é obrigatório");

      const novaCompra = repository.salvar({ 
        cep, 
        numero_casa, 
        frete, 
        forma_pagamento, 
        quantidade, 
        status, 
        data 
      } as Compra);

      res.status(201).json(novaCompra);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - Cancelar/Remover registro de compra
 // DELETE - Cancelar/Remover registro de compra
  app.delete("/compras/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Registro de compra não encontrado para exclusão" });
    }

    res.status(204).send();
  });
} 