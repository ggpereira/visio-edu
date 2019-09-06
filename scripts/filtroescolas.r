setwd("C:/Users/gabri/Documents/Projetos/PSW2/microdados_ed_basica_2018/DADOS/ESCOLAS/")
dfEscolas <- read.csv('ESCOLAS.CSV', sep = '|', header = TRUE)
View(dfEscolas)

# Colunas que serão extraídas para o novo dataframe(tabela)
columns <- c('CO_ENTIDADE', 
            'NO_ENTIDADE', 
            'TP_SITUACAO_FUNCIONAMENTO', 
            'CO_REGIAO', 
            'CO_UF', 
            'CO_MUNICIPIO', 
            'TP_DEPENDENCIA', 
            'TP_LOCALIZACAO', 
            'IN_AGUA_FILTRADA', 
            'IN_AGUA_INEXISTENTE', 
            'IN_ESGOTO_INEXISTENTE', 
            'IN_ENERGIA_INEXISTENTE', 
            'IN_LIXO_RECICLA', 
            'IN_LIXO_COLETA_PERIODICA', 
            'IN_LABORATORIO_INFORMATICA', 
            'IN_SALA_ATENDIMENTO_ESPECIAL', 
            'IN_LABORATORIO_CIENCIAS', 
            'IN_BIBLIOTECA', 
            'IN_SALA_LEITURA', 
            'IN_BIBLIOTECA_SALA_LEITURA',
            'QT_SALAS_EXISTENTES', 
            'QT_SALAS_UTILIZADAS', 
            'IN_EQUIP_RETROPROJETOR', 
            'IN_EQUIP_MULTIMIDIA', 
            'QT_COMP_ALUNO', 
            'IN_INTERNET', 
            'IN_BANDA_LARGA', 
            'QT_FUNCIONARIOS', 
            'TP_AEE', 
            'TP_LOCALIZACAO_DIFERENCIADA',
            'IN_REGULAR', 
            'IN_COMUM_MEDIO_MEDIO',
            'IN_COMUM_MEDIO_INTEGRADO',
            'IN_COMUM_MEDIO_NORMAL',
            'IN_COMUM_EJA_MEDIO',
            'IN_ESP_EXCLUSIVA_MEDIO_MEDIO', 
            'IN_ESP_EXCLUSIVA_MEDIO_INTEGR',
            'IN_ESP_EXCLUSIVA_EJA_MEDIO',
            'IN_ESP_EXCLUSIVA_MEDIO_NORMAL'
            )

# Filtragem por linha e recorte nas colunas
dfFiltrado <- dfEscolas[ 
                (dfEscolas$IN_ESP_EXCLUSIVA_EJA_MEDIO == 1 & !is.na(dfEscolas$IN_ESP_EXCLUSIVA_EJA_MEDIO) ) | 
                (dfEscolas$IN_COMUM_MEDIO_MEDIO == 1 & !is.na(dfEscolas$IN_COMUM_MEDIO_MEDIO)) |
                (dfEscolas$IN_COMUM_MEDIO_INTEGRADO == 1 & !is.na(dfEscolas$IN_COMUM_MEDIO_INTEGRADO)) |
                (dfEscolas$IN_COMUM_MEDIO_NORMAL== 1 & !is.na(dfEscolas$IN_COMUM_MEDIO_NORMAL)) |
                (dfEscolas$IN_ESP_EXCLUSIVA_MEDIO_MEDIO == 1 & !is.na(dfEscolas$IN_ESP_EXCLUSIVA_MEDIO_MEDIO)) |
                (dfEscolas$IN_ESP_EXCLUSIVA_MEDIO_INTEGR == 1 & !is.na(dfEscolas$IN_ESP_EXCLUSIVA_MEDIO_INTEGR)) |
                (dfEscolas$IN_ESP_EXCLUSIVA_MEDIO_NORMAL == 1 & !is.na(dfEscolas$IN_ESP_EXCLUSIVA_MEDIO_NORMAL)) |  
                (dfEscolas$IN_COMUM_EJA_MEDIO == 1) & !is.na(dfEscolas$IN_COMUM_EJA_MEDIO) , columns]



View(dfFiltrado)

# Gera novo csv após o processamento
# O csv gerado, é útil para a utilização no banco de dados
write.csv(dfFiltrado, 'ESCOLAS_FILTRADO.csv', row.names = F)

