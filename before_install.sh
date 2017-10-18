#!/bin/bash

#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
   yarn add -g firebase-tools
   yarn add codecov.io coveralls
   cd functions
   yarn
   cd ..
fi