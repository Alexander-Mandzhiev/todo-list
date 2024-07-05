FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY prisma ./prisma 

RUN npx prisma generate

CMD source start.sh