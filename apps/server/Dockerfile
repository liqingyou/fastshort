FROM node:18.19.0-alpine
LABEL maintainer "LiQingYou <liqingyou1993@gmail.com>"
WORKDIR /app

RUN npm install --global "pnpm"

COPY . .
RUN pnpm install

ENV PLATFORM=PROD \
  IN_DOCKER=true

EXPOSE 3000
CMD node /app/app.js
