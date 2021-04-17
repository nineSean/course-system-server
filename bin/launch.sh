#!/bin/bash
#WORK_PATH='/root/server'
WORK_PATH="/home/course/server/"
cd $WORK_PATH
echo '杀掉旧服务'
pm2 stop course-server
pm2 delete course-server
echo '清理代码'
git reset --hard origin/main
git clean -f
echo '拉取代码'
git pull origin main
echo '安装依赖'
yarn install
echo '编译 TypeScript -> JavaScript'
yarn build
echo '启动服务'
pm2 start process.yml --name course-server


