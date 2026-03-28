import { app } from "../server";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export function UsuarioController() {
  const repository = new UsuarioRepository();

  // GET - Listar todos os usuários (Admin)
  app.get("/usuarios", (req, res) => {
    res.json(repository.listar());
  });

  // GET - Buscar um usuário específico por ID
  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = repository.buscarPorId(id);
    
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    res.json(usuario);
  });

  // POST - Cadastrar novo usuário
  app.post("/usuarios", (req, res) => {
    try {
      const { nome, email, senha, telefone, tipo_usuario } = req.body;

      // Validações manuais (Padrão do professor)
      if (!nome) throw new Error("O nome é obrigatório");
      if (!email || !email.includes("@")) throw new Error("E-mail inválido");
      if (!senha || senha.length < 6) throw new Error("A senha deve ter no mínimo 6 caracteres");
      if (!tipo_usuario) throw new Error("O tipo de usuário é obrigatório (ex: admin, vendedor)");

     // Criamos um objeto "solto" e dizemos que ele é Usuario
      const dadosParaSalvar: any = { 
        nome, 
        email, 
        senha, 
        telefone, 
        tipo_usuario 
      };

      const novoUsuario = repository.salvar(dadosParaSalvar as Usuario);

      res.status(201).json(novoUsuario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // DELETE - remover usuário
  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const excluido = repository.excluir(id);

    if (!excluido) {
      return res.status(404).json({ erro: "Usuário não encontrado para exclusão" });
    }

    res.status(204).send();
  });
} // <--- Faltava fechar aqui!