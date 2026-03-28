import { app } from "../server";
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";
import { Funcionario } from "../models/Funcionario";

export function FuncionarioController() {
  const repository = new FuncionarioRepository();

  // GET - Listar todos os funcionários
  app.get("/funcionarios", (req, res) => {
    res.json(repository.listar());
  });

  // GET - Buscar por ID
  app.get("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = repository.buscarPorId(id);
    
    if (!funcionario) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }
    
    res.json(funcionario);
  });

  // POST - Cadastrar novo funcionário
  app.post("/funcionarios", (req, res) => {
    try {
      const { nome, cpf, data_nascimento, senha, cargo, nivel_permissao } = req.body;

      // Validações manuais (Padrão do professor)
      if (!nome) throw new Error("O nome é obrigatório");
      if (!cpf) throw new Error("O CPF é obrigatório");
      if (!senha || senha.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres");
      if (!cargo) throw new Error("O cargo é obrigatório");
      if (nivel_permissao === undefined) throw new Error("O nível de permissão é obrigatório");

     // Dentro do app.post...
      const novoFuncionario = repository.salvar({ 
        nome, 
        cpf, 
        data_nascimento, 
        senha, 
        cargo, 
        nivel_permissao 
      } as Funcionario); 

      res.status(201).json(novoFuncionario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - Remover funcionário
  app.delete("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Funcionário não encontrado para exclusão" });
    }

    res.status(204).send();
  });
}