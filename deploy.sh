#!/bin/sh

set -xe

cd site || exit 1

git init
git add -A
git commit -m deploy
git push -f git@github.com:eankeen/fox-css master:gh-pages

cd -
