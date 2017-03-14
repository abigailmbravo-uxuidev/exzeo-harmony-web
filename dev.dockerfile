FROM mhart/alpine-node:6
MAINTAINER Exzeo

ENV NODE_ENV=production

RUN apk add --no-cache nano && export TERM=xterm
RUN mkdir -p /app
RUN mkdir -p /app/src
RUN mkdir -p /app/public
RUN mkdir -p /app/scripts
RUN mkdir -p /app/server
RUN mkdir -p /app/utils

WORKDIR /app

COPY package.json /app/

COPY .  /app

WORKDIR /app

RUN apk update && apk --no-cache add bash libc6-compat && \
  npm install && \
  npm cache clean
