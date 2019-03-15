#!/bin/bash

BACKEND_BRANCH=$1

echo "Starting development environment for backend branch $BACKEND_BRANCH"

yarn build

cd ../dia_backend

git checkout $BACKEND_BRANCH
git pull

rm -rf src/views/public
cp -R ../new_andon_react/build/ src/views/
mv src/views/build src/views/public
