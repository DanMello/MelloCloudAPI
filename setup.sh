#!/bin/bash

echo "Creating remote directory for api"
ssh deploy@10.0.0.201 << 'ENDSSH'
rm -rf mellocloud/api
mkdir -p mellocloud/api
pm2 delete MelloCloudAPI
ENDSSH

echo "Sending files to server"
rsync -arv --exclude-from='exclude_me_setup.txt' -v -e ssh /home/dan/Production/server-1/apps/mellocloud/MelloCloudAPI/. deploy@10.0.0.201:/home/deploy/mellocloud/api

echo "Starting pm2 for MelloCloudAPI"
ssh deploy@10.0.0.201 << 'ENDSSH'
cd mellocloud/api
nvm install
npm install
pm2 start --name MelloCloudAPI index.js
ENDSSH
