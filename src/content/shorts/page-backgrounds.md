---
title: Page Backgrounds
description: FAQ about the theme background implementations, performance, and limitations.
tags: [performance, background]
pubDate: 2024-10-05
lastModDate: 2024-10-23
ogImage: false
toc: false
share: true
giscus: true
search: true
---

Backgrounds, except for 'rose', use custom elements with animations that stop to prevent memory leaks. No major performance issues have been reported, but please [report any problems](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) if you encounter theme.

Currently, backgrounds are not supported for pages at the `/blog/[...slug]` path. If you wish to add one, you can modify the `src/pages/blog/[...slug].astro` file like this:

```astro title='src/pages/blog/[...slug].astro' ins={8}
...
<BaseLayout
  title={frontmatter.title}
  description={frontmatter.description}
  ogImage={frontmatter.ogImage}
  {pubDate}
  {lastModDate}
  bgType='plum'  // 'dot', 'rose', 'particle'  
>
  ...
</BaseLayout>
```

Additionally, you can directly modify the constants in each background component (`/src/components/backgrounds/`) to customize the animation effects.

> [!warning]- CPU usage warning for 'dot' background
>
> The 'Dot' background animation can be CPU-intensive, potentially causing slowdowns or noisy fans on less powerful devices ([#1](https://github.com/lin-stephanie/astro-antfustyle-theme/issues/1), [antfu/antfu.me#86](https://github.com/antfu/antfu.me/issues/86)). Despite adjustments to reduce the load ([8fb85e1](https://github.com/lin-stephanie/astro-antfustyle-theme/commit/8fb85e1)), the effect may still be noticeable. If this is an issue, consider using a different background.
