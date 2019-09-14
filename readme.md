# fox-css

## introduction

use fox-css to style your semantic html. no need to memorize class names. light and dark.

## usage

```sh
npm i -S fox-css
# css in ./dist/fox.dark.min.css
```

## contributing

```sh
git clone https://github.com/eankeen/fox-css
cd fox-css

# node >= v12.10
yarn install
yarn serve # serves dark version by default
yarn serve --light
```

## roadmap

- use `postcss-calc` etc. to convert `calc($border-thickness / 2)` to `1px`
