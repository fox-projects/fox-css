#!/bin/sh

set -e

cd site

git init
git add -A
git commit -m deploy

git push -f https://github.com/eankeen/fox-css.git dev:gh-pages

cd -