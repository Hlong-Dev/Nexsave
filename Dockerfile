FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY .env.local ./

COPY tsconfig.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start