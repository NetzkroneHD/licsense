#!/bin/bash

dir=$(pwd)

./chown-fix.sh
cd "$dir" || exit

./deploy-client-typescript-fetch.sh
cd "$dir" || exit
echo "Finished deploy-client-typescript-fetch"

./deploy-client-webclient.sh
cd "$dir" || exit
echo "Finished deploy-client-webclient"

./deploy-server-spring-boot.sh
cd "$dir" || exit
echo "Finished deploy-server-spring-boot"

