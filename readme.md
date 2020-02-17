# fox css

![david dependencies](https://img.shields.io/david/eankeen/fox-css)
![npm downloads per month](https://img.shields.io/npm/dm/fox-css)
![node version](https://img.shields.io/node/v/fox-css.svg)
[![gitHub license](https://img.shields.io/github/license/eankeen/fox-css)](https://github.com/eankeen/fox-css/blob/dev/license)

## introduction

use fox-css to style your semantic html. no need to memorize class names. light and dark.

## usage

### via cdn

```html
# default theme (dark)
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.min.css"
>

# dark theme
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.dark.min.css"
>

# light theme
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.light.min.css"
>
```

### via bundler

```js
// npm i -S fox-css

import ./node_modules/fox-css/dist/fox.dark.min.css
```

## contributing

```sh
git clone https://github.com/eankeen/fox-css
cd fox-css

pnpm install
pnpm run serve

# release
pnpm version patch
```
