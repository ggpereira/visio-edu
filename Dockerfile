FROM node:10.16.1-alpine 

WORKDIR /usr/app/ 

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

COPY package.json ./

## install typescript 
RUN npm i -g typescript
# install all dependencies of project
RUN npm install -ddd

COPY . . 

# build project 
RUN npm run build -ddd

EXPOSE 8080

# https://github.com/vishnubob/wait-for-it
CMD ["./wait-for-it.sh","mysql:3306","--strict", "--timeout=60", "--", "npm", "start"]