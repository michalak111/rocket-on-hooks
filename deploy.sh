#!/usr/bin/env bash

ssh rocket-on-hooks@vps704954.ovh.net -o StrictHostKeyChecking=no <<EOF
  echo $1
  git pull
  git checkout $1
  git pull
  docker-compose -f docker-compose.yml -p $1 stop
  BRANCH=$1 docker-compose -f docker-compose.yml -p $1 up --build -d
  exit
EOF
