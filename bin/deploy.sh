#!/bin/bash
#WORK_PATH='/root/server'
WORK_PATH="/home/course/server/"
cd $WORK_PATH
echo '清理代码'
git reset --hard origin/main
git clean -f
echo '拉取代码'
git pull origin main
echo '删除旧镜像'
docker rmi $(docker images 'course-platform-server' -a -q)
echo '构建新镜像'
docker build -t course-platform-server .
echo '删除旧容器'
docker stop course-platform-server
docker rm course-platform-server
echo '启动新容器'
docker run -p 3000:8000 --name course-platform-server -d course-platform-server

