---
title: Tag Filter in List and Card Views
description: Notes on the tag filter implementation and how to reuse it in other views.
tags: [tag, configuration]
pubDate: 2026-04-17
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

The theme implements tag filtering through UI controls in the desktop sidebar and the mobile panel, rather than by creating individual tag pages with dynamic routing.

This approach is intentional. Compared with solutions based on [creating tag pages](https://www.rainsberger.ca/blog/dynamic-routing-tag-pages-in-astro/) with [dynamic routes](https://docs.astro.build/en/tutorial/5-astro-api/2/), the current UI-driven filter is easier to extend across different view components and different data sources.

At the moment, this feature is applied only in:

- `ListView`, where tags filter `ListItem`
- `CardView`, where tags filter `CardItem`

The shared UI is built around:

- `DesktopAside.astro` for desktop
- `MobileControl.astro` for mobile
- `TagFilter.astro`, `TagSidebar.astro`, `TagPanel.astro`, and `TagButton.astro` for the tag filter behavior itself

If you want to add tag filtering to custom view, you can import `DesktopAside` and `MobileControl` into that view component and wire them to your own item-rendering logic.

This makes the feature more flexible than page-per-tag routing, because different views can filter different datasets independently without requiring extra generated routes.
