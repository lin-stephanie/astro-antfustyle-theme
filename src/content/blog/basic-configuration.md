---
title: Basic Configuration
description: How to configure Astro AntfuStyle Theme
pubDate: 2024-10-02
lastModDate: 2025-01-25
toc: true
share: true
ogImage: true
---

This post is an basic guide on how to configure the `src/config.ts` file. If you’ve already set it up or feel confident configuring it (a simple task with type hints appearing on hover), you can skip ahead to [Advanced Configuration](../advanced-configuration/).

## Configuring `SITE`

The `SITE` object is used to configure the basic information of your website, and its configuration options are as follows:


| Option       | Type                                      | Description                                                                                                                                                                                                                                                                                  | Example                                                                               |
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

| Option                          | Type                            | Description                                                                                                                                                                       |
| ------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`internalNavs`](#internalnav)  | `InternalNav[]`                 | Configures internal navigation links. The configuration order matches the display order.                                                                                          |
| [`socialLinks`](#sociallink)    | `SocialLink[]`                  | Configures external social links. The configuration order matches the display order.                                                                                              |
| [`NavBarLayout`](#navbarlayout) | `NavBarLayout`                  | Controls the layout of the navigation bar.                                                                                                                                        |
| `tabbedLayoutTabs`              | `false \| [Tab, Tab, ...Tab[]]` | Enables and configures for tabs within a tabbed layout. If your website does not use the `TabbedLayout`, you can set it to `false`. Otherwise, required before using this layout. |
| [`groupView`](#groupview)       | `GroupView`                     | Configures the `/projects` UIs.                                                                                                                                                   |
| [`githubView`](#githubview)     | `GitHubView`                    | Configures the `/releases` and `prs` UIs.                                                                                                                                         |
| [`externalLink`](#externallink) | `ExternalLink`                  | Configures external links' behavior and appearance.                                                                                                                               |

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

| Option        | Type                    | Description                                                                                                                                                | Example                                                                                                                                          |
| --------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `left`          | `NavBarComponentType[]` | Defines which components ('internalNavs', 'socialLinks', 'searchButton', 'themeButton', 'rssLink') are positioned on the left side of the navigation bar.  | `[]` (If you want all components to appear on the right side, leave this array empty)                                                            |
| `right`         | `NavBarComponentType[]` | Defines which components ('internalNavs', 'socialLinks', 'searchButton', 'themeButton', 'rssLink') are positioned on the right side of the navigation bar. | `['internalNavs', 'socialLinks', 'searchButton', themeButton', 'rssLink']` (Components in `left` and `right` arrays must not contain duplicates) |
| `mergeOnMobile` | `boolean`               | Controls whether the 'internalNavs' and 'socialLinks' section are combined into a single navigation menu on mobile, managed through a hamburger icon.      | `true`                                                                                                                                           |

### `groupView`

| Option                    | Type      | Description                                                                                                                                                  | Example |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `maxGroupColumns`           | `2 \| 3`  | Sets the maximum number of columns displayed in the group view.                                                                                              | `3`     |
| `showGroupItemColorOnHover` | `boolean` | Determines whether group item icons display in color when hovered over. If `true`, the icon for the group item will display in its original colors on hover. | `true`  |

### `githubView`

<div class='overflow-x-auto'>

| Option            | Type                                       | Description                                                                                                                                | Example                                                                                                |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `monorepos`         | `${string}/${string}[]`                    | Defines monorepo repositories using `<owner>/<repo>` format. For monorepos, the tag name is used as the primary text for `/releases` page. | `['withastro/astro']` (If you want all components to appear on the right side, leave this array empty) |
| `mainLogoOverrides` | `[RepoWithOwner \| RegExp, Url \| Icon][]` | Configures main logos for repositories or packages (for monorepos). Defaults to the owner's avatar if no custom logo is set.               | `[/starlight/, 'https://starlight.astro.build/favicon.svg']` (Prioritized by order)                    |
| `subLogoMatches`    | `[RepoWithOwner \| RegExp, Url \| Icon][]` | Configures auxiliary logos for rrepositories or packages (for monorepos). No logo is shown if unmatched.                                   | `[/tweet/, 'i-logos-twitter']`  (Prioritized by order)                                                 |

</div>

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

### `toc`

| Option           | Type                         | Description                                                                         | Example   |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------- | --------- |
| `minHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | Sets the minimum heading level. Must be less than or equal to `maxHeadingLevel`.    | `2`       |
| `maxHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | Sets the maximum heading level. Must be greater than or equal to `minHeadingLevel`. | `4`       |
| `displayPosition` | `'left' \| 'right'`          | Sets the position of TOC on the page (either on the left or right).                 | `'left'`  |
| `displayMode`     | `'always' \| 'hover'`        | Controls whether the TOC is always visible or only appears when hovering.           | `'hover'` |

### `ogImage`

| Option          | Type                                     | Description                                                                                                                                         | Example              |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `authorOrBrand`  | `string`                                 | Defines your name or brand name that will be displayed on the OG image.                                                                             | `'Your name'`        |
| `fallbackTitle`  | `string`                                 | Sets the fallback title for OG images. Used when the `title` in the frontmatter is missing or invalid.                                              | `'Site Description'` |
| `fallbackBgType` | `'plum' \| 'dot' \| 'rose' \|'particle'` | Sets the fallback background for OG images. This value is only used for the fallback OG image and as the background when `bgType` is not specified. | `'plum'`             |

### `slideEnterAnim`

| Option          | Type                                     | Description                                                                                                                                         | Example              |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `enterStep`      | `number`                                 | Adjusts the animation speed (ms). Smaller values speed up; larger values slow down.                                                                 | `60`                 |

After making these changes, ensure the project runs smoothly in the browser before moving on to [Advanced Configuration](../advanced-configuration/). 🧗‍♂️
 