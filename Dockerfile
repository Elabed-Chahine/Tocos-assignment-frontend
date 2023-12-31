FROM node:16

WORKDIR  /src/app/frontend

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]