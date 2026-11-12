# Writing a post

Create a Markdown file in `src/content/blog/`, for example `my-project.md`:

```md
---
title: "The story behind my project"
description: "A short summary for the blog index and search engines."
published: 2026-11-12
category: Project
tags: [astro, web-development]
draft: false
---

Start with a little context.

## The problem

Explain what you set out to solve.

## What I built

Add your story, images, links, and fenced code blocks.

## What I learned

Share the outcome and what you would do differently.
```

The filename determines the URL: `/blog/my-project`. Nested folders also work: `projects/my-project.md` becomes `/blog/projects/my-project`.

- Required fields: `title`, `description`, and `published` (YYYY-MM-DD).
- `category`: `Project`, `Learning`, `Story`, or `Writing` (default).
- `tags`: optional list, defaults to empty.
- `updated`: optional date, displayed beside the author.
- `draft: true`: excludes the post from both the index and detail routes, including during development. Set it to `false` to preview or publish.
- Posts appear newest first. `published` is a display/sort date, not a publishing schedule.

The page supplies the title as an H1, so start body headings at `##`. H2 and H3 headings automatically appear in the table of contents. Code blocks, blockquotes, lists, tables, links, and images have reading styles.

For images, use a relative path to an image beside the Markdown file, or put an image in `public/images/` and reference it as `![Descriptive alt text](/images/my-project.png)`.

The included `a-place-for-the-work.md` is a visible example; replace it, delete it, or set `draft: true` before publishing your own writing. The earlier Hashnode blog is linked from the index footer.

Preview with `pnpm exec astro dev --background`, then open `/blog`. Manage the server with `pnpm exec astro dev status`, `pnpm exec astro dev logs`, and `pnpm exec astro dev stop`. Run `pnpm check` for Astro/TypeScript validation.
