# A nested resource pattern & when to use it

## Prelude

We've all been there, you're building a website with your favourite JS framework and want to add an icon button.
No worries, just drop an `img` tag in your button, right? (not the best example, but stay with me)

### button.jsx

```jsx
<button>
  <img src="/icon.svg" />
</button>
```

Now let's just change the colour on focus... Oh—how the heck do I do that?

## What's the problem?

Our icon is an SVG and its colour is set inside the file.
To make it match the CSS font colour, we'll need to update the `fill` and/or `stroke` to use a special keyword: `currentColor`.

### icon.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg"
  width="100"
  height="100"
>
  <circle r="50" cx="50" cy="50" fill="currentColor" />
</svg>
```

> Miles, that didn't work.

Sorry, I forgot to mention that you can't use it in an `img` tag.

## But there's a solution

SVGs are this great and powerful tool: vector graphics as markup. This makes the format familiar and accessible to anyone who knows HTML.
Better yet, they are also part of the HTML specification, meaning you can use those tags directly inline.

### button.jsx

```jsx
<button>
  <svg width="100" height="100">
    <circle r="50" cx="50" cy="50" fill="currentColor" />
  </svg>
</button>
```

Problem solved. Pack up and call it a day. You've earned a rest.

Except now you want a three buttons—with the same icon—and you know the image is a placeholder—and you want to serve it from a CDN.

## In steps the star of the show

SVG has a little-known feature to include & reuse instances of graphical elements.
This is achieved with the `use` tag, which accepts the `id` of another element by means of the `href` attribute.

### icon.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg"
  width="100"
  height="100"
>
  <circle id="roundShape" r="10" cx="10" cy="10" />
  <use href="#roundShape" x="20">
</svg>
```

But we're not limited to including within the same SVG. We're not even limited to the same file.
As long as our external icon SVG has an `id`, we can include it from wherever we want!\*

_\*(within reason & I haven't tested cross-origin sources)_

## A working example

So what does all this look like?

### icon.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg"
  id="iconId"
  width="100"
  height="100"
>
  <circle r="10" cx="10" cy="10" />
</svg>
```

### button.jsx

```jsx
<button>
  <svg>
    <use href="icon.svg#iconId">
  </svg>
</button>
```

The `href` points to a resource, with the URL fragment specifying which element we're including.
You **must** use an `id` and URL fragment, otherwise it won't work.

Obviously I've cut it down a bit for brevity, but there's not much more to it.
Just add your styling code, maybe some `:active` & `:focus` pseudo-classes, and you have an externally referenced SVG changing colour.
