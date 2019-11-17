FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD visioedupsw2019

# COPY ./dump /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_cidades.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_dados_enem.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_escolas.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_estados.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_estatisticas_escola_cidade.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_estatisticas_escola_estado.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_medias_enem_cidade.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_medias_enem_escola.sql /docker-entrypoint-initdb.d
ADD https://github.com/ggpereira/visio-edu/raw/master/scripts/dump/visioedu_medias_enem_estado.sql /docker-entrypoint-initdb.d
