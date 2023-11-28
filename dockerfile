FROM node:18-alpine3.17

ENV NODE_ENV=production

WORKDIR /frontend

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve","-s","build"]