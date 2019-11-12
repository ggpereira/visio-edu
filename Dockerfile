FROM node:10.16.1-alpine 

WORKDIR /usr/app/ 

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

RUN touch config.dev.json 
RUN touch config.json 
RUN echo "{MYSQL_HOST:'mysql', MYSQL_DATABASE:'visioedu', MYSQL_PASSWORD:'visioedupsw2019', MYSQL_USER: 'root', MYSQL_PORT:3306}" >> config.json 
RUN echo "{MYSQL_HOST:'mysql', MYSQL_DATABASE:'visioedu', MYSQL_PASSWORD:'visioedupsw2019', MYSQL_USER: 'root', MYSQL_PORT:3306}" >> config.dev.json 


COPY package.json ./

COPY . . 

## install typescript 
RUN npm i -g typescript
# install all dependencies of project
RUN npm install

# build project 
RUN npm run build 

EXPOSE 8080

# https://github.com/vishnubob/wait-for-it
CMD ["./wait-for-it.sh","mysql:3306","--strict", "--timeout=60", "--", "npm", "start"]