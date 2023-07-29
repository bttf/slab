FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

ADD package.json /app/package.json

RUN pnpm install

CMD TZ=UTC pnpm dev
