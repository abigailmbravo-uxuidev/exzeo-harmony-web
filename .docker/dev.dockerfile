FROM node:6.2

MAINTAINER Exzeo

ENV NODE_ENV=development
ENV PORT=3000

RUN mkdir -p /var/www
WORKDIR   /var/www
COPY     package.json /var/www

RUN       npm install
COPY /public /var/www/public
COPY src /var/www/src
COPY scripts /var/www/scripts

RUN       npm run build
COPY server /var/www/server
ENV NODE_ENV=production


EXPOSE $PORT

ENTRYPOINT ["node", "server"]
