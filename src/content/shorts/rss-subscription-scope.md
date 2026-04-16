---
title: RSS Subscription Scope
description: FAQ about what content is included in RSS and how to customize it.
tags: [rss, configuration]
pubDate: 2024-10-05
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

Currently, the theme's RSS configuration (see `src/pages/rss.xml.js`) only allows visitors to subscribe to posts under `src/content/blog/`.

If you want to further customize which content on the site can be subscribed to, refer to the theme’s integrated :link{id=@astrojs/rss} documentation and [Astro's official guide](https://docs.astro.build/en/guides/rss/).

If the official integration doesn’t meet your needs, you may consider using :link[feed]{id=jpmonette/feed .github}. Additionally, community-provided [RSS Recipes](https://docs.astro.build/en/community-resources/content/#rss) are also worth checking out.
