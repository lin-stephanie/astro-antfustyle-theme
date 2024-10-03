---
title: Basic Configuration
description: How to configure Astro AntfuStyle Theme
pubDate: 2024-10-02
lastModDate: ''
toc: true
share: true
ogImage: true
---

This post is an basic guide on how to configure the `src/config.ts` file. If you’ve already set it up or feel confident configuring it (a simple task with type hints appearing on hover), you can skip ahead to ==Advanced Configuration==.

## Configuring `SITE`

The `SITE` object is used to configure the basic information of your website, and its configuration options are as follows:

| Options       | Type                                      | Description                                                                                                                                                                                                                                                                                  | Example                                                                           |
| ------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `website`     | `http://${string}` \| `https://${string}` | Specifies the final deployed URL, which must start with `http://` or `https://`. It will be passed to the [`site`](https://docs.astro.build/en/reference/configuration-reference/#site) config in Astro,<br>used for generating canonical URLs, `rss.xml` and other features.                | `'https://example.com'`                                                           |
| `base`        | `/${string}`                              | Specifies the base path for your site, which must start with `/`. It wiil be passed to the [`base`](https://docs.astro.build/en/reference/configuration-reference/#base) config in Astro, used when deploying to a subdirectory.                                                             | `/my-site/` (for a site deployed to `https://example.com/my-site/`)               |
| `title`       | `string`                                  | Specifies the site name for formatting the `title` in the frontmatter as `<pageTitle> - <siteTitle>`.                                                                                                                                                                                        |                                                                                   |
| `description` | `string`                                  | Specifies the default content for meta tags.                                                                                                                                                                                                                                                 |                                                                                   |
| `author`      | `string`                                  | Specifies your name for meta tags.                                                                                                                                                                                                                                                           |                                                                                   |
| `lang`        | `string`                                  | Specifies the primary language of the document content. It must be a single 'language tag' in the format defined in [RFC 5646: Tags for Identifying Languages ](https://datatracker.ietf.org/doc/html/rfc5646#appendix-A) (also known as BCP 47).                                            | `zh-Hant` (Chinese written using the Traditional Chinese script)<br>`fr` (French) |
| `ogLocale`    | `string`                                  | Specifies the page content's language and region for better content display on social platforms. It must be in `language_TERRITORY` format, which you can find in [Language-Territory Information](https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html). | `'zh_CN'`<br>`'fr_FR'`                                                            |


> [!important]- Ensure `SITE.website` is edited before deploying!
>
> During development, leaving `SITE.website` empty is fine. But in production, you must set your deployed URL in this option for SEO-related elements like canonical URLs and social card URLs.

## Configuring `UI`

The `UI` object allows you to configure navigation, social links, page views, and more. Its configuration options are as follows:

| Options | Type | Description | Example |
| ------- | ---- | ----------- | ------- |
|         |      |             |         |
|         |      |             |         |

==（[示意图](https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/) 放在表格示例中）==

## Configuring `FEATURES`

The `FEATURES` object globally controls feature activation and configures options for each feature as follows:

| Features | Options | Type | Description | Example |
| -------- | ------- | ---- | ----------- | ------- |
|          |         |      |             |         |
|          |         |      |             |         |

After making these changes, ensure the project runs smoothly in the browser before moving on to ==Advanced Configuration==.

> More customizable options will be added in future updates—stay tuned! 

