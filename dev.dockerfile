FROM mhart/alpine-node:6
MAINTAINER Exzeo

ENV NODE_ENV=development

RUN mkdir -p /app
RUN mkdir -p /app/src
RUN mkdir -p /app/public
RUN mkdir -p /app/scripts
RUN mkdir -p /app/server
RUN mkdir -p /app/utils

WORKDIR /app

COPY package.json /app

RUN npm install

COPY src/* /app/src
COPY public/* /app/public
COPY scripts/* /app/scripts
COPY server/* /app/server
COPY utils/* /app/utils

# RUN apk update && apk --no-cache add bash libc6-compat && \
#   addgroup -S appuser && adduser -S -g appuser appuser && \
#   chown -R appuser:appuser /app/ && \
#   npm install && \
#   npm cache clean

RUN npm install

# USER appuser
