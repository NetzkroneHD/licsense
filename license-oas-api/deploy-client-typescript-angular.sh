#!/bin/bash

cd ./target/typescript-angular

npm install
npm run build
npm pack
npm publish --access public --registry=http://localhost:9081/repository/npm-private/
