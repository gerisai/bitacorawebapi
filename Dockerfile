FROM node:current-alpine

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

ENV ENVIROMENT=production

ENV  MONGO_USER=bitacoraweb

ENV MONGO_PASSWORD=lamcsrifa

ENV DBNAME=bitacoraTest

ENV JWT_SECRET=DIaz196704118!@

ENV JWT_EXPIRES_IN=1d

ENV CORS_ORIGIN=https://bitacora-cent.gerisaidiaz.com.mx

ENTRYPOINT [ "node", "./bin/www" ]