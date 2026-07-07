---
title: Page Backgrounds
description: FAQ about the theme background implementations, performance, and limitations.
tags: [performance, background]
pubDate: 2024-10-05
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

Backgrounds, except for `'rose'`, use custom animated elements that automatically stop when inactive to help prevent memory leaks. No major performance issues have been reported.

The `'dot'` background can be CPU-intensive and may cause slowdowns or increased fan noise on less powerful devices ([#1](https://github.com/lin-stephanie/astro-antfustyle-theme/issues/1), [antfu/antfu.me#86](https://github.com/antfu/antfu.me/issues/86)). Although adjustments have been made to reduce its resource usage ([8fb85e1](https://github.com/lin-stephanie/astro-antfustyle-theme/commit/8fb85e1)), the impact may still be noticeable. Consider using a different background if performance becomes an issue.

Please [report any problems](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) you encounter. You can also customize the animation effects by modifying the constants in the corresponding components under `src/components/backgrounds/`.
