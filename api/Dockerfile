FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache make cmake gcc g++ python3 postgresql-dev
RUN npm install -g pnpm

ADD package.json /app/package.json

RUN pnpm install

CMD TZ=UTC pnpm dev
