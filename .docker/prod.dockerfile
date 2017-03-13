FROM mhart/alpine-node:6.9

MAINTAINER Exzeo

ENV NODE_ENV=production

RUN mkdir -p /var/www
WORKDIR   /var/www
COPY     . /var/www

RUN     npm install && npm run build && \
        rm -rf node_modules && \
        rm -rf src && \
        rm -rf .docker && \
        rm -rf public && \
        rm -rf scripts && \
        npm install --production

ENTRYPOINT ["node", "server"]
