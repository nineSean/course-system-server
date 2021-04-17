#!/bin/bash
#echo '项目构建'
#yarn build
#echo '上传文件'
#scp -r ./dist course@dev:/home/course/server
#scp ./process.yml course@dev:/home/course/server
echo '执行部署脚本'
ssh course@dev 'bash -s' < ./bin/launch.sh