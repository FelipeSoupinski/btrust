#!/bin/sh
# Wrapper para facilitar uso dos docker-compose files movidos para config/
# Uso:
#  ./bin/docker-compose.sh up --build    # produz
#  ./bin/docker-compose.sh dev up --build # desenvolvimento (Vite)

if [ "$1" = "dev" ]; then
  shift
  docker compose -f config/docker-compose.dev.yml "$@"
else
  docker compose -f config/docker-compose.yml "$@"
fi
