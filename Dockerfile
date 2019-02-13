FROM node:10-alpine

LABEL maintainer=Exzeo

RUN apk update && apk --no-cache add bash libc6-compat g++ make python

ARG NPM_TOKEN

WORKDIR /app

COPY . /app

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

# Install app
RUN npm ci && \
 mv .default.env .env && \
 npm run build && \
 npm cache verify

RUN rm -f .npmrc

CMD ["npm", "run", "server"]

