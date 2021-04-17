#!/bin/bash
pwd
dirname $0
SCRIPT=$(which $0)
# Absolute path this script is in. /home/user/bin
SCRIPT_PATH=`dirname $SCRIPT`
echo $SCRIPT_PATH
