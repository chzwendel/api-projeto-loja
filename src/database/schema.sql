CREATE TABLE IF NOT EXISTS Produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    tamanho VARCHAR(50) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    codigo_barras VARCHAR(50) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    valor_custo DECIMAL(10, 2) NOT NULL,
    valor_venda DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantidade INT NOT NULL,
    id_estoque INT NOT NULL,
    id_fornecedor INT NOT NULL,
    id_usuarios INT NOT NULL,
    FOREIGN KEY (id_estoque) REFERENCES estoque(id),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id),
    FOREIGN KEY (id_usuarios) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS Fornecedor(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_empresarial VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    endereco VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    forma_pagamento VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Pedido (
    numero_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    forma_pagamento VARCHAR(100) NOT NULL,
    status_pagamento VARCHAR(100) NOT NULL,
    status_pedido VARCHAR(100) NOT NULL,
    id_usuarios INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    data\_pedido DATETIME NOT NULL DEFAULT CURRENT\_TIMESTAMP,
    quantidade INT NOT NULL,
    FOREIGN KEY (id_usuarios) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS PedidoItem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (id\_pedido) REFERENCES pedido(numero\_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15) NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Funcionario (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome VARCHAR(100) NOT NULL,
   cpf VARCHAR(11) NOT NULL UNIQUE,
   data_nascimento DATE NOT NULL,
   senha TEXT NOT NULL,
   cargo VARCHAR(15) NOT NULL,
   nivel_permissao

CREATE TABLE IF NOT EXISTS Compra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cep VARCHAR(8) NOT NULL,
    numero_casa VARCHAR(10) NOT NULL,
    frete DECIMAL(10, 2) NOT NULL,
    forma_pagamento VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Avaliacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    curtida VARCHAR(1) NOT NULL,
    estrelas INT NOT NULL,
    comentario VARCHAR(255),
    id_usuarios INT NOT NULL,
    FOREIGN KEY (id_usuarios) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS Estoque(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entrada_mercadoria DATE NOT NULL,
    status_produto VARCHAR(100) NOT NULL,
    quantidade_produto INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Categoria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    beneficios VARCHAR(100),
    preco DECIMAL(10,2),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);