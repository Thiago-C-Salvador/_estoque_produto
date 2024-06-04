CREATE DATABASE estoque;
USE estoque;

CREATE TABLE `usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `s_nome` varchar(255),
  `s_user_name` varchar(100),
  `s_pass_user` varchar(100),
  `id_t_nivelUsuario` int,
  `c_status_usuario` char,
  `s_foto_usuario` mediumtext
);

CREATE TABLE `telefone_colaborador` (
  `id_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `id_t_usuario` int,
  `s_numero_telefone` varchar(255)
);

CREATE TABLE `nivel_usuario` (
  `id_nivel_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_usuario` varchar(255),
  `n_nivel` int
);

CREATE TABLE `fornecedor` (
  `id_fornecedor` int PRIMARY KEY AUTO_INCREMENT,
  `s_nome_empresa` varchar(255),
  `s_nome_representante` varchar(255),
  `c_status` char
);

CREATE TABLE `telefone_fornecedor` (
  `id_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `id_t_fornecedor` int,
  `s_num_telefone` varchar(255)
);

CREATE TABLE `telefone_representante` (
  `id_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `id_t_fornecedor` int,
  `s_num_telefone` varchar(255)
);

CREATE TABLE `produto` (
  `n_codigo_produto` varchar(255),
  `id_t_classe_produto` int,
  `s_descricao_produto` varchar(255),
  `n_qnt_produto` int,
  `id_t_fornecedor` int,
  `c_status_produto` char,
  `s_foto_produto` mediumtext
);

CREATE TABLE `classe_produto` (
  `id_classe` int PRIMARY KEY AUTO_INCREMENT,
  `s_descricao_classe` varchar(255)
);

CREATE TABLE `movimentacao` (
  `id_movimentacao` int PRIMARY KEY AUTO_INCREMENT,
  `id_t_usuario` int,
  `id_t_natureza_movimentacao` int,
  `n_qnt_movimentada` int,
  `id_t_fornecedor` int,
  `dt_data` varchar(255)
);

CREATE TABLE `natureza_movimentacao` (
  `id_natureza` int PRIMARY KEY AUTO_INCREMENT,
  `s_descricao_natureza` varchar(255),
  `id_t_acao_nat_movimento` int
);

CREATE TABLE `acao_natureza_movimento` (
  `id_acao` int PRIMARY KEY AUTO_INCREMENT,
  `s_tipo_acao` varchar(20)
);

CREATE TABLE `token` (
  `id_token` int PRIMARY KEY AUTO_INCREMENT,
  `id_t_usuario` int,
  `s_token` varchar(255),
  `s_validade` varchar(255)
);

ALTER TABLE `usuario` ADD FOREIGN KEY (`id_t_nivelUsuario`) REFERENCES `nivel_usuario` (`id_nivel_usuario`);

ALTER TABLE `telefone_colaborador` ADD FOREIGN KEY (`id_t_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `telefone_fornecedor` ADD FOREIGN KEY (`id_t_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`);

ALTER TABLE `telefone_representante` ADD FOREIGN KEY (`id_t_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`);

ALTER TABLE `produto` ADD FOREIGN KEY (`id_t_classe_produto`) REFERENCES `classe_produto` (`id_classe`);

ALTER TABLE `produto` ADD FOREIGN KEY (`id_t_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`);

ALTER TABLE `movimentacao` ADD FOREIGN KEY (`id_t_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `movimentacao` ADD FOREIGN KEY (`id_t_natureza_movimentacao`) REFERENCES `natureza_movimentacao` (`id_natureza`);

ALTER TABLE `movimentacao` ADD FOREIGN KEY (`id_t_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`);

ALTER TABLE `natureza_movimentacao` ADD FOREIGN KEY (`id_t_acao_nat_movimento`) REFERENCES `acao_natureza_movimento` (`id_acao`);

ALTER TABLE `token` ADD FOREIGN KEY (`id_t_usuario`) REFERENCES `usuario` (`id_usuario`);

INSERT INTO `nivel_usuario` (`id_nivel_usuario`, `s_desc_usuario`, `n_nivel`) VALUES (NULL, 'colaborador', 2);

INSERT INTO `nivel_usuario` (`id_nivel_usuario`, `s_desc_usuario`, `n_nivel`) VALUES (NULL, 'administrador', 4);

INSERT INTO `nivel_usuario` (`id_nivel_usuario`, `s_desc_usuario`, `n_nivel`) VALUES (NULL, 'superusuario', 6);

INSERT INTO `usuario` (`id_usuario`, `s_nome`, `s_user_name`, `s_pass_user`, `id_t_nivelUsuario`, `c_status_usuario`, `s_foto_usuario`) 
VALUES (NULL, 'Administrado BackOffice', 'backoffice@administrador', 'Admin123@', 2, 'A', '#');

INSERT INTO `usuario` (`id_usuario`, `s_nome`, `s_user_name`, `s_pass_user`, `id_t_nivelUsuario`, `c_status_usuario`, `s_foto_usuario`) 
VALUES (NULL, 'User Super', 'backoffice@superUser', 'Super2024@', 3, 'A', '#');

INSERT INTO `acao_natureza_movimento` (`id_acao`, `s_tipo_acao`) VALUES (NULL, 'entrada');

INSERT INTO `acao_natureza_movimento` (`id_acao`, `s_tipo_acao`) VALUES (NULL, 'saida');

INSERT INTO `natureza_movimentacao` (`id_natureza`, `s_descricao_natureza`, `id_t_acao_nat_movimento`) VALUES (NuLL, 'COMPRA', 1);

INSERT INTO `natureza_movimentacao` (`id_natureza`, `s_descricao_natureza`, `id_t_acao_nat_movimento`) VALUES (NuLL, 'VENDA', 2);

INSERT INTO `natureza_movimentacao` (`id_natureza`, `s_descricao_natureza`, `id_t_acao_nat_movimento`) VALUES (NuLL, 'ESTORNO', 1);

INSERT INTO `natureza_movimentacao` (`id_natureza`, `s_descricao_natureza`, `id_t_acao_nat_movimento`) VALUES (NuLL, 'SEGURO', 1);

INSERT INTO `natureza_movimentacao` (`id_natureza`, `s_descricao_natureza`, `id_t_acao_nat_movimento`) VALUES (NuLL, 'PERDA', 2);

INSERT INTO `natureza_movimentacao` (`id_natureza`, `s_descricao_natureza`, `id_t_acao_nat_movimento`) VALUES (NuLL, 'DANIFICADO', 2);

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'ALIMENTO');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'BEBIDAS');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'DOCES');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'MOBILIA');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'ELETRONICO');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'LAZER');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'ESPORTE');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'PET');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'GOURMET');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'CALÇADOS');

INSERT INTO `classe_produto` (`id_classe`, `s_descricao_classe`) VALUES (NULL, 'VESTUARIO');