#!/bin/bash

DOCKER_NAME=<%- name %>.server
DOCKER_PORT=$1
: ${DOCKER_PORT:=80}

LOG_PATH="/tmp/nginx/<%- name %>"

mkdir -p "$LOG_PATH"

docker rm -f $DOCKER_NAME
docker run --name=$DOCKER_NAME -it -d \
	-v `pwd`/site:/usr/share/nginx/html\
	-v "$LOG_PATH":/var/log/nginx\
	-p $DOCKER_PORT:80 nginx
