import { app } from "../server";
import { PedidoItemRepository } from "../repositories/PedidoItemRepository";
import { PedidoItem } from "../models/PedidoItem";

export function PedidoItemController() {
  const repository = new PedidoItemRepository();

  // GET - Listar itens de um pedido específico
  app.get("/pedidos/:id/itens", (req, res) => {
    const id_pedido = parseInt(req.params.id);
    res.json(repository.buscarPorPedido(id_pedido));
  });

  // POST - Adicionar item ao pedido
  app.post("/pedido-itens", (req, res) => {
    try {
      const { id_pedido, id_produto, quantidade, valor_unitario } = req.body;

      // Validações manuais
      if (!id_pedido) throw new Error("O ID do pedido é obrigatório");
      if (!id_produto) throw new Error("O ID do produto é obrigatório");
      if (!quantidade || quantidade <= 0) throw new Error("A quantidade deve ser maior que zero");

      const novoItem = repository.salvar({
        id_pedido,
        id_produto,
        quantidade,
        valor_unitario
      } as PedidoItem);

      res.status(201).json(novoItem);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - Remover um item específico
  app.delete("/pedido-itens/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Item não encontrado para exclusão" });
    }

    res.status(204).send();
  });
}