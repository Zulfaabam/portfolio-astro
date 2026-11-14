---
title: Utilizing The New CSS Anchor Position In My Portfolio
date: "2026-04-02T07:28:28.305Z"
published: 2026-04-02
slug: utilizing-the-new-css-anchor-position-in-my-portfolio
tags:
  - css
  - reactjs
  - html5
coverImage: >-
  https://cdn.hashnode.com/uploads/covers/69c28cbe92029d915f275b8e/6f89447c-2748-4002-9dff-92530f1de5ea.png
description: Sharing the implementation of the CSS Anchor positioning in my portfolio
---

Positioning floating UI elements like tooltips, dropdowns, or popovers is surprisingly tricky. We often rely on JavaScript libraries like Popper.js—but what if CSS alone could handle it?

With the new `anchor()` function, CSS can now position elements relative to another element (the “anchor”)—no JavaScript required.

Here's a basic example of the anchor positioning:

```css
.button {
  anchor-name: --btn;
}

.tooltip {
  position-anchor: --btn;
  position: absolute;
  top: anchor(bottom);
  left: anchor(center);
}
```

- `anchor-name` defines the reference or the 'anchor'

- `position-anchor` links the floating element to the anchor

- `anchor()` is used to calculate position based on the anchor

Then I have an idea for my portfolio on my journey page. The idea is to use a star as an anchor to position my content (work experiences). How do I do it?

I first define the anchor and the floating elements. I need one anchor element and four floating elements.

```javascript
{
  /* Simplified JSX */
}
<>
  <div className="star-anchor">{/* Star SVG */}</div>

  <p className="year">{/* Year */}</p>

  <div className="content-1">{/* Content 1 */}</div>

  <div className="content-2">{/* Content 2 */}</div>

  <div className="content-3">{/* Content 3 */}</div>
</>;
```

I set the star as the anchor with 4 floating elements: the year, content 1, content 2, content 3. Let's start positioning it with just CSS:

```css
.star-anchor {
  anchor-name: --star-anchor; /* set the anchor name */
}

.year,
.content1,
.content2,
.content3 {
  position: absolute; /* allows free positioning */
  position-anchor: --star-anchor; /* link to anchor */
}
```

I want my floating elements to be in different positions relative to the anchor. Each element is positioned relative to the same anchor point, but with different offsets using `calc()` to create a structured layout around it.

```css
.year {
  /* Position this element relative to the top of the anchor */
  bottom: anchor(--star-anchor top);

  /* Move it slightly to the left of the anchor's left edge */
  right: calc(anchor(--star-anchor left) - 2.2rem);
}

.content1 {
  /* Place element slightly above the anchor (with extra spacing) */
  bottom: calc(anchor(top) + 4rem);

  /* Align element to the right edge of the anchor */
  left: anchor(right);
}

.content2 {
  /* Vertically align near the center of the anchor, then shift upward */
  bottom: calc(anchor(center) - 5.5rem);

  /* Add spacing to the right of the anchor */
  left: calc(anchor(right) + 2rem);
}

.content3 {
  /* Position element below the anchor with some spacing */
  top: calc(anchor(bottom) + 4.5rem);

  /* Slightly overlap or align near the right side of the anchor */
  left: calc(anchor(right) - 1rem);
}
```

Notice that there are two ways to use the `anchor()` function:

- `anchor(--star-anchor ...)` → explicitly references an anchor

- `anchor(...)` → uses the anchor defined via `position-anchor`

This implies:

- The first style explicitly reference the anchor (`--star-anchor`)

- Others rely on `position-anchor` that I already linked before

After tinkering with the positioning that I want, here's how it looks:

![Portfolio layout using CSS anchor positioning](https://cdn.hashnode.com/uploads/covers/69c28cbe92029d915f275b8e/1f43234a-41b2-4adc-95da-a0222396fa87.jpg)

Anchor positioning allows me to build more flexible, declarative layouts that would normally require JavaScript. It fits especially well with “floating UI” patterns and experimental portfolio designs.

That said, browser support is still evolving. For production use, consider adding fallbacks or responsive adjustments for smaller screens.

You can view the full version of the page in [my portfolio](https://abams-folio.netlify.app/journey).

To read more about the CSS `anchor()` function, you can jump in to [this MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor).
