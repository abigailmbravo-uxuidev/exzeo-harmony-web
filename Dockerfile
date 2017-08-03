FROM mhart/alpine-node:8

MAINTAINER Exzeo

ENV NODE_ENV=production

COPY . /app

WORKDIR /app

# Install app
RUN apk update && apk --no-cache add bash libc6-compat && \
    npm install && \
    npm run build && \
    npm cache clean --force

CMD ["npm", "start"]
