@echo off

cd ./target

cd ./webclient

call mvn clean install -DskipTests
