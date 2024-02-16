#!/bin/bash

dir=$(pwd)

./deploy-client-typescript-fetch.sh
cd "$dir"
echo "Finished deploy-client-typescript-fetch"

./deploy-client-webclient.sh
cd "$dir"
echo "Finished deploy-client-webclient"

./deploy-server-spring-boot.sh
echo "Finished deploy-server-spring-boot"
