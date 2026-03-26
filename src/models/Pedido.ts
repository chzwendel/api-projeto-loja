export interface Pedido {
    id?: number;
    numero_pedido?: number;
    forma_pagamento: string;
    status_pagamento: string;
    status_pedido: string;
    id_usuarios: number;
    valor_total: number;
    data_pedido: string;
    quantidade: number;
}