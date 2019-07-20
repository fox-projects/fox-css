# fox-css

## introduction

fox-css styles your html so it doesnt look like total crap. semantic ways to auto layout your content. one class name. light and dark.

## usage

```sh
npm i -S fox-css
# css in ./dist/fox.dark.min.css
```

## contributing

```sh
git clone https://github.com/eankeen/fox-css
cd fox-css
npm install
npm run serve # serves dark version by default
npm run serve -- --light # serve light version
```

## roadmap

- use `postcss-calc` etc. to convert `calc($border-thickness / 2)` to `1px`
- make links look better
