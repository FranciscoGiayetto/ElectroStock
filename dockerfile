FROM node:18-alpine3.17 AS build

RUN apk add --no-cache caddy --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community

ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /frontend

COPY package*.json ./

RUN npm install --force

COPY . ./

RUN npm run build

FROM alpine:3.17

WORKDIR /app

COPY --from=build /frontend/build ./
COPY --from=build /frontend/Caddyfile ./
COPY --from=build /usr/sbin/caddy /usr/sbin/caddy

EXPOSE 3000

CMD caddy run --config Caddyfile --adapter caddyfile 2>&1