---
title: Recreating Current Pages
description: How to edit existing pages in Astro AntfuStyle Theme
pubDate: 2023-12-03
lastModDate: 2025-03-31
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

### [Homepage](../../)

To update the homepage, open `src/content/home/index.md` and start writing the content you want to present.

> [!important]- No Frontmatter Needed for the `home` content collection
> 
> Since the `home` content collection doesn't have a defined frontmatter type in `src/content/config.ts`, you don't need to write any frontmatter. Just focus on the main content, and it should work fine.

### [`/projects`](../../projects) Page

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

### [`/changelog`](../../changelog) Page

To recreate the `/changelog` page, please follow the [Adding New Posts](../adding-new-posts/). The content for the `/changelog` page, stored in the `src/content/changelog/` directory, belongs to the `changelog` content collection. This collection also uses `schema: postSchema` for frontmatter types.

### [`/streams`](../../streams) Page

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

### [`/feeds`](../../feeds) Page

The `/feeds` page displays content retrieved via :link[@ascorbic/feed-loader]{id=https://www.npmjs.com/package/@ascorbic/feed-loader}. You can define an external data source (like RSS, RDF, or Atom feeds) for the `feeds` collection using the following:

```ts title='src/content/config.ts' {5}
import { feedLoader } from '@ascorbic/feed-loader'

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})
```

> [!tip]- Use Astro Loaders to Gather External Data  
>  
> The `feedLoader` on this page and the `blueskyPostsLoader` on the `/highlights` page (explained below) are both [Astro loaders](https://docs.astro.build/en/reference/content-loader-reference/#what-is-a-loader). Built with the Content Loader API, Astro loaders enable seamless data fetching from various sources as content collections. This API was first introduced in [Astro 4.14](https://astro.build/blog/astro-4140/#experimental-content-layer-api) and became stable in [Astro 5](https://astro.build/blog/astro-5/#content-layer).

### [`/highlights`](../../highlights) Page

Similar to the `/feeds` page, the `/highlights` page displays content retrieved via :link[astro-loader-bluesky-posts]{id=https://www.npmjs.com/package/astro-loader-bluesky-posts}. You can reconfigure it in `src/content/config.ts` by referring to the loader's README, specifying the Bluesky posts to fetch:

```ts title='src/content/config.ts' {5-14}
import { blueskyPostsLoader } from 'astro-loader-bluesky-posts'

const highlights = defineCollection({
  loader: blueskyPostsLoader({
    uris: [
      'https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l'
      // 'https://bsky.app/profile/did:plc:z72i7hdynmk6r22z27h6tvur/post/3l6oveex3ii2l'
      // 'at://bsky.app/app.bsky.feed.post/3l6oveex3ii2l'
      // 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3l6oveex3ii2l'
    ],
    newlineHandling: 'paragraph',
    fetchThread: true,
    threadDepth: 4,
    fetchOnlyAuthorReplies: true,
  }),
})
```

Of course, if you prefer to fetch data locally for display, you can follow these steps:

**Step 1: Define the Zod schema for the `highlights` collection**

```ts title='src/content/schema.ts'
// Define the schema based on `CardItemData` in `src/components/views/CardItem.astro`
// Include only necessary properties. 
// Exclude `html` and `text`, as content is written in Markdown rather than frontmatter.

export const highlightSchema = z.object({
  date: z.coerce.date(),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    )
    .optional(),
  video: z
    .object({
      src: z.string(),
      alt: z.string(),
      thumbnail: z.string(),
    })
    .optional(),
  external: z
    .object({
      uri: z.string(),
      title: z.string(),
      description: z.string(),
      thumb: z.string(),
    })
    .optional(),
})
```

**Step 2: Redefine the `highlights` collection**

```ts title='src/content/config.ts' del={10-19} ins={6,20-21}
import {
  pageSchema,
  postSchema,
  projectsSchema,
  streamsSchema,
  highlightSchema,
} from './schema'

const highlights = defineCollection({
  loader: blueskyPostsLoader({
    uris: [
      'at://astro.build/app.bsky.feed.post/3lifesehhok27',
      ...
    ],
    newlineHandling: 'paragraph',
    fetchThread: true,
    threadDepth: 4,
    fetchOnlyAuthorReplies: true,
  }),
  type: 'content',
  schema: highlightSchema,
})
```

**Step 3: Update `CardView` logic**

```astro title='src/components/views/CardView.astro' del={4-8,23-25} ins={9-11,26-33}
---
if (collectionType === 'highlights') {
  const highlights = await getCollection(collectionType)
  dataForMasonry = processBlueskyPosts(highlights).sort((a, b) =>
    !a.date || !b.date
      ? 0
      : new Date(b.date).valueOf() - new Date(a.date).valueOf()
  )
  dataForMasonry = highlights.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  )
}
---

{
  mode === 'masonry' && (
    <responsive-masonry
      class="block relative w-full min-h-screen op-0 op-transition-500"
      data-gap={gap}
      data-min-card-width={minCardWidth}
      data-max-card-width={maxCardWidth}
    >
      {dataForMasonry.map((item) => (
        <CardItem class="card-masonry absolute top-0 left-0" item={item} />
      ))}
      {dataForMasonry.map(async (item) => {
        const { Content } = await render(item)
        return (
          <CardItem class="card-masonry absolute top-0 left-0" item={item.data}>
            <Content />
          </CardItem>
        )
      })}
    </responsive-masonry>
  )
}
```

**Step 4: Create the `content/highlights/` to store content**

```md title='src/content/highlights/2025-03-01.md'
---
date: 2025-03-01
images:
  - src: "https://example.com/remote-image.jpg"
    alt: "Example Image 1"
  - src: "/src/assets/local-image.png"
    alt: "Example Image 2"
  - src: "/src/assets/highlights/local-image.webp"
    alt: "Example Image 3"
---

This is a sample highlight entry for the `/highlights` page.
...

```

```md title='src/content/highlights/2025-03-02.md'
---
date: 2025-03-02
video:
  src: "/src/assets/local-video.mp4"
  alt: "Example Video"
  poster: "https://example.com/poster.jpg"
---

This is a sample highlight entry for the `/highlights` page.
...

```

> [!warning]- Local File Support Restrictions
> 
> - When passing local file paths to `images[n].src` and `video.src`, the files must be stored within the `src/assets/` (at any depth). Additionally, the path format must follow `"src/assets/**/*"` for it to work properly.
> - To use assets from other local paths, modify the relevant logic in `src/components/views/CardItem.astro`.
> - To store `highlights` outside the `content` directory, consider using [`import.meta.glob()`](https://docs.astro.build/en/guides/imports/#importmetaglob) instead of [`getCollection()`](https://docs.astro.build/en/reference/modules/astro-content/#getcollection), eliminating the need for a Zod schema or collection definition.
> - Additional references: [Images in `.astro` Files](https://docs.astro.build/en/guides/images/#images-in-astro-files), [Dynamically Import Images](https://docs.astro.build/en/recipes/dynamically-importing-images/).

### [`/shorts`](../../shorts) Page

The current `/shorts` page uses data from the `blog` collection. To create a standalone `shorts` content collection, follow these steps:

**Step 1: Define the `shorts` content collection**

```ts title='src/content/config.ts' ins={1-4,8}
const shorts = defineCollection({
  type: 'content',
  schema: postSchema,
})

export const collections = {
  ...
  shorts,
}
```

**Step 2: Update `CardView`  to query `shorts` instead of `blog`**

```astro title='src/components/views/CardView.astro' del={4-7} ins={1-2,8-16}
import { getFilteredPosts, getSortedPosts } from '~/utils/post'
import { getUrl, ensureTrailingSlash } from '~/utils/common'

if (collectionType === ('shorts' as ContentCollectionKey)) {
  const posts = await getCollection('blog')
  dataForGrid = await getShortsFromBlog(posts)
}
if (collectionType === 'shorts') {
  const shorts = await getFilteredPosts(collectionType)
  const sortedShorts = getSortedPosts(shorts)
  dataForGrid = sortedShorts.map((item)=>({
    link: getUrl(ensureTrailingSlash(collectionType)) + item.slug,
    text: item.data.title,
    date: item.data.pubDate,
  }))
}
```

**Step 3: Create the `pages/shorts/` to generate pages**

- Copy `src/pages/shorts/[...slug].astro` into the `pages/shorts/` directory, and update `'blog'` to `'shorts'` inside the file.
- Move `src/pages/shorts.mdx` into the `pages/shorts/` directory and rename it to `index.mdx`.

**Step 4: Create the `content/shorts/` to store content**

> [!tip]- Switch Between `'masonry'` and `'grid'` with `CardView`
> 
> The `CardView` component supports both `'masonry'` and `'grid'` layouts via the `mode` prop. 
> 
> For example, `/highlights` (`src/pages/highlights.mdx`) uses `'masonry'`, while `shorts` (`src/pages/shorts.mdx`) uses `'grid'`.  You can customize `CardView` based on your data and layout needs.

### [`404`](../../404) Page

To update the 404 page, you can directly edit `src/pages/404.mdx`.

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

For the loaders used in the `/feeds` and `/highlights` pages, you can uninstall them if they are no longer needed.

## Wrapping Up

That's all about customizing pages in this theme. Thanks for reading! 

If you encounter any issues, find errors, or see opportunities for improvement, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated! ❤️

:::details
::summary[Changelog]
2025-02-28
- Add: [`/highlights` Page](#highlights-page)
2025-03-31
- Add: [`/shorts` Page](#shorts-page)
:::
