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

CREATE TABLE dados_enem(
	nu_inscricao bigint not null,
    nu_idade int,
    tp_sexo char, 
    tp_st_conclusao int, 
    tp_ano_concluiu int, 
    in_treineiro int, 
    in_baixa_visao int, 
    in_cegueira int, 
    in_surdez int, 
    in_deficiencia_auditiva int,
    in_surdo_cegueira int, 
    in_deficiencia_fisica int, 
    in_deficiencia_mental int, 
    in_deficit_atencao int, 
    in_dislexia int, 
    in_discalculia int, 
    in_autismo int, 
    in_visao_monocular int, 
    in_outra_def int, 
    tp_presenca_cn int, 
    tp_presenca_ch int, 
    tp_presenca_lc int, 
    tp_presenca_mt int, 
    nu_nota_cn double, 
    nu_nota_ch double,
    nu_nota_lc double, 
    nu_nota_mt double, 
    tp_lingua int, 
    tp_status_redacao int, 
    nu_nota_redacao double, 
    co_escola int,
    co_municipio_esc int,
    co_uf_esc int,
    foreign key(co_escola) references escolas(co_entidade),
    foreign key (co_municipio_esc) references cidades(codigo), 
    foreign key (co_uf_esc) references estados(codigo),
    primary key(nu_inscricao)
) ENGINE = InnoDB;
