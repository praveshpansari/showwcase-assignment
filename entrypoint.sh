#!/bin/sh

echo "Starting db migration"
cd db
sequelize db:migrate --env production
cd ..
node ./dist/server.js