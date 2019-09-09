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
    estado,
    uf
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
    @qt_comp_aluno, 
    @in_internet, 
	@in_bandalarga, 
    qt_funcionarios, 
    tp_aee, 
    tp_localizacao_diferenciada
)
SET 
qt_comp_aluno = nullif(@qt_comp_aluno, ''),
in_internet = nullif(@in_internet, ''),
in_bandalarga = nullif(@in_bandalarga, '')
;

## CARREGA OS DADOS DA TABELA ENEM
LOAD DATA LOCAL INFILE 'C:/Users/gabri/Documents/Projetos/visio-edu/resources/ENEM_6.csv'  
INTO TABLE dados_enem
CHARACTER SET latin1
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(
	@nu_inscricao,
    @nu_idade,
    @tp_sexo, 
    @tp_st_conclusao, 
    @tp_ano_concluiu, 
    @in_treineiro, 
    @in_baixa_visao, 
    @in_cegueira, 
    @in_surdez, 
    @in_deficiencia_auditiva,
    @in_surdo_cegueira, 
    @in_deficiencia_fisica, 
    @in_deficiencia_mental, 
    @in_deficit_atencao, 
    @in_dislexia, 
    @in_discalculia, 
    @in_autismo, 
    @in_visao_monocular, 
    @in_outra_def, 
    @tp_presenca_cn, 
    @tp_presenca_ch, 
    @tp_presenca_lc, 
    @tp_presenca_mt, 
    @nu_nota_cn, 
    @nu_nota_ch,
    @nu_nota_lc, 
    @nu_nota_mt, 
    @tp_lingua, 
    @tp_status_redacao, 
    @nu_nota_redacao, 
    @co_escola 
)
SET 
nu_inscricao = nullif(@nu_inscricao, ''),
nu_idade = nullif(@nu_idade, ''),
tp_sexo = nullif(@tp_sexo, ''), 
tp_st_conclusao = nullif(@tp_st_conclusao, ''), 
tp_ano_concluiu = nullif(@tp_ano_concluiu, ''), 
in_treineiro = nullif(@in_treineiro, ''), 
in_baixa_visao = nullif(@in_baixa_visao, ''), 
in_cegueira = nullif(@in_cegueira, ''), 
in_surdez = nullif(@in_surdez, ''), 
in_deficiencia_auditiva = nullif(@in_deficiencia_auditiva, ''),
in_surdo_cegueira = nullif(@in_surdo_cegueira, ''), 
in_deficiencia_fisica = nullif(@in_deficiencia_fisica, ''), 
in_deficiencia_mental = nullif(@in_deficiencia_mental, ''), 
in_deficit_atencao = nullif(@in_deficit_atencao, ''), 
in_dislexia = nullif(@in_dislexia, ''), 
in_discalculia = nullif(@in_discalculia, ''), 
in_autismo = nullif(@in_autismo, ''), 
in_visao_monocular = nullif(@in_visao_monocular, ''), 
in_outra_def = nullif(@in_outra_def, ''), 
tp_presenca_cn = nullif(@tp_presenca_cn, ''), 
tp_presenca_ch = nullif(@tp_presenca_ch, ''), 
tp_presenca_lc = nullif(@tp_presenca_lc, ''), 
tp_presenca_mt = nullif(@tp_presenca_mt, ''), 
nu_nota_cn = nullif(@nu_nota_cn, ''), 
nu_nota_ch = nullif(@nu_nota_ch, ''),
nu_nota_lc = nullif(@nu_nota_lc, ''), 
nu_nota_mt = nullif(@nu_nota_mt, ''), 
tp_lingua = nullif(@tp_lingua, ''), 
tp_status_redacao = nullif(@tp_status_redacao, ''), 
nu_nota_redacao = nullif(@nu_nota_redacao, ''), 
co_escola = nullif(@co_escola, '') 
;

