FROM node:18-alpine3.17 AS build

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

COPY --from=build /frontend/build /app/build
COPY --from=build /frontend/Caddyfile /app

COPY --from=caddy:2.7.5 /usr/bin/caddy /usr/bin/caddy

EXPOSE 3000

CMD caddy run --config Caddyfile --adapter caddyfile 2>&1