FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@7.3.9

COPY . ./

RUN ng build --prod

EXPOSE 80

CMD ["node", "server.js"]
