# fox-css

## introduction

fox-css styles your html so it doesnt look like total crap. semantic ways to auto layout your content. also, no class names.

## usage

```sh
npm i -S fox-css
```

### layout

#### general

use `<section>`, `<article>` to group content

#### splitting view

to split contents in a left and right view, use `<span>`

```html
<section>
  <span>
    <h2>some left title</h2>
    <p>some content on the left</p>
  </span>
  <span>
    <h2>some right content</h2>
    <p>some content on the right</p>
  </span>
</section>
```

both share 50% of screen width. on smaller screens, the `<span>` take up 100% of screen width

it splits both spans

#### floating

to float elements, use `<aside></aside>`

```html
<section>
  <h2>some title</h2>
  <aside>
    <h3>aside title</h3>
    <p>some content in the aside</p>
  <p>some content in the section that will be adjacent to the aside</p>
</section>
```

it floats them right. width of floated element is 35%. asides can be placed anywhere (inside `<section>`, `<article>`, `<main>`, etc.) *on smaller screens the `<aside>` disappears*.

## contributing

```sh
git clone https://github.com/eankeen/fox-css
cd fox-css
npm install
npm run serve
```
