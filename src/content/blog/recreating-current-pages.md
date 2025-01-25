---
title: Recreating Current Pages
description: How to edit existing pages in Astro AntfuStyle Theme
pubDate: 2023-12-03
lastModDate: 2024-12-27
toc: true
share: true
ogImage: true
---

In the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme), you can customize the `/`, `/projects`, `/changelog`, `/streams`, `/feeds`, and `404` pages. This post also covers creating or removing pages. For `/releases` and `/prs`, see [Customizing GitHub Activity Pages](../customizing-github-activity-pages/).

## Creating Pages

In [Project Structure](../project-structure/), it is mentioned that the theme’s organizational strategy is to store all substantive content in the `src/content` directory, while the `src/pages` directory uses `.mdx` files to assemble content into structured, styled layouts.

Open any `.mdx` file in `src/pages`, and you'll notice a similar structure: YAML frontmatter + imported Astro components + JSX with layout components nesting view components.

The theme defined all `.mdx` files in `src/pages/` belong to the `pages` content collection. This is enabled by [Astro’s Content Layer API](https://astro.build/blog/astro-4140/#experimental-content-layer-api), introduced in Astro 4.14, allowing content to exist outside `src/content/`. 

The frontmatter fields for `pages` content collection are defined by `schema: pageSchema`in `src/content/schema.ts` as follows:

| Property | Type (default)                                                                          | Description                                                                                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`               | `string` (`''`)                                                                         | Sets the page title, formatted with `SITE.title` as `<pageTitle> - <siteTitle>` for metadata and automatic OG image generation. If undefined or empty, only `<siteTitle>` is displayed, and OG image generation is skipped.                      |
| `subtitle`            | `string` (`''`)                                                                         | Provides a page subtitle. If provided, it will be displayed below the title. If not needed, leave the field as an empty string or delete it.                                                                                                     |
| `description`         | `string` (`''`)                                                                         | Provides a brief description, used in meta tags for SEO and sharing purposes. If not needed, leave the field as an empty string or delete it, and the `SITE.description` will be used directly.                                                  |
| `bgType`              | `z.union([z.literal(false), z.enum(['plum', 'dot', 'rose', 'particle'])])`<br>(`false`) | Specifies whether to apply a background on this page and select its type. If not needed, delete the field or set to `false`.                                                                                                                     |
| `toc`                 | `boolean` (`false`)                                                                     | Controls whether the table of contents (TOC) is generated for the page.                                                                                                                                                                          |
| `ogImage`             | `z.union([z.string(), z.boolean()])`<br>(`true`)                                        | Specifies the Open Graph (OG) image for social media sharing. To auto-generate OG image, delete the field or set to `true`. To disable it, set the field to `false`. To use a custom image, provide the full filename from `/public/og-images/`. |

The theme includes a VS Code snippet for auto-generating this frontmatter (located in `.vscode/astro-antfustyle-theme.code-snippets`). Type `pageFrontmatter` and press `tab` to insert it (tab completion is enabled in `.vscode/settings.json`).

These properties can be easily passed to layout and view components. If you need to modify anything, you only need to adjust the frontmatter.

By creating pages this way, you can manage metadata and control features across pages efficiently, making it easy to expand and maintain your site.

> [!tip]- Tips for Creating a New Page
> 
> To create a new page, first review the layout components (`src/layouts/`) and view components (`src/components/views/`) in the theme. Ensure you understand their usage, including required props, and preview the rendering in the browser to select the most appropriate layout and view.
> 
> Import the `BaseLayout` component in every page and wrap it around your JSX.
> 
> When using the `RenderPost` component, ensure that `collectionType` and `slug` correspond to a directory and file in `src/content/` (excluding the extension).

## Updating Pages

### Homepage and `404` Page

To update the homepage, open `src/content/home/index.md` and start writing the content you want to present.

To update the 404 page, you can directly edit `src/pages/404.mdx`.

> [!important]- No Frontmatter Needed for the `home` content collection
> 
> Since the `home` content collection doesn't have a defined frontmatter type in `src/content/config.ts`, you don't need to write any frontmatter. Just focus on the main content, and it should work fine.

### `/projects` Page

Open `src/content/projects/data.json`, delete the existing content, and use the following as a base:

```json title='src/content/projects/data.json'
{
  "$schema": "../../../.astro/collections/projects.schema.json",
  "projects": {
    "Classification of Projects I": [
      // your projects
    ]
  }
}
```

The `projects` field type is `Record<string, projectSchema[]>`. `projectSchema` is defined as follows:

| Property (* required) | Type     | Description                                                                                                                            |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `name`*               | `string` | Name of the project to be displayed.                                                                                                   |
| `link`*               | `string` | URL linking to the project page or repository.                                                                                         |
| `desc`*               | `string` | A brief description summarizing the project.                                                                                           |
| `icon`*               | `Icon`   | Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>` as per [UnoCSS](https://unocss.dev/presets/icons) specs. |


The theme also includes a code snippet for generating `projectSchema`. Type `projectData` to trigger it, then use `tab` to modify the values.

Finally, update the frontmatter in `src/pages/projects.mdx`.

### `/changelog` Page

To recreate the `/changelog` page, please follow the [Adding New Posts](../adding-new-posts/). The content for the `/changelog` page, stored in the `src/content/changelog/` directory, belongs to the `changelog` content collection. This collection also uses `schema: postSchema` for frontmatter types.

### `/streams` Page

Similarly to adding projects,  open `src/content/streams/data.json`, delete the existing content, and use the following as a base:

```json title='src/content/streams/data.json'
{
  "$schema": "../../../.astro/collections/streams.schema.json",
  "streams": [
     // your streams
  ]
}
```

The `streams` field type is `streamSchema[]`. `streamSchema` is defined as follows:

| Property (* required) | Type      | Description                                                                                                                                                         |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`*           | `string`  | Sets the stream title.                                                                                                                                              |
| `pubDate`*         | `date`    | Specifies the publication date. See supported formats [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples). |
| `link`*           | `string`  | Specifies the URL link to the stream.                                                                                                                               |
| `radio`            | `boolean` | Indicates whether the stream is a radio broadcast. If `true`, an icon will be added to the stream item in the list.                                                 |
| `video`            | `boolean` | Indicates whether the stream is a video broadcast. If `true`, an icon will be added to the stream item in the list.                                                 |
| `platform`         | `string`  | Specifies the platform where the stream is published.                                                                                                               |

As with `projectSchema`, you can use a code snippet to generate `streamSchema` by typing `streamData`. 

Finally, update the frontmatter in `src/pages/streams.mdx`.

> [!note]- Auto-Generated Schema Files
>
> `projects.schema.json` and `streams.schema.json` are auto-generated by Astro 4.13.0, offering autocompletion, validation, and other useful features in your editor. [Learn more](https://v4.docs.astro.build/en/guides/content-collections/#enabling-json-schema-generation). 

### `/feeds` Page

The `/feeds` page displays content fetched via [@ascorbic/feed-loader](https://www.npmjs.com/package/@ascorbic/feed-loader). You can define an external data source (like RSS, RDF, or Atom feeds) for the `feeds` collection using the following:

```ts title='src/content/config.ts'
import { feedLoader } from '@ascorbic/feed-loader'

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})
```

> [!tip]- Utilizing Astro Loaders for Feed Integration
> 
> `feedLoader` is [Astro loaders](https://docs.astro.build/en/reference/content-loader-reference/#what-is-a-loader) built with the Content Loader API, enabling data fetching from various sources as content collections. This API, introduced in [Astro 4.14](https://astro.build/blog/astro-4140/#experimental-content-layer-api), became stable in [Astro 5](https://astro.build/blog/astro-5/#content-layer).

## Removing Pages

Using remove the `/changelog` page as an example:

- Delete `src/pages/changelog.mdx`.
- Delete `src/content/changelog` directory.
- Update `src/content/config.ts` and `src/config.ts`:

```ts title='src/content/config.ts' del={8-11} del='changelog,'

import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { feedLoader } from '@ascorbic/feed-loader'
import { pageSchema, postSchema, projectsSchema, streamsSchema } from './schema'

// Define other collections...

const changelog = defineCollection({
  type: 'content',
  schema: postSchema,
})

// Define other collections...

export const collections = { pages, blog, projects, changelog, streams, feeds }
```

```ts title='src/config.ts' del={4-9,13}
export const UI: Ui = {
  internalNavs: [
    ...
    {
      path: '/changelog',
      title: 'Changelog',
      displayMode: 'iconHiddenOnMobile',
      icon: 'i-ri-draft-line',
    },
  ],
  ...
  tabbedLayoutTabs: [
    { title: 'Changelog', path: '/changelog' },
    { title: 'AstroBlog', path: '/feeds' },
    { title: 'AstroStreams', path: '/streams' },
  ],
  ...
}
```

## Wrapping Up

That's all about customizing pages in this theme. Thanks for reading! 

If you encounter any issues, find errors, or see opportunities for improvement, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated! ❤️
