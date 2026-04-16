---
title: Search Functionality
description: FAQ about search implementation and Pagefind behavior.
tags: [search, configuration]
pubDate: 2024-10-05
lastModDate: 2025-10-12
ogImage: false
toc: false
share: true
giscus: true
search: true
---

The theme uses :link[Pagefind]{id=CloudCannon/pagefind} for search functionality. It is implemented in the `SearchSwitch.astro` component and configured via `StandardLayout.astro`. By default, pages generated through dynamic routes that use `RenderPost.astro` and whose collections are listed in the `includes` option will be indexed by Pagefind and become searchable after build.

The search feature supports filtering by content collections, batch loading, search term highlighting on the results page, and limiting the number of displayed results. See [configurable options](../basic-configuration/#search) for details. You can also search for `data-pagefind-` in the editor to view all related setup.

> [!warning]- Pagefind works after build
>
> Pagefind works only after the site is fully built. Test it by running `pnpm build && pnpm preview` after building the Astro site.
