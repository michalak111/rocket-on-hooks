#!/usr/bin/env bash

ssh rocket-on-hooks@vps704954.ovh.net -o StrictHostKeyChecking=no <<EOF
  echo $1
  git checkout $1
  git pull
  docker-compose -f docker-compose.yml -p $1 stop
  docker-compose -f docker-compose.yml -p $1 up -e BRANCH=$1 --build -d
  exit
EOF
