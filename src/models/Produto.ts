export interface Produto {
    id?: number;
    nome: string;
    categoria: string;
    tamanho: string;
    cor: string;
    codigo_barras: string;
    marca: string;
    valor_custo: number;
    valor_venda: number;
    quantidade: number;
    id_estoque: number;
    id_fornecedor: number;
    id_usuarios: number;
}