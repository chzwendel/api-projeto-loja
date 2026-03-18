export interface Compra {
    id?: number;
    cep: string;
    numero_casa: string;
    frete: number;
    forma_pagamento: string;
    quantiade: number;
    status: string;
    data: Date
}