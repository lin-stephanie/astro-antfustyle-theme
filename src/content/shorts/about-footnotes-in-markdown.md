---
title: About Footnotes in Markdown
description: FAQ about removing the default Footnotes heading added by Astro.
tags: [markdown, footnote]
pubDate: 2024-10-05
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

By default, Astro adds an `h2` heading called "Footnotes" when you use footnotes in Markdown/MDX. To remove it, you can update the `generateToc` like this:

```ts title='src/utils/toc.ts' del={8} ins={9}
export function generateToc(
  headings: readonly MarkdownHeading[],
  minHeadingLevel: HeadingLevel,
  maxHeadingLevel: HeadingLevel
) {
  ...
  const bodyHeadings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
    ({ depth , text}) => depth >= minHeadingLevel && depth <= maxHeadingLevel && text !== 'Footnotes'
  )
  ...
}
```

Or modify it to suit your needs.
