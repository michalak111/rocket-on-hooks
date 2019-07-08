#!/usr/bin/env bash

git checkout $1
git pull
docker-compose -f docker-compose.yml -p $1 stop
docker-compose -f docker-compose.yml -p $1 up -e BRANCH=$1 --build -d
exit
