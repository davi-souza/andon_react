#!/bin/bash

BRANCH=$1
ENVIRONMENT=$2

echo "Starting deploy for branch $BRANCH to $ENVIRONMENT environment"

git checkout $BRANCH
git pull

yarn build

cd ../dia_backend

if [[ $ENVIRONMENT == 'production' ]]; then
  git checkout master
else
  git checkout next-release
fi
git pull

rm -rf src/views/public
cp -R ../new_andon_react/build/ src/views/
mv src/views/build src/views/public

git add .
git commit -m "Deploy frontend"
git push
