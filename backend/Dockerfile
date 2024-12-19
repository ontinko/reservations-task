FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma
# CMD ["npx", "prisma", "migrate", "dev"]
# CMD ["npx", "tsx", "./prisma/seed.ts"]
#
# RUN npx prisma migrate deploy
#
# RUN npx tsx ./prisma/seed.ts

EXPOSE 3000
