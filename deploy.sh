
set -e

mkdir -p site/styles

rm site/*.html
rm site/styles/*

cp samples/* site
cp dist/* site/styles

cd site

cp styles/fox.dark.min.css styles/fox.css

git init
git add -A
git commit -m deploy

git push -f https://github.com/eankeen/fox-css.git master:gh-pages

cd -