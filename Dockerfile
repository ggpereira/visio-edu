FROM node:10.16.1-alpine 

WORKDIR /usr/app/ 

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

COPY package.json ./

COPY . . 

RUN echo "{MYSQL_HOST: 'mysql', MYSQL_DATABASE: 'visioedu', MYSQL_PORT: 3306, MYSQL_USER: 'root', MYSQL_PASSWORD: 'visioedupsw2019'}" >> config.dev.json  
RUN echo "{MYSQL_HOST: 'mysql', MYSQL_DATABASE: 'visioedu', MYSQL_PORT: 3306, MYSQL_USER: 'root', MYSQL_PASSWORD: 'visioedupsw2019'}" >> config.json 

## install typescript 
RUN npm i -g typescript
# install all dependencies of project
RUN npm install -ddd

# # build project 
# RUN npm run build -ddd

EXPOSE 8080

# https://github.com/vishnubob/wait-for-it
# CMD ["./wait-for-it.sh","mysql:3306","--strict", "--timeout=60", "--", "npm", "start"]