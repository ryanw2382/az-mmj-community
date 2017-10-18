#!/bin/bash
#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  firebase use dev --token 1/ksPiebLqAGAqvXbLZVQ2srosTFYpPVFpBO6uhcSZeRM
  firebase deploy --non-interactive --token 1/ksPiebLqAGAqvXbLZVQ2srosTFYpPVFpBO6uhcSZeRM
fi