import express from "express";

import { UsuarioController } from "./controllers/UsuarioController";
import { CategoriaController } from "./controllers/CategoriaController";
import { PedidoController } from "./controllers/PedidoController";
import { ProdutoController } from "./controllers/ProdutoController";
import { PedidoItemController } from "./controllers/PedidoItemController";
import { EstoqueController } from "./controllers/EstoqueController";
import { FornecedorController } from "./controllers/FornecedorController";  
import { FuncionarioController } from "./controllers/FuncionarioController"; 
import { CompraController } from "./controllers/CompraController";
import { AvaliacaoController } from "./controllers/AvaliacaoController";
export const app = express();

app.use(express.json());

UsuarioController();
ProdutoController();
CategoriaController();
PedidoController();
PedidoItemController();
EstoqueController();
FornecedorController();
FuncionarioController();
CompraController();
AvaliacaoController();

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});