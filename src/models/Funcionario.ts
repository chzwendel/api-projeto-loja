export interface Funcionario {
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    data_nascimento: Date;
    senha: string;
    cargo: string;
    nivel_permissao: number;
}