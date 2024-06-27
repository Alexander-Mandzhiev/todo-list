FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm install

RUN npm install -g pnpm

COPY . .

COPY prisma ./prisma 

RUN npx prisma generate

CMD [ "pnpm","run","start"]