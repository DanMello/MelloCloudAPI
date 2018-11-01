#!/bin/bash

echo "Sending files to server"
rsync -arv --exclude-from='exclude_me.txt' -v -e ssh /home/dan/Production/server-1/apps/mellocloud/MelloCloudAPI/. deploy@10.0.0.201:/home/deploy/mellocloud/api

echo "Installing node using nvm and installing node modules on remote server"
ssh deploy@10.0.0.201 << 'ENDSSH'
cd mellocloud/api
nvm install
npm install
pm2 reload MelloCloudAPI
ENDSSH
