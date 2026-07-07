---
title: About Open Graph Images
description: How to configure OG images in the Astro AntfuStyle Theme
pubDate: 2020-01-02
lastModDate: 2026-07-07
ogImage: true
toc: true
share: true
giscus: true
search: true
---

This post explains how to configure Open Graph (OG) images in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme).

## What Are Open Graph Images?

OG images, short for Open Graph images, are metadata images used by social media platforms to visually represent a webpage when shared. Originating from Facebook's [Open Graph protocol](https://ogp.me/),  they make shared content more engaging.

Platforms like Facebook, Twitter, LinkedIn, and Discord use these images. While Twitter uses its own protocol ([Twitter Cards](https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards)), "OG image" is often used as a general term for these images.

## Configuring OG Images

There are four ways to configure OG images in this theme, listed by priority:

**Method 1**: Specify the `ogImage` field in Markdown/MDX frontmatter with a custom image saved under `public/og-images/`. The value should be the path relative to that directory. For example:

```md title='src/content/blog/custom.md'
---
title: Custom OG Image

# Required file: `public/og-images/custom.png`
# OG image served from: `/og-images/custom.png`
ogImage: custom.png
---
```

```md title='src/content/blog/custom.md'
---
title: Custom OG Image

# Required file: `public/og-images/custom/custom.png`
# OG image served from: `/og-images/custom/custom.png`
ogImage: custom/custom.png
---
```

> [!note]- When custom OG image is missing
>
> If `FEATURES.ogImage` is enabled and the image isn’t found in `public/og-images/`, the build warns and uses the fallback image.

**Method 2**: Set `ogImage` to `true` or remove the field to automatically generate a page-specific OG image at `/og-images/`. The generated path is based on the final page URL. Static MDX pages in `src/pages/` use their page pathname directly, while routed content collections use the `pathnamePrefix` configured in `collections`. For example:

```md title='src/pages/blog/index.mdx'
---
title: Blog

# OG image served from: `/og-images/blog.png`
ogImage: true
---
```

```md title='src/content/blog/getting-started.md'
---
title: Getting Started

# Rendered under: `pages/blog/[...slug].astro`
# Configured as: `{ collection: 'blog', pathnamePrefix: '/blog' }`
# OG image served from: `/og-images/blog/getting-started.png`
ogImage: true

# Rendered under: `pages/writing/[...slug].astro`
# Configured as: `{ collection: 'blog', pathnamePrefix: '/writing' }`
# OG image served from: `/og-images/writing/getting-started.png`
ogImage: true
---
```

> [!important]- Keep `pathnamePrefix` aligned with the route that renders the collection
>
> `pathnamePrefix` should match the URL segment used by the dynamic route that renders that collection.
>
> For example, the `blog` collection is stored in `src/content/blog/`, but its public URLs come from `src/pages/blog/[...slug].astro`, so its prefix is `/blog`. If the same collection were rendered by `src/pages/writing/[...slug].astro`, its prefix should be `/writing` instead.
>
> In short, configure `pathnamePrefix` from the page URL, not from the content folder name.

> [!note]- Page-specific OG image fallback behavior
>
> Page-specific OG images are generated only when the entry is not a draft or redirect and its `title` is non-empty and different from `authorOrBrand`. If the title is empty or matches `authorOrBrand`, the page uses the fallback image instead.

**Method 3**: Set `ogImage` to `fallback` to prevent page-specific generation and use the fallback image instead. The fallback image is generated based on the `fallbackTitle` and `fallbackBgType` configuration options and served from `/og-images/og-image.png`.

```md title='src/content/blog/getting-started.md'
---
title: Getting Started

# OG image served from: `/og-images/og-image.png`
ogImage: fallback
---
```

**Method 4**: Set `ogImage` to `false` to disable OG image metadata for that page. The page will not generate a page-specific image, will not use the fallback image, and will not output `og:image`, `twitter:image`, or JSON-LD `image`.

