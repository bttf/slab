FROM mcr.microsoft.com/playwright:v1.27.0-focal

WORKDIR /app

ADD package.json /app/package.json

RUN yarn

CMD TZ=UTC yarn dev
