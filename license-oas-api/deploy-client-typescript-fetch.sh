#!/bin/bash

cd ./target/typescript || exit

npm install
npm run build
npm pack
