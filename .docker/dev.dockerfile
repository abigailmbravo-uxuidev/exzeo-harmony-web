FROM mhart/alpine-node:6
MAINTAINER Exzeo

ENV NODE_ENV=development

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN apk update && apk --no-cache add bash libc6-compat && \
  addgroup -S appuser && adduser -S -g appuser appuser && \
  chown -R appuser:appuser /app/ && \
  npm install && \
  npm cache clean

# RUN npm install

USER appuser
