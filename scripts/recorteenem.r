# FAZ O RECORTE NOS DADOS DO ENEM
setwd('C:/Users/gabri/Documents/Projetos/PSW2/microdados_enem2018/DADOS/')

install.packages('tidyverse')


## CARREGA A TABELA DOS MICRODADOS ENEM 2018 EM UM DATAFRAME  
dfEnem <- readr::read_csv2('./MICRODADOS_ENEM_2018.csv')

## SEPARA AS COLUNAS DE INTERESSE 
cols <- c(
          'NU_INSCRICAO',
          'NU_IDADE',
          'TP_SEXO',
          'TP_ST_CONCLUSAO',
          'TP_ANO_CONCLUIU',
          'IN_TREINEIRO',
          'IN_BAIXA_VISAO',
          'IN_CEGUEIRA',
          'IN_SURDEZ',
          'IN_DEFICIENCIA_AUDITIVA',
          'IN_SURDO_CEGUEIRA',
          'IN_DEFICIENCIA_FISICA',
          'IN_DEFICIENCIA_MENTAL',
          'IN_DEFICIT_ATENCAO',
          'IN_DISLEXIA',
          'IN_DISCALCULIA',
          'IN_AUTISMO',
          'IN_VISAO_MONOCULAR',
          'IN_OUTRA_DEF',
          'TP_PRESENCA_CN',
          'TP_PRESENCA_CH',
          'TP_PRESENCA_LC',
          'TP_PRESENCA_MT',
          'NU_NOTA_CN',
          'NU_NOTA_CH',
          'NU_NOTA_LC',
          'NU_NOTA_MT',
          'TP_LINGUA',
          'TP_STATUS_REDACAO',
          'NU_NOTA_REDACAO',
          'CO_ESCOLA'
      )

## CRIA NOVO DATAFRAME COM AS COLUNAS SELECIONADA
dfRecortado <- dfEnem[
              (!is.na(dfEnem$CO_ESCOLA) & 
              (dfEnem$TP_PRESENCA_CH == 1) & 
              (dfEnem$TP_PRESENCA_CN == 1) & 
              (dfEnem$TP_PRESENCA_LC == 1) & 
              (dfEnem$TP_PRESENCA_MT == 1)) 
               ,cols]
