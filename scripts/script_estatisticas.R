## Script para processar estatísticas relacionadas a escolas e enem. 
## Ao final da execução as tabelas estatisticas_escola_cidade, estatisticas_escola_estado, estatisticas_enem_escola, 
## estatisticas_enem_cidade e estatisticas_enem_estado estão populadas. 

## Caso não possua a biblioteca ODBC instalada descomente a linha abaixo
#install.packages('RMySQL')


library(RMySQL)

dbPass <- ""
dbUser <- ""
dbPort <- 3306 
dbHost <- "localhost"
dbDatabase <- "visioedu"

conn <- RMySQL::dbConnect(RMySQL::MySQL(), dbname=dbDatabase, password=dbPass, username=dbUser, port=dbPort)

## Obtém todos os dados da tabela estados
res <- RMySQL::dbSendQuery(conn, 'SELECT * FROM estados')
dataEstados <- fetch(res, n = -1)

## Obtém estatísticas por estado
for(i in 1:nrow(dataEstados)) {
  cod_estado <- dataEstados[i, "codigo"]
  uf <- dataEstados[i, "uf"]
  nome_estado <- dataEstados[i, "estado"]
  
  query <- paste0("SELECT * FROM escolas WHERE co_uf = ", cod_estado)
  
  res <- RMySQL::dbSendQuery(conn, query)
  dataEscolas <- fetch(res, n = -1)
  
  totalEscolas <- nrow(dataEscolas)
  porcentagemAguaFiltrada <- nrow(dataEscolas[dataEscolas$in_agua_filtrada == 1,]) / totalEscolas
  porcentagemAguaInexistente <- nrow(dataEscolas[dataEscolas$in_agua_inexistente == 1,]) / totalEscolas
  porcentagemEsgotoInexistente <- nrow(dataEscolas[dataEscolas$in_esgoto_inexistente == 1,]) / totalEscolas
  porcentagemEnergiaInexistente <- nrow(dataEscolas[dataEscolas$in_energia_inexistente == 1,]) / totalEscolas
  porcentagemLixoRecicla <- nrow(dataEscolas[dataEscolas$in_lixo_recicla == 1,]) / totalEscolas
  porcentagemLixoColetaPeriodica <- nrow(dataEscolas[dataEscolas$in_lixo_coleta_periodica == 1,]) / totalEscolas
  porcentagemLaboratorioInformatica <- nrow(dataEscolas[dataEscolas$in_laboratorio_informatica == 1,]) / totalEscolas
  porcentagemSalaAtendimentoEspecial <- nrow(dataEscolas[dataEscolas$in_sala_atendimento_especial == 1,]) / totalEscolas
  porcentagemLaboratorioCiencias <- nrow(dataEscolas[dataEscolas$in_laboratorio_ciencias == 1, ]) / totalEscolas
  porcentagemBiblioteca <- nrow(dataEscolas[dataEscolas$in_biblioteca == 1, ]) / totalEscolas
  porcentagemSalaLeitura <- nrow(dataEscolas[dataEscolas$in_sala_leitura == 1, ]) / totalEscolas
  porcentagemInternet <- nrow(dataEscolas[dataEscolas$in_internet == 1, ]) / totalEscolas
  porcentagemBandaLarga <- nrow(dataEscolas[dataEscolas$in_bandalarga == 1, ]) / totalEscolas
  
  query <- paste0("INSERT INTO estatisticas_escola_estado VALUES(",
      cod_estado, ",",
      "'",nome_estado,"'", ",",
      "'",uf,"'", ",",
      totalEscolas,",",
      porcentagemAguaFiltrada,",", 
      porcentagemAguaInexistente, ",",
      porcentagemEsgotoInexistente, ",",
      porcentagemEnergiaInexistente, ",",
      porcentagemLixoRecicla,",", 
      porcentagemLixoColetaPeriodica,",", 
      porcentagemLaboratorioInformatica,",", 
      porcentagemSalaAtendimentoEspecial,",", 
      porcentagemLaboratorioCiencias,",", 
      porcentagemBiblioteca,",", 
      porcentagemSalaLeitura,",", 
      porcentagemInternet,",", 
      porcentagemBandaLarga,
      ")"
  )
  
  print(query)
  RMySQL::dbSendQuery(conn, query)
}

## Obtém todos os dados da tabela cidades
res <- RMySQL::dbSendQuery(conn, 'SELECT * FROM cidades')
dataCidades <- fetch(res, n= -1)