## Template for Auto-Generated OG Images

The template (located in `src/utils/og-image/template/markup.ts`) for auto-generated OG images is processed by :link[satori-html]{id=natemoo-re/satori-html .github}. It takes three parameters:

- `authorOrBrand`: Defined by `FEATURES.ogImage[1].authorOrBrand` and displayed above the `title`. This value is also used for the fallback OG image.
- `title`: Set in the Markdown/MDX frontmatter for posts and pages. If missing, empty, or identical to `authorOrBrand`, it falls back to `FEATURES.ogImage[1].fallbackTitle`. The fallback OG image also uses `fallbackTitle`.
- `bgType`: Set in the Markdown/MDX frontmatter for posts and pages. If missing, `false`, or invalid, it falls back to `FEATURES.ogImage[1].fallbackBgType`. The fallback OG image also uses `fallbackBgType`.

For details on how to replace the logo in the template, refer to [Advanced Configuration - Customizing Logo](../advanced-configuration/#customizing-logo).

Below are the OG images generated with `bgType` set to `plum`, `rose`, `dot`, and `particle`:

![](../../assets/about-open-graph-images/plum.png)

![](../../assets/about-open-graph-images/rose.png)

![](../../assets/about-open-graph-images/dot.png)

![](../../assets/about-open-graph-images/particle.png)

## How This Theme Automatically Generates OG Images

This theme uses the `src/pages/og-images/[...slug].png.ts` endpoint to generate OG images from structured content metadata. The endpoint always registers the fallback OG image path `/og-images/og-image.png`.

For page-specific images, it collects static MDX pages from the `pages` collection and routed content entries from the collections configured in `src/config.ts`. Each content entry is resolved to its final page URL using `pathnamePrefix`, and that URL is then mapped to the corresponding OG image path.

```ts title='src/config.ts'
ogImage: [
  true,
  {
    authorOrBrand: `${SITE.title}`,
    fallbackTitle: `${SITE.description}`,
    fallbackBgType: 'plum',
    collections: [
      { collection: 'blog', pathnamePrefix: '/blog' },
      { collection: 'changelog', pathnamePrefix: '/changelog' },
      { collection: 'shorts', pathnamePrefix: '/shorts' },
    ],
  },
],
```

`collection` is the data source, while `pathnamePrefix` is the URL prefix where entries from that collection are rendered. For example, `{ collection: 'articles', pathnamePrefix: '/writing' }` maps an `articles` entry with id `hello` to `/writing/hello/`, and then to `/og-images/writing/hello.png`.

Only entries with `ogImage: true`, a valid title, and no `draft` or `redirect` field get page-specific endpoint targets. Entries with `ogImage: 'fallback'`, `ogImage: false`, or a custom image string do not register page-specific targets.

> [!important]- Configure every routed collection
>
> A content collection rendered by a dynamic route only gets page-specific OG images when it is listed in `FEATURES.ogImage[1].collections`. If a collection is queried and rendered by a route but is not configured here, its pages will not register automatic OG image targets.

## Extra Tips

Auto-generated OG images are compressed with :link[sharp]{id=lovell/sharp .github}. For custom images, consider [manual compression](../managing-image-assets/#image-compression).

`public/og-images` is only for explicitly configured custom images. If a file in `public/og-images` matches the path of an auto-generated endpoint, including `public/og-images/og-image.png`, the build warns and skips generating that endpoint to avoid an output conflict. Delete the static file to let the endpoint generate it, or set `ogImage` to that filename to intentionally use the static image.

If you want to globally disable OG image generation and OG image metadata, set `FEATURES.ogImage` to `false` or `[false, {...}]` in `src/config.ts`.

Thank you for reading. Happy coding! 💃

:::details
::summary[Changelog]
2026-07-07
- Updates to route-based generation, custom static images, and fallback behavior

[View full history](https://github.com/lin-stephanie/astro-antfustyle-theme/commits/main/src/content/blog/about-open-graph-images.md)
:::
