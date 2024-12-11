FROM node:20-alpine

WORKDIR /app

COPY . /app

COPY .. .

RUN npm install -g @quasar/cli

RUN npm install

EXPOSE 8080

CMD ["quasar", "dev"]