# Obtém estatísticas  por cidades
for(i in 1:nrow(dataCidades)) {
  cod_cidade <- dataCidades[i, "codigo"]
  nome_cidade <- dataCidades[i, "municipio"]
  uf_cidade <- dataCidades[i, "uf"]
  estado_cidade <- dataEstados[dataEstados$uf == uf_cidade, "estado"]
  
  query <- paste0("SELECT * FROM escolas WHERE co_municipio = ", cod_cidade)
  
  res <- RMySQL::dbSendQuery(conn, query)
  dataEscolas <- fetch(res, n = -1)
  
  ## Se os dados forem nulos passa para próxima iteração
  if(nrow(dataEscolas) <= 0) {
    next 
  }
  
  totalEscolas <- nrow(dataEscolas)
  porcentagemAguaFiltrada <- nrow(dataEscolas[dataEscolas$in_agua_filtrada == 1,]) / totalEscolas
  porcentagemAguaInexistente <- nrow(dataEscolas[dataEscolas$in_agua_inexistente == 1,]) / totalEscolas
  porcentagemEsgotoInexistente <- nrow(dataEscolas[dataEscolas$in_esgoto_inexistente == 1,]) / totalEscolas
  porcentagemEnergiaInexistente <- nrow(dataEscolas[dataEscolas$in_energia_inexistente == 1,]) / totalEscolas
  porcentagemLixoRecicla <- nrow(dataEscolas[dataEscolas$in_lixo_recicla == 1,]) / totalEscolas
  porcentagemLixoColetaPeriodica <- nrow(dataEscolas[dataEscolas$in_lixo_coleta_periodica == 1,]) / totalEscolas
  porcentagemLaboratorioInformatica <- nrow(dataEscolas[dataEscolas$in_laboratorio_informatica == 1,]) / totalEscolas
  porcentagemSalaAtendimentoEspecial <- nrow(dataEscolas[dataEscolas$in_sala_atendimento_especial == 1,]) / totalEscolas
  porcentagemLaboratorioCiencias <- nrow(dataEscolas[dataEscolas$in_laboratorio_ciencias == 1, ]) / totalEscolas
  porcentagemBiblioteca <- nrow(dataEscolas[dataEscolas$in_biblioteca == 1, ]) / totalEscolas
  porcentagemSalaLeitura <- nrow(dataEscolas[dataEscolas$in_sala_leitura == 1, ]) / totalEscolas
  porcentagemInternet <- nrow(dataEscolas[dataEscolas$in_internet == 1, ]) / totalEscolas
  porcentagemBandaLarga <- nrow(dataEscolas[dataEscolas$in_bandalarga == 1, ]) / totalEscolas
  
  query <- paste0("INSERT INTO estatisticas_escola_cidade VALUES(",
                  cod_cidade, ",",
                  "'",nome_cidade,"'", ",",
                  "'",estado_cidade, "'", ",",
                  "'",uf_cidade, "'", ",",
                  totalEscolas,",",
                  porcentagemAguaFiltrada,",", 
                  porcentagemAguaInexistente, ",",
                  porcentagemEsgotoInexistente, ",",
                  porcentagemEnergiaInexistente, ",",
                  porcentagemLixoRecicla,",", 
                  porcentagemLixoColetaPeriodica,",", 
                  porcentagemLaboratorioInformatica,",", 
                  porcentagemSalaAtendimentoEspecial,",", 
                  porcentagemLaboratorioCiencias,",", 
                  porcentagemBiblioteca,",", 
                  porcentagemSalaLeitura,",", 
                  porcentagemInternet,",", 
                  porcentagemBandaLarga,
                  ")"
  )
  
  print(query)
  RMySQL::dbSendQuery(conn, query)
}

rm(dataEscola)

res <- RMySQL::dbSendQuery(conn, "SELECT co_entidade, no_entidade, co_uf, co_municipio FROM escolas")
dataEscolas <- fetch(res, n = -1)

## Dados do enem por escola
for(i in 1:nrow(dataEscolas)){
  cod_escola <- dataEscolas[i,  "co_entidade"] 
  nome_escola <- dataEscolas[i, "no_entidade"]
  co_uf <- dataEscolas[i, "co_uf"]
  co_municipio <- dataEscolas[i, "co_municipio"]
  nome_cidade <- dataCidades[dataCidades$codigo == co_municipio, "municipio"]
  nome_estado <- dataEstados[dataEstados$codigo == co_uf, "estado"]
  uf_escola <- dataEstados[dataEstados$codigo == co_uf, "uf"]
  
  query <- paste0("SELECT co_escola, nu_nota_cn, nu_nota_ch, nu_nota_mt, nu_nota_lc, nu_nota_redacao FROM dados_enem WHERE co_escola =", cod_escola)
  res <- RMySQL::dbSendQuery(conn, query)
  dataEnem <- fetch(res, n = -1)
  
  ## Se os dados forem nulos passa para próxima iteração
  if(nrow(dataEnem) <= 0){
    next
  }
  
  
  mediaGeral <- sum((dataEnem$nu_nota_ch + dataEnem$nu_nota_cn + dataEnem$nu_nota_mt + dataEnem$nu_nota_lc + dataEnem$nu_nota_redacao)/5) / nrow(dataEnem)
  mediaCh <- sum(dataEnem$nu_nota_ch) / nrow(dataEnem)
  mediaCn <- sum(dataEnem$nu_nota_cn) / nrow(dataEnem)
  mediaMt <- sum(dataEnem$nu_nota_mt) / nrow(dataEnem)
  mediaLc <- sum(dataEnem$nu_nota_lc) / nrow(dataEnem)
  mediaRedacao <- sum(dataEnem$nu_nota_redacao) / nrow(dataEnem)

  
  query <- paste0("INSERT INTO medias_enem_escola VALUES(",
     cod_escola,",", 
     "'",nome_escola,"'", ",",
     "'",nome_estado,"'", ",", 
     "'",uf_escola,"'", ",",
     "'",nome_cidade,"'", ",",
     mediaGeral, ",", 
     mediaCh, ",", 
     mediaCn, ",", 
     mediaMt, ",", 
     mediaLc, ",", 
     mediaRedacao,
    ")"
  )
  print(query)
  RMySQL::dbSendQuery(conn, query)
}

