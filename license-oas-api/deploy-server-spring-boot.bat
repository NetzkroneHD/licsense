@echo off

cd ./target

cd ./spring

call mvn clean install -DskipTests
