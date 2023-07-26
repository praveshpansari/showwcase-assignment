FROM node:current-alpine
WORKDIR /app
COPY . ./
COPY .env.default /.env

RUN npm install
RUN npm install -g typescript

RUN npm install -g sequelize-cli
RUN npm install -g nodemon

RUN npm run build

RUN chmod 755 ./entrypoint.sh

CMD ["sh", "-c","--","echo 'started';while true; do sleep 1000; done"]