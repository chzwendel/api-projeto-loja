export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    descricao: string;
    categoria: string;
    estoque: number;
    valor_custo: number;
    valor_venda: number;
    tamanho: string;
    cor: string;
    marca: string;
    data_cadastro: Date;
    codigo_barras: string;
    quantidade: number;
    fornecedor_id: number;
    id_estoque: number;
    id_fornecedor: number;
    id_usuarios: number
}