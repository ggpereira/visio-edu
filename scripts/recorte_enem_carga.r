setwd('C:/Users/gabri/Documents/Projetos/PSW2/microdados_enem2018/DADOS')

## CONFIGURACAO MYSQL

install.packages('RMySQL')
library(RMySQL)

dbPass <- "password"
dbUser <- "username"
dbPort <- 3306 
dbHost <- "localhost"
dbDatabase <- "visioedu"

vDB <- dbConnect(RMySQL::MySQL(), dbname=dbDatabase, password=dbPass, username=dbUser, port=dbPort)

## CARGA E FILTRAGEM DOS DADOS
chunkSize <- 500000

## COLUNAS EXTRAÍDAS DO DATASET
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
  'CO_ESCOLA',
  'CO_MUNICIPIO_ESC',
  'CO_UF_ESC'
)

for(index in 0:12){
  print(paste0("Chunk ", index))
  skipRows <- index * chunkSize 
  dataChunk <- read.csv('./MICRODADOS_ENEM_2018.csv', header=T, nrows=chunkSize, sep=';', skip=skipRows)
  
  if(index == 0) {
    header <- colnames(dataChunk)
  } else {
    colnames(dataChunk) <- header
  }
  
  df_result <- dataChunk[
    (!is.na(dataChunk$CO_ESCOLA) & 
       (dataChunk$TP_PRESENCA_CH == 1) & 
       (dataChunk$TP_PRESENCA_CN == 1) & 
       (dataChunk$TP_PRESENCA_LC == 1) & 
       (dataChunk$TP_PRESENCA_MT == 1)) 
    ,cols]
    
  
  dbWriteTable(vDB, name="dados_enem_test", value=df_result, overwrite=FALSE, append=TRUE, sep=",", row.names=FALSE)
  print(paste0("Finished chunk ", index))
}