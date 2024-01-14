# fox-css

## Introduction

Quickly style HTML without the hassle.

## Usage

### Via CDN

```html
<!-- default theme (dark) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.min.css" />

<!-- dark theme -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.dark.min.css"
/>

<!-- light theme -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.light.min.css"
/>
```

### Via Bundler

```js
/* npm i -S fox-css */
import './node_modules/fox-css/dist/fox.dark.min.css'
```

## Contributing

```sh
git clone https://github.com/fox-projects/fox-css
cd fox-css

pnpm install
pnpm run serve

# release
pnpm version patch
```
