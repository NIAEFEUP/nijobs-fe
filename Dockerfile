FROM node:10.16.0-alpine

RUN mkdir -p /usr/src/nijobs-fe
WORKDIR /usr/src/nijobs-fe

COPY package*.json ./

RUN npm install

# Necessary files for building the app
COPY public/ public/
COPY config/ config/
COPY scripts/ scripts/
COPY src/ src/

# Copy env files
COPY .env* ./

EXPOSE $PORT

CMD ["npm", "start"]