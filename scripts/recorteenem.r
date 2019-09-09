# FAZ O RECORTE NOS DADOS DO ENEM
setwd('C:/Users/gabri/Documents/Projetos/PSW2/microdados_enem2018/DADOS/')

library(tidyverse)


## CARREGA A TABELA DOS MICRODADOS ENEM 2018 EM UM DATAFRAME  
dfEnem_skip_1 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 0)
header <- colnames(dfEnem_skip_1)

dfEnem_skip_2 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 500000)
colnames(dfEnem_skip_2) <- header

dfEnem_skip_3 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 1000000)
colnames(dfEnem_skip_3) <- header

dfEnem_skip_4 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 1500000)
colnames(dfEnem_skip_4) <- header

dfEnem_skip_5 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 2000000)
colnames(dfEnem_skip_5) <- header

dfEnem_skip_6 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 2500000)
colnames(dfEnem_skip_6) <- header

dfEnem_skip_7 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 3000000)
colnames(dfEnem_skip_7) <- header

dfEnem_skip_9 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 4000000)
colnames(dfEnem_skip_9) <- header

dfEnem_skip_10 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 4500000)
colnames(dfEnem_skip_10) <- header

dfEnem_skip_11<- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 5000000)
colnames(dfEnem_skip_11) <- header

dfEnem_skip_12 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 5500000)
colnames(dfEnem_skip_12) <- header

dfEnem_skip_13 <- read.csv('./MICRODADOS_ENEM_2018.csv', sep = ';', nrows = 500000, skip = 6000000)
colnames(dfEnem_skip_13) <- header



## SEPARA AS COLUNAS DE INTERESSE E APLICA OS FILTROS NECESSÁRIOS
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

## A filtragem do arquivo é feita em partes, pois o arquivo é muito grande e pode não caber em memória 
## Cada parte gera um novo arquivo csv com o recorte realizado

dfRecortado <- dfEnem_skip_1[
  (!is.na(dfEnem_skip_1$CO_ESCOLA) & 
     (dfEnem_skip_1$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_1$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_1$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_1$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_2[
  (!is.na(dfEnem_skip_2$CO_ESCOLA) & 
     (dfEnem_skip_2$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_2$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_2$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_2$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_3[
  (!is.na(dfEnem_skip_3$CO_ESCOLA) & 
     (dfEnem_skip_3$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_3$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_3$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_3$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_4[
  (!is.na(dfEnem_skip_4$CO_ESCOLA) & 
     (dfEnem_skip_4$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_4$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_4$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_4$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_5[
  (!is.na(dfEnem_skip_5$CO_ESCOLA) & 
     (dfEnem_skip_5$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_5$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_5$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_5$TP_PRESENCA_MT == 1)) 
  ,cols]

dfRecortado <- dfEnem_skip_6[
  (!is.na(dfEnem_skip_6$CO_ESCOLA) & 
     (dfEnem_skip_6$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_6$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_6$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_6$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_7[
  (!is.na(dfEnem_skip_7$CO_ESCOLA) & 
     (dfEnem_skip_7$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_7$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_7$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_7$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_8[
  (!is.na(dfEnem_skip_8$CO_ESCOLA) & 
     (dfEnem_skip_8$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_8$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_8$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_8$TP_PRESENCA_MT == 1)) 
  ,cols]

dfRecortado <- dfEnem_skip_9[
  (!is.na(dfEnem_skip_9$CO_ESCOLA) & 
     (dfEnem_skip_9$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_9$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_9$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_9$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_10[
  (!is.na(dfEnem_skip_10$CO_ESCOLA) & 
     (dfEnem_skip_10$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_10$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_10$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_10$TP_PRESENCA_MT == 1)) 
  ,cols]



dfRecortado <- dfEnem_skip_11[
  (!is.na(dfEnem_skip_11$CO_ESCOLA) & 
     (dfEnem_skip_11$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_11$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_11$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_11$TP_PRESENCA_MT == 1)) 
  ,cols]

dfRecortado <- dfEnem_skip_12[
  (!is.na(dfEnem_skip_12$CO_ESCOLA) & 
     (dfEnem_skip_12$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_12$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_12$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_12$TP_PRESENCA_MT == 1)) 
  ,cols]


dfRecortado <- dfEnem_skip_13[
  (!is.na(dfEnem_skip_13$CO_ESCOLA) & 
     (dfEnem_skip_13$TP_PRESENCA_CH == 1) & 
     (dfEnem_skip_13$TP_PRESENCA_CN == 1) & 
     (dfEnem_skip_13$TP_PRESENCA_LC == 1) & 
     (dfEnem_skip_13$TP_PRESENCA_MT == 1)) 
  ,cols]



write.csv(dfRecortado, 'ENEM_1.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_2.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_3.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_4.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_5.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_6.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_7.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_8.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_9.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_10.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_11.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_12.csv', na = '', row.names = F)
write.csv(dfRecortado, 'ENEM_13.csv', na = '', row.names = F)



