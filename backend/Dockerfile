FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./wait-for-it.sh

RUN npx prisma generate --schema ./prisma/schema.prisma

EXPOSE 3000
