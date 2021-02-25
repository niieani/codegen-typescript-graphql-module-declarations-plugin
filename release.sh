#!/usr/bin/env bash

if [[ -z "$GITHUB_REPOSITORY" ]]; then
  echo "Release step must be run inside of a GitHub Action."
  exit 1
fi

set -o xtrace

declare BRANCH="${GITHUB_REF#*/*/}"

git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git config --global user.email "action@github.com"
git config --global user.name "GitHub Action"

yarn prettier:write

yarn build

git push origin "HEAD:$BRANCH"

yarn semantic-release "$@"
