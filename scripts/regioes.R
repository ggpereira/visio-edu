## FAZ O RECORTE DAS COLUNAS DOS DADOS DE CIDADE E ESTADO

setwd("C:/Users/gabri/Documents/Projetos/PSW2/")

# Carrega csv com os munícipios brasileiros
dfRegioes <- read.csv('Lista_Municípios_com_IBGE_Brasil_Versao_CSV.csv', sep = ';')


# Colunas de interesse 
cols <- c('IBGE7', 'Município')

# Recorte das colunas
dfRecorteCidades <- dfRegioes[, cols]
View(dfRecorteCidades)

# Cria csv com as cidades
write.csv(dfRecorteCidades, 'cidades.csv', row.names = F)

# Carrega csv com os estados brasileiros
dfEstados <- read.csv('Lista_Estados_Brasil_Versao_CSV.csv', sep = ';')
View(dfEstados)

# Recorte das colunas
cols <- c('IBGE', 'Estado', 'UF')

dfRecorteEstados <- dfEstados[, cols]
View(dfRecorteEstados)

# Cria csv com os estados
write.csv(dfRecorteEstados, 'estados.csv', row.names = F)