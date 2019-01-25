FROM node:8

RUN mkdir -p /usr/src/nijobs-fe
WORKDIR /usr/src/nijobs-fe

COPY package*.json ./

RUN npm install

COPY ./src/ ./src
COPY ./public/ ./public

COPY .env ./

EXPOSE $PORT

CMD ["npm", "start"]