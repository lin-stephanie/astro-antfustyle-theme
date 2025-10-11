---
title: Basic Configuration
description: How to configure Astro AntfuStyle Theme
pubDate: 2024-10-02
lastModDate: 2025-10-12
ogImage: true
toc: true
share: true
giscus: true
search: true
---

This post is an basic guide on how to configure the `src/config.ts` file. If you’ve already set it up or feel confident configuring it (a simple task with type hints appearing on hover), you can skip ahead to [Advanced Configuration](../advanced-configuration/).

## Configuring `SITE`

The `SITE` object is used to configure the basic information of your website, and its configuration options are as follows:

| Option         | Type                                      | Description                                                                                                                                                                                                                                                                                  | Example                                                                               |
| -------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `website`      | `http://${string}` \| `https://${string}` | Specifies the final deployed URL, which must start with `http://` or `https://`. It will be passed to the [`site`](https://docs.astro.build/en/reference/configuration-reference/#site) config in Astro,<br>used for generating canonical URLs, `rss.xml` and other features.                | `'https://example.com'`, `'https://example.com/base'`                                                               |
| `base`         | `/${string}`                              | Specifies the base path for your site, which must start with `/`. It wiil be passed to the [`base`](https://docs.astro.build/en/reference/configuration-reference/#base) config in Astro, used when deploying to a subdirectory.                                                             | `/base`, `/base/` (for a site deployed to `https://example.com/base`)                   |
| `title`        | `string`                                  | Specifies the site name for formatting the `title` in the frontmatter as `<pageTitle> - <siteTitle>`.                                                                                                                                                                                        | `Maybe Use Your Name`                                                                 |
| `description`  | `string`                                  | Specifies the default content for meta tags.                                                                                                                                                                                                                                                 | `Introduce yourself`                                                                  |
| `author`       | `string`                                  | Specifies your name for meta tags.                                                                                                                                                                                                                                                           | `Your Name`                                                                           |
| `lang`         | `string`                                  | Specifies the primary language of the document content. It must be a single 'language tag' in the format defined in [RFC 5646: Tags for Identifying Languages ](https://datatracker.ietf.org/doc/html/rfc5646#appendix-A) (also known as BCP 47).                                            | `'zh-Hant'` (Chinese written using the Traditional Chinese script)<br>`'fr'` (French) |
| `ogLocale`     | `string`                                  | Specifies the page content's language and region for better content display on social platforms. It must be in `language_TERRITORY` format, which you can find in [Language-Territory Information](https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html). | `'zh_CN'`<br>`'fr_FR'`                                                                |
| `imageDomains` | `string[]`                                | Specifies the allowed domains for **remote** image optimization, including those used with `![]()` and the `<Image />` or `<Picture />` components. This is passed to the [`image.domains`](https://docs.astro.build/en/reference/configuration-reference/#imagedomains) config in Astro. Set to `[]` if remote optimization is not needed.                                     | `['astro.build']`                                                                     |

> [!important]- Ensure `SITE.website` is edited before deploying
>
> During development, leaving `SITE.website` empty is fine. But in production, you must set your deployed URL in this option for SEO-related elements like canonical URLs and social card URLs.

> [!tip]- Set the `SITE.imageDomains` option to enable [optimization](https://docs.astro.build/en/guides/images/#remote-images) and [responsive behavior](https://docs.astro.build/en/guides/images/#responsive-image-behavior) for **remote images**
>   
> This applies to remote images in Markdown (`![]()`), as well as in `<Image />` and `<Picture />` components.
> 
> See the [official example](https://docs.astro.build/en/guides/images/#image-) to understand how Astro optimizes images.
> 
> Related: [Remote image optimization in Markdown](https://astro.build/blog/astro-540/#remote-image-optimization-in-markdown), [Authorizing remote images](https://docs.astro.build/en/guides/images/#authorizing-remote-images)

## Configuring `UI`

The `UI` object allows you to configure navigation, social links, page views, and more. Its configuration options are as follows:

| Option                          | Type                            | Description                                                                                                                                                                                |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`internalNavs`](#internalnav)  | `InternalNav[]`                 | Configures internal navigation links. The configuration order matches the display order.                                                                                                   |
| [`socialLinks`](#sociallink)    | `SocialLink[]`                  | Configures external social links. The configuration order matches the display order.                                                                                                       |
| [`navBarLayout`](#navbarlayout) | `NavBarLayout`                  | Controls the layout of the navigation bar.                                                                                                                                                 |
| `tabbedLayoutTabs`              | `false \| [Tab, Tab, ...Tab[]]` | Enables and configures for tabs within a tabbed layout. If your website does not use the `TabbedLayout`, you can set it to `false`. Otherwise, required before using this layout.          |
| [`groupView`](#groupview)       | `GroupView`                     | Configures the `/projects` UIs.                                                                                                                                                            |
| [`githubView`](#githubview)     | `GitHubView`                    | Configures the `/releases` and `prs` UIs.                                                                                                                                                  |
| [`externalLink`](#externallink) | `ExternalLink`                  | Configures external links' behavior and appearance.                                                                                                                                        |
| `postMetaStyle`                 | `'minimal' \| 'icon'`           | Controls the display style of post metadata (creation date, read time, modified date). On mobile devices, the modified date (if present) is hidden. |


### `internalNav`

| Option      | Type                                                                                                           | Description                                                                                                                                            | Example                                                                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`        | `/${string}`                                                                                                   | Specifies the navigation path. It must start with `/`.                                                                                                 | `'/blog'`、`'/blog/'`                                                                                                                                                                                                                                             |
| `title`       | `string`                                                                                                       | Sets the content displayed on hover for accessibility.                                                                                                 | `'Blog'`                                                                                                                                                                                                                                                         |
| `displayMode` | `'alwaysText'` \| `'alwaysIcon'` \| `'textHiddenOnMobile'` \| `'iconHiddenOnMobile'` \| `'textToIconOnMobile'` | Defines how the navigation item is displayed responsively. Different modes control the visibility of text or icon depending on the viewport size.      | `'textToIconOnMobile'`                                                                                                                                                                                                                                           |
| `text`        | `string`                                                                                                       | Sets the text displayed for the navigation item. Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`, and `'textToIconOnMobile'`. | `'Blog'`                                                                                                                                                                                                                                                         |
| `icon`        | `Icon`                                                                                                         | Sets the icon displayed for the navigation item. Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`, and `'textToIconOnMobile'`. | `'i-ri-article-line'`<br>（The icon format follows the `i-<collection>-<icon>` or `i-<collection>:<icon>` format as per [UnoCSS specs](https://unocss.dev/presets/icons). See [Icon Usage](../faqs-and-known-issues/#icon-usage) for details on setting up icons） |

### `socialLink`

| Option      | Type                                                                                                           | Description                                                                                                                                        | Example                                                                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `link`        | ``http://${string}` \| `https://${string}``                                                                    | Set the URL to the social platform.                                                                                                                | `'https://x.com/astrodotbuild'`                                                                                                                                                                                                                                  |
| `title`       | `string`                                                                                                       | Sets the content displayed on hover for accessibility.                                                                                             | `Follow ${SITE.author} on Twitter`                                                                                                                                                                                                                               |
| `displayMode` | `'alwaysText'` \| `'alwaysIcon'` \| `'textHiddenOnMobile'` \| `'iconHiddenOnMobile'` \| `'textToIconOnMobile'` | Defines how the social item is displayed responsively. Different modes control the visibility of text or icon depending on the viewport size.      | `'alwaysIcon'`                                                                                                                                                                                                                                                   |
| `text`        | `string`                                                                                                       | Sets the text displayed for the social item. Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`, and `'textToIconOnMobile'`. | `'GitHub'`                                                                                                                                                                                                                                                       |
| `icon`        | `Icon`                                                                                                         | Sets the icon displayed for the social item. Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`, and `'textToIconOnMobile'`. | `'i-ri-article-line'`<br>（The icon format follows the `i-<collection>-<icon>` or `i-<collection>:<icon>` format as per [UnoCSS specs](https://unocss.dev/presets/icons). See [Icon Usage](../faqs-and-known-issues/#icon-usage) for details on setting up icons） |

### `navBarLayout`

| Option          | Type                    | Description                                                                                                                                                      | Example                                                                                                                                                                                      |
| --------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `left`          | `NavBarComponentType[]` | Defines which components ('internalNavs', 'socialLinks', 'searchButton', 'themeButton', 'rssLink', 'hr') are positioned on the left side of the navigation bar.  | `[]` (Leave empty to place all components on the right)                                                                                                                                      |
| `right`         | `NavBarComponentType[]` | Defines which components ('internalNavs', 'socialLinks', 'searchButton', 'themeButton', 'rssLink', 'hr') are positioned on the right side of the navigation bar. | `['internalNavs', 'hr', 'socialLinks', 'hr', 'searchButton', themeButton', 'rssLink']` (No duplicates allowed between `left` and `right`; use `'hr'` to insert a divider between components) |
| `mergeOnMobile` | `boolean`               | Controls whether the 'internalNavs' and 'socialLinks' section are combined into a single navigation menu on mobile, managed through a hamburger icon.            | `true`                                                                                                                                                                                       |

### `groupView`

| Option                    | Type      | Description                                                                                                                                                  | Example |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `maxGroupColumns`           | `2 \| 3`  | Sets the maximum number of columns displayed in the group view.                                                                                              | `3`     |
| `showGroupItemColorOnHover` | `boolean` | Determines whether group item icons display in color when hovered over. If `true`, the icon for the group item will display in its original colors on hover. | `true`  |

### `githubView`

| Option            | Type                                       | Description                                                                                                                                | Example                                                                                                |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `monorepos`         | `${string}/${string}[]`                    | Defines monorepo repositories using `<owner>/<repo>` format. For monorepos, the tag name is used as the primary text for `/releases` page. | `['withastro/astro']` (If you want all components to appear on the right side, leave this array empty) |
| `mainLogoOverrides` | `[RepoWithOwner \| RegExp, Url \| Icon][]` | Configures main logos for repositories or packages (for monorepos). Defaults to the owner's avatar if no custom logo is set.               | `[/starlight/, 'https://starlight.astro.build/favicon.svg']` (Prioritized by order)                    |
| `subLogoMatches`    | `[RepoWithOwner \| RegExp, Url \| Icon][]` | Configures auxiliary logos for rrepositories or packages (for monorepos). No logo is shown if unmatched.                                   | `[/tweet/, 'i-logos-twitter']`  (Prioritized by order)                                                 |

### `externalLink`

See [#15](https://github.com/lin-stephanie/astro-antfustyle-theme/pull/15) for configuration details.

| Option           | Type      | Description                                                                     | Example                                                                                                                                                                                                                                                                                    |
| ---------------- | --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `newTab`         | `boolean` | Controls whether external links are opened in a new tab.                        | `true`                                                                                                                                                                                                                                                                                     |
| `cursorType`     | `string`  | Specifies the cursor type for external links when `newTab` is `true`.           | `'url("/images/new-tab.svg") 10 10, pointer'` (Accepts [standard keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#keyword), [custom URLs](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#url), or an empty string, defaulting to 'pointer' like internal links.) |
| `showNewTabIcon` | `boolean` | Controls whether to add an indicator to external links when `newTab` is `true`. | `true`                                                                                                                                                                                                                                                                                     |

## Configuring `FEATURES`

The `FEATURES` object globally controls the activation and configuration of special features. Each feature can be managed as follows:

- Set to `false` or `[false, {...}]` to disable the feature.
- Set to `[true, {...}]` to enable the feature and configure its options.

### `slideEnterAnim`

| Option          | Type                                     | Description                                                                                                                                         | Example              |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `enterStep`      | `number`                                 | Adjusts the animation speed (ms). Smaller values speed up; larger values slow down.                                                                 | `60`                 |

### `ogImage`

| Option          | Type                                     | Description                                                                                                                                         | Example              |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `authorOrBrand`  | `string`                                 | Defines your name or brand name that will be displayed on the OG image.                                                                             | `'Your name'`        |
| `fallbackTitle`  | `string`                                 | Sets the fallback title for OG images. Used when the `title` in the frontmatter is missing or invalid.                                              | `'Site Description'` |
| `fallbackBgType` | `'plum' \| 'dot' \| 'rose' \|'particle'` | Sets the fallback background for OG images. This value is only used for the fallback OG image and as the background when `bgType` is not specified. | `'plum'`             |

### `toc`

| Option            | Type                                 | Description                                                                                                                                                                                                          | Example     |
| ----------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `minHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6`         | Sets the minimum heading level. Must be less than or equal to `maxHeadingLevel`.                                                                                                                                     | `2`         |
| `maxHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6`         | Sets the maximum heading level. Must be greater than or equal to `minHeadingLevel`.                                                                                                                                  | `4`         |
| `displayPosition` | `'left' \| 'right'`                  | Sets the position of TOC on the page (either on the left or right).                                                                                                                                                  | `'left'`    |
| `displayMode`     | `'always' \| 'content'` \| `'hover'` | Controls how the page TOC is displayed. Allowed values:<br>`'always'`: always visible.<br>`'content'`: when hovering over the content area (element with class 'prose').<br>`'hover'`: only when hovering over the TOC itself. | `'content'` |

### `share`

| Option                         | Type                       | Description                                                                       | Example                          |
| ------------------------------ | -------------------------- | --------------------------------------------------------------------------------- | -------------------------------- |
| `twitter`                      | `FeatureConfig<Mentioned>` | Configures Twitter sharing. If enabled, adds a mention to the specified username. | `[true, '@userName']`            |
| `bluesky`                      | `FeatureConfig<Mentioned>` | Configures Bluesky sharing. If enabled, adds a mention to the specified username. | `[true, '@handle']`              |
| `mastodon`                     | `FeatureConfig<Mentioned>` | Configures Mastodon sharing. If enabled, adds a mention to the specified user.    | `[true, '@userName@serverName']` |
| `facebook`<br><br><br><br><br> | `boolean`                  | Controls whether to include Facebook for sharing.                                 | `true`                           |
| `pinterest`                    | `boolean`                  | Controls whether to include Pinterest for sharing.                                | `true`                           |
| `reddit`                       | `boolean`                  | Controls whether to include Reddit for sharing.                                   | `true`                           |
| `telegram`                     | `boolean`                  | Controls whether to include Telegram for sharing.                                 | `true`                           |
| `whatsapp`                     | `boolean`                  | Controls whether to include WhatsApp for sharing.                                 | `true`                           |
| `email`                        | `boolean`                  | Controls whether to include Email for sharing.                                    | `true`                           |

### `giscus`

Refer to [Configure Giscus Comments](../advanced-configuration/#configure-giscus-comments) for additional details.

| Option                                 | Type                  | Description                                     | Example                                  |
| -------------------------------------- | --------------------- | ----------------------------------------------- | ---------------------------------------- |
| `data-repo`                            | `${string}/${string}` | GitHub repository in the format `owner/repo`.   | `'lin-stephanie/astro-antfustyle-theme'` |
| `data-repo-id`                         | `string`              | Unique ID of the GitHub repository.             | `'R_kgDOLylKbA'`                         |
| `data-category`                        | `string`              | Discussion category name.                       | `'Giscus'`                               |
| `data-category-id`<br><br><br><br><br> | `string`              | Unique ID of the discussion category.           | `'DIC_kwDOLylKbM4Cpugn'`                 |
| `data-mapping`                         | `string`              | Mapping between pages and discussions.          | `'title'`                                |
| `data-strict`                          | `boolean`             | Enable strict mapping (1 = true, 0 = false).    | `0`                                      |
| `reddit`                               | `boolean`             | Enable reactions (1 = true, 0 = false).         | `1`                                      |
| `data-emit-metadata`                   | `boolean`             | Emit discussion metadata (1 = true, 0 = false). | `0`                                      |
| `data-input-position`                  | `'top' \| 'bottom'`   | Position of the comment input box.              | `'bottom'`                               |
| `data-lang`                            | `string`              | Language for the Giscus widget UI.              | `'en'`                                   |

### `search`

| Option            | Type                    | Description                                                                                         | Example                 |
| ----------------- | ----------------------- | --------------------------------------------------------------------------------------------------- | ----------------------- |
| `includes`        | `string[]`              | Specify which content collections rendered by `RenderPost.astro` are indexed.                       | `["blog", "changelog"]` |
| `filter`          | `boolean`               | Enables filtering by collection. Shows tabs per collection; if disabled, searches all together.     | `true`                  |
| `navHighlight`    | `boolean`               | Enables Pagefind’s highlight on the target page after navigation.                                   | `true`                  |
| `batchLoadSize`   | `FeatureConfig<number>` | Controls batch loading. `false` or `[false, N]` loads all; `[true, N]` loads in batches of N pages. | `[true, 3]`             |
| `maxItemsPerPage` | `FeatureConfig<number>` | Limits shown matches per result. `false` or `[false, N]` shows all; `[true, N]` limits to N items.  | `[true, 5]`             |

After making these changes, ensure the project runs smoothly in the browser before moving on to [Advanced Configuration](../advanced-configuration/). 🧗‍♂️
 
:::details
::summary[Changelog]
2025-03-31
- Update: `navBarLayout.left`, `navBarLayout.right` and `toc.displayMode`

2025-04-30
- New: `SITE.imageDomains`

2025-05-20
- New: `UI.postMetaStyle` and `FEATURES.giscus`

2025-07-16
- Update: Set the `SITE.imageDomains` option to enable optimization and responsive behavior for remote images

2025-10-12
- Update: Add `search` configuration

[View full history](https://github.com/lin-stephanie/astro-antfustyle-theme/commits/main/src/content/blog/basic-configuration.md)
:::
