FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache make cmake gcc g++ python3 postgresql-dev

ADD package.json /app/package.json

RUN yarn

CMD TZ=UTC yarn dev
