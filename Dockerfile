FROM node:10.16.1-alpine 

WORKDIR /usr/app/ 

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

COPY package.json ./
RUN npm install 

COPY . . 

EXPOSE 8080

CMD ["npm", "run", "build", "&&", "npm", "start"]