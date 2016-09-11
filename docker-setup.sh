#!/bin/bash

set -euo pipefail

echo 'building image'
docker build -t monofuel/japura-www .

echo 'creating containers'

docker create --restart always \
	--name japura-www-mongo \
	-v /home/monofuel/data/japura-www-data:/data/db \
	mongo

docker start japura-www-mongo

docker create --restart always \
	--link japura-www-mongo:mongodb \
	--name japura-www \
	-p 127.0.0.1:3010:3000 \
	monofuel/japura-www

docker start japura-www
