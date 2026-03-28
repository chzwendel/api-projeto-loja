import { app } from "../server";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { Pedido } from "../models/Pedido";

export function PedidoController() {
  const repository = new PedidoRepository();

  app.get("/pedidos", (req, res) => {
    res.json(repository.listar());
  });

  app.post("/pedidos", (req, res) => {
    try {
      const { data_pedido, valor_total, status, id_usuarios, forma_pagamento, status_pagamento, status_pedido, quantidade } = req.body;

      if (!id_usuarios) throw new Error("ID do usuário é obrigatório");
      if (valor_total < 0) throw new Error("O valor total não pode ser negativo");

      const novoPedido = repository.salvar({ 
        data_pedido, 
        valor_total, 
        status, 
        id_usuarios,
        forma_pagamento,
        status_pagamento,
        status_pedido,
        quantidade
      } as Pedido);

      res.status(201).json(novoPedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}