#!/bin/sh
set -e

cd site || exit 1

git init
git add -A
git commit -m deploy
git push -f git@github.com:fox-projects/fox-css main:gh-pages
