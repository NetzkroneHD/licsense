@echo off

set dir=%cd%

call deploy-client-typescript-fetch.bat
cd %dir%
echo Finished deploy-client-typescript-fetch
call deploy-client-webclient.bat
cd %dir%
echo Finished deploy-client-webclient
call deploy-server-spring-boot.bat
echo Finished deploy-server-spring-boot