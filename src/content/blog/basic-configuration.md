---
title: Basic Configuration
description: How to configure Astro AntfuStyle Theme
pubDate: 2024-10-02
lastModDate: ''
toc: true
share: true
ogImage: true
---

This post is an basic guide on how to configure the `src/config.ts` file. If you’ve already set it up or feel confident configuring it (a simple task with type hints appearing on hover), you can skip ahead to [Advanced Configuration](https://astro-antfustyle-theme.vercel.app/blog/advanced-configuration/).

## Configuring `SITE`

The `SITE` object is used to configure the basic information of your website, and its configuration options are as follows:


| Options       | Type                                      | Description                                                                                                                                                                                                                                                                                  | Example                                                                               |
| ------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `website`     | `http://${string}` \| `https://${string}` | Specifies the final deployed URL, which must start with `http://` or `https://`. It will be passed to the [`site`](https://docs.astro.build/en/reference/configuration-reference/#site) config in Astro,<br>used for generating canonical URLs, `rss.xml` and other features.                | `'https://example.com'`                                                               |
| `base`        | `/${string}`                              | Specifies the base path for your site, which must start with `/`. It wiil be passed to the [`base`](https://docs.astro.build/en/reference/configuration-reference/#base) config in Astro, used when deploying to a subdirectory.                                                             | `/my-site/` (for a site deployed to `https://example.com/my-site/`)                   |
| `title`       | `string`                                  | Specifies the site name for formatting the `title` in the frontmatter as `<pageTitle> - <siteTitle>`.                                                                                                                                                                                        | `Maybe Use Your Name`                                                                 |
| `description` | `string`                                  | Specifies the default content for meta tags.                                                                                                                                                                                                                                                 | `Introduce yourself`                                                                  |
| `author`      | `string`                                  | Specifies your name for meta tags.                                                                                                                                                                                                                                                           | `Your Name`                                                                           |
| `lang`        | `string`                                  | Specifies the primary language of the document content. It must be a single 'language tag' in the format defined in [RFC 5646: Tags for Identifying Languages ](https://datatracker.ietf.org/doc/html/rfc5646#appendix-A) (also known as BCP 47).                                            | `'zh-Hant'` (Chinese written using the Traditional Chinese script)<br>`'fr'` (French) |
| `ogLocale`    | `string`                                  | Specifies the page content's language and region for better content display on social platforms. It must be in `language_TERRITORY` format, which you can find in [Language-Territory Information](https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html). | `'zh_CN'`<br>`'fr_FR'`                                                                |


> [!important]- Ensure `site.website` Is Edited before Deploying!
>
> During development, leaving `SITE.website` empty is fine. But in production, you must set your deployed URL in this option for SEO-related elements like canonical URLs and social card URLs.

## Configuring `UI`

The `UI` object allows you to configure navigation, social links, page views, and more. Its configuration options are as follows:


| Options                     | Type                            | Description                                                                                                                                                                         | Example                                                                                                                                                            |
| --------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `internalNavs`              | `InternalNav[]`                 | Configures internal navigation links. The configuration order matches the display order.                                                                                            | `[ { path: '/blog', title: 'Blog', displayMode: 'textToIconOnMobile', text: 'Blog', icon: 'i-ri-article-line' }, ... ]`                                            |
| `socialLinks`               | `SocialLink[]`                  | Specifies external social links. The configuration order matches the display order.                                                                                                 | `[ { link: 'https://github.com/lin-stephanie/astro-antfustyle-theme', title: 'AntfuStyle on Github', displayMode: 'alwaysIcon', icon: 'i-uil-github-alt' }, ... ]` |
| `NavBarLayout`              | `NavBarLayout`                  | Controls the layout of the navigation bar by defining components ( 'internalNavs', 'socialLinks', 'searchButton', 'themeButton', 'rssLink') positioned on the left and right sides. | `{ left: [], right: ['internalNavs', 'socialLinks', 'searchButton', 'themeButton', 'rssLink'] }`                                                                   |
| `tabbedLayoutTabs`          | `false \| [Tab, Tab, ...Tab[]]` | Enables tabs in the layout if set, defining `title` and `path` for each tab. If not using a tabbed layout, this can be set to `false`.                                              | ` [ { title: 'Changelog', path: '/changelog' }, { title: 'AstroBlog', path: '/feeds' }, ...]`                                                                      |
| `maxGroupColumns`           | `2 \| 3`                        | Sets the maximum number of columns to display in the group view (e.g., for `/projects` page), controlling the grid layout.                                                          | 3                                                                                                                                                                  |
| `showGroupItemColorOnHover` | `boolean`                       | Determines whether group item icons display in color when hovered over.                                                                                                             | `false`                                                                                                                                                            |

The properties of the `InternalNav` configuration object are as follows:

| Properties      | Type                                                                                                           | Description                                                                                                                                            | Example                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `path`*       | `/${string}`                                                                                                   | Specifies the navigation path. It must start with `/`.                                                                                                 | `'/blog'`、`'/blog/'`                                                                                                                                                                                                                                                                                         |
| `title`*      | `string`                                                                                                       | Sets the content displayed on hover for accessibility.                                                                                                 | `'Blog'`                                                                                                                                                                                                                                                                                                     |
| `displayMode` | `'alwaysText'` \| `'alwaysIcon'` \| `'textHiddenOnMobile'` \| `'iconHiddenOnMobile'` \| `'textToIconOnMobile'` | Defines how the navigation item is displayed responsively. Different modes control the visibility of text or icon depending on the viewport size.      | `'textToIconOnMobile'`                                                                                                                                                                                                                                                                                       |
| `text`        | `string`                                                                                                       | Sets the text displayed for the navigation item. Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`, and `'textToIconOnMobile'`. | `'Blog'`                                                                                                                                                                                                                                                                                                     |
| `icon`        | `Icon`                                                                                                         | Sets the icon displayed for the navigation item. Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`, and `'textToIconOnMobile'`. | `'i-ri-article-line'`<br>（The icon format follows the `i-<collection>-<icon>` or `i-<collection>:<icon>` format as per [UnoCSS specs](https://unocss.dev/presets/icons). See [Icon Usage](https://astro-antfustyle-theme.vercel.app/blog/faqs-and-known-issues/#icon-usage) for details on setting up icons） |

## Configuring `FEATURES`

The `FEATURES` object globally controls feature activation and configures options for each feature as follows:


**Share Feature Configuration**


| Options                        | Type                       | Description                                                                       | Example                                               |
| ------------------------------ | -------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `twitter`                      | `FeatureConfig<Mentioned>` | Configures Twitter sharing. If enabled, adds a mention to the specified username. | `[true, '@userName']`                                 |
| `mastodon`                     | `FeatureConfig<Mentioned>` | Configures Mastodon sharing. If enabled, adds a mention to the specified user.    | `[true, '[@userName@serverName](@ste7lin@fairy.id)']` |
| `facebook`<br><br><br><br><br> | `boolean`                  | Controls whether to include Facebook for sharing.                                 | `true`                                                |
| `pinterest`                    | `boolean`                  | Controls whether to include Pinterest for sharing.                                | `true`                                                |
| `reddit`                       | `boolean`                  | Controls whether to include Reddit for sharing.                                   | `true`                                                |
| `telegram`                     | `boolean`                  | Controls whether to include Telegram for sharing.                                 | `true`                                                |
| `whatsapp`                     | `boolean`                  | Controls whether to include WhatsApp for sharing.                                 | `true`                                                |
| `email`                        | `boolean`                  | Controls whether to include Email for sharing.                                    | `true`                                                |


**TOC Feature Configuration**

| Options           | Type                         | Description                                                                         | Example   |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------- | --------- |
| `minHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | Sets the minimum heading level. Must be less than or equal to `maxHeadingLevel`.    | `2`       |
| `maxHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | Sets the maximum heading level. Must be greater than or equal to `minHeadingLevel`. | `4`       |
| `displayPosition` | `'left' \| 'right'`          | Sets the position of TOC on the page (either on the left or right).                 | `'left'`  |
| `displayMode`     | `'always' \| 'hover'`        | Controls whether the TOC is always visible or only appears when hovering.           | `'hover'` |

**OG Image Feature Configuration**

| Options          | Type                                     | Description                                                                                                                                                                                                                                                                                                | Example              |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `authorOrBrand`  | `string`                                 | Defines your name or brand name that will be displayed on the OG image.                                                                                                                                                                                                                                    | `'Your name'`        |
| `fallbackTitle`  | `string`                                 | Sets the fallback title for OG images. Used when the `title` in the frontmatter is missing or invalid.                                                                                                                                                                                                     | `'Site Description'` |
| `fallbackBgType` | `'plum' \| 'dot' \| 'rose' \|'particle'` | Sets the fallback background for OG images. This value is only used for the fallback OG image and as the background when `bgType` is not specified. | `'plum'`             |


After making these changes, ensure the project runs smoothly in the browser before moving on to [Advanced Configuration](https://astro-antfustyle-theme.vercel.app/blog/advanced-configuration/). 🧗‍♂️
 