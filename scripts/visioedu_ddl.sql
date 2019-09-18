## CRIAÇÃO DO BANCO DE DADOS
DROP DATABASE IF EXISTS visioedu;
CREATE DATABASE visioedu; 
USE visioedu;

CREATE TABLE cidades(
	codigo int primary key, 
	municipio varchar(255)
)ENGINE = InnoDB;

CREATE TABLE estados(
	codigo int primary key, 
    estado varchar(400),
    uf	varchar(25)
)ENGINE = InnoDB;


CREATE TABLE escolas(
	co_entidade int not null, 
    no_entidade varchar(256) ,
    tp_situacao_funcionamento int, 
    co_regiao int ,
    co_uf int , 
    co_municipio int, 
    tp_dependencia int,
    tp_localizacao int, 
    in_agua_filtrada int, 
    in_agua_inexistente int, 
    in_esgoto_inexistente int, 
	in_energia_inexistente int, 
    in_lixo_recicla int, 
    in_lixo_coleta_periodica int, 
    in_laboratorio_informatica int,  
    in_sala_atendimento_especial int, 
	in_laboratorio_ciencias int, 
    in_biblioteca int, 
    in_sala_leitura int, 
	in_biblioteca_sala_leitura int, 
    qt_salas_existentes int, 
    qt_salas_utilizadas int, 
    in_equip_retro_projetor int, 
    in_equip_multimidia int, 
    qt_comp_aluno int, 
    in_internet int, 
	in_bandalarga int, 
    qt_funcionarios int, 
    tp_aee int, 
    tp_localizacao_diferenciada int,
	FOREIGN KEY(co_uf) REFERENCES estados(codigo),
    FOREIGN KEY(co_municipio) REFERENCES cidades(codigo),
    PRIMARY KEY(co_entidade)
)ENGINE = InnoDB;

