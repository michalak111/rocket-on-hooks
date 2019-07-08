#!/usr/bin/env bash

ssh naava@217.182.76.91 -p 13579 -o StrictHostKeyChecking=no <<EOF
  cd rocket-on-hooks
  git checkout $1
  git pull
  docker-compose -f docker-compose.yml -p $1 stop
  docker-compose -f docker-compose.yml -p $1 up -e BRANCH=$1 --build -d
  exit
EOF
