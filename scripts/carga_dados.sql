## CARGA DOS DADOS
USE visioedu; 

## CARREGA OS DADOS DA TABELA DE CIDADES
LOAD DATA LOCAL INFILE 'C:/Users/gabri/Documents/Projetos/PSW2/cidades.csv'
INTO TABLE cidades
CHARACTER SET latin1
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(
	codigo,
    municipio
);

## CARREGA OS DADOS DA TABELA DE ESTADOS
LOAD DATA LOCAL INFILE 'C:/Users/gabri/Documents/Projetos/PSW2/estados.csv'
INTO TABLE estados
CHARACTER SET latin1
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(
	codigo,
    estado
);


## CARREGA OS DADOS DA TABELA DE ESCOLAS
LOAD DATA LOCAL INFILE 'C:/Users/gabri/Documents/Projetos/PSW2/microdados_ed_basica_2018/DADOS/ESCOLAS/ESCOLAS_FILTRADO.csv'  
INTO TABLE escolas 
CHARACTER SET latin1
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(
	co_entidade, 
    no_entidade,
    tp_situacao_funcionamento, 
    co_regiao,
    co_uf, 
    co_municipio, 
    tp_dependencia, 
    tp_localizacao, 
    in_agua_filtrada, 
    in_agua_inexistente,
    in_esgoto_inexistente, 
	in_energia_inexistente, 
    in_lixo_recicla, 
    in_lixo_coleta_periodica, 
    in_laboratorio_informatica,
    in_sala_atendimento_especial, 
	in_laboratorio_ciencias, 
    in_biblioteca, 
    in_sala_leitura, 
	in_biblioteca_sala_leitura, 
    qt_salas_existentes, 
    qt_salas_utilizadas,
    in_equip_retro_projetor, 
    in_equip_multimidia, 
    qt_comp_aluno, 
    in_internet, 
	in_bandalarga, 
    qt_funcionarios, 
    tp_aee, 
    tp_localizacao_diferenciada
);

