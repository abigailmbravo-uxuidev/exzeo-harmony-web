FROM mhart/alpine-node:6.9

MAINTAINER Exzeo

ENV NODE_ENV=development
ENV PORT=3000

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

ENV NODE_ENV=production

EXPOSE $PORT

ENTRYPOINT ["node", "server"]
