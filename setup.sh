#!/bin/bash

echo "Creating remote directory for api"
ssh deploy@10.0.0.201 << 'ENDSSH'
mkdir -p mellocloud
cd mellocloud
rm -rf !\(public\)
pm2 delete MelloCloudAPI
ENDSSH

echo "Sending files to server"
rsync -arv --exclude-from='exclude_me_setup.txt' -v -e ssh /home/dan/Production/server-1/apps/mellocloud/MelloCloudAPI/. deploy@10.0.0.201:/home/deploy/mellocloud

echo "Starting pm2 for MelloCloudAPI"
ssh deploy@10.0.0.201 << 'ENDSSH'
cd mellocloud
nvm install
npm install
NODE_ENV=production pm2 start --name MelloCloudAPI index.js
ENDSSH