# Dados enem por cidade
for(i in 1:nrow(dataCidades)){
  cod_cidade <- dataCidades[i,  "codigo"] 
  nome_cidade <- dataCidades[i, "municipio"]
  uf_cidade <- dataCidades[i, "uf"]
  nome_estado <- dataEstados[dataEstados$uf == uf_cidade, "estado"]

  query <- paste0("SELECT co_escola, nu_nota_cn, nu_nota_ch, nu_nota_mt, nu_nota_lc, nu_nota_redacao FROM dados_enem WHERE co_municipio_esc =", cod_cidade)
  res <- RMySQL::dbSendQuery(conn, query)
  dataEnem <- fetch(res, n = -1)
  
  ## Se os dados forem nulos passa para próxima iteração
  if(nrow(dataEnem) <= 0){
    next
  }
  
  
  mediaGeral <- sum((dataEnem$nu_nota_ch + dataEnem$nu_nota_cn + dataEnem$nu_nota_mt + dataEnem$nu_nota_lc + dataEnem$nu_nota_redacao)/5) / nrow(dataEnem)
  mediaCh <- sum(dataEnem$nu_nota_ch) / nrow(dataEnem)
  mediaCn <- sum(dataEnem$nu_nota_cn) / nrow(dataEnem)
  mediaMt <- sum(dataEnem$nu_nota_mt) / nrow(dataEnem)
  mediaLc <- sum(dataEnem$nu_nota_lc) / nrow(dataEnem)
  mediaRedacao <- sum(dataEnem$nu_nota_redacao) / nrow(dataEnem)
  
  
  query <- paste0("INSERT INTO medias_enem_cidade VALUES(",
                  cod_cidade,",", 
                  "'",nome_cidade,"'", ",",
                  "'",nome_estado,"'", ",", 
                  "'",uf_cidade,"'", ",",
                  mediaGeral, ",", 
                  mediaCh, ",", 
                  mediaCn, ",", 
                  mediaMt, ",", 
                  mediaLc, ",", 
                  mediaRedacao,
                  ")"
  )
  print(query)
  RMySQL::dbSendQuery(conn, query)
}

# Dados enem por estado
for(i in 1:nrow(dataEstados)){
  cod_estado <- dataEstados[i,  "codigo"] 
  nome_estado <- dataEstados[i, "estado"]
  uf_estado <- dataEstados[i, "uf"]

  query <- paste0("SELECT co_escola, nu_nota_cn, nu_nota_ch, nu_nota_mt, nu_nota_lc, nu_nota_redacao FROM dados_enem WHERE co_uf_esc = ", cod_estado)
  res <- RMySQL::dbSendQuery(conn, query)
  dataEnem <- fetch(res, n = -1)
  
  ## Se os dados forem nulos passa para próxima iteração
  if(nrow(dataEnem) <= 0){
    next
  }
  
  
  mediaGeral <- sum((dataEnem$nu_nota_ch + dataEnem$nu_nota_cn + dataEnem$nu_nota_mt + dataEnem$nu_nota_lc + dataEnem$nu_nota_redacao)/5) / nrow(dataEnem)
  mediaCh <- sum(dataEnem$nu_nota_ch) / nrow(dataEnem)
  mediaCn <- sum(dataEnem$nu_nota_cn) / nrow(dataEnem)
  mediaMt <- sum(dataEnem$nu_nota_mt) / nrow(dataEnem)
  mediaLc <- sum(dataEnem$nu_nota_lc) / nrow(dataEnem)
  mediaRedacao <- sum(dataEnem$nu_nota_redacao) / nrow(dataEnem)
  
  
  query <- paste0("INSERT INTO medias_enem_estado VALUES(",
                  cod_estado,",", 
                  "'",nome_estado,"'", ",",
                  "'",uf_estado,"'", ",",
                  mediaGeral, ",", 
                  mediaCh, ",", 
                  mediaCn, ",", 
                  mediaMt, ",", 
                  mediaLc, ",", 
                  mediaRedacao,
                  ")"
  )
  print(query)
  RMySQL::dbSendQuery(conn, query)
}



