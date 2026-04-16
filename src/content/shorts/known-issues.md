---
title: Known Issues
description: Known issues found during theme development.
tags: [issues]
pubDate: 2024-10-05
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

## Known Issues

Here are some unresolved issues found during theme development. If you have a solution, feel free to [submit a PR](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls) — much appreciated!

1. No hints or error warnings when passing props in MDX components.

2. Even if `bgType` is not set to `'dot'` or `'particle'`, the JS for these backgrounds and p5.js is still bundled in the Astro build. However, it's not loaded by the browser unless used, so it generally doesn’t affect performance. (Attempts to load :link[p5.js]{id=processing/p5.js} from a CDN instead of importing it as a module caused errors: "p5 is not defined").

3. Automatically generated OG Images don’t support emojis, and titles may occasionally overflow the image boundary, making them partially invisible, despite margins and padding being set in the template.

Thank you for taking the time to explore and use the Astro AntfuStyle Theme. 

If you encounter any issues, find errors, or see opportunities for improvement, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls).

Let’s keep pushing forward and making great things happen — your input is always welcome! 🙌
