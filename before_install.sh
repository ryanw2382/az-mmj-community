#!/bin/bash

#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
   yarn install -g firebase-tools
   yarn install codecov.io coveralls
   cd functions
   yarn install
   cd ..
fi