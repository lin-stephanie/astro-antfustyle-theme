---
title: Recreating Current Pages
description: How to edit existing pages in Astro AntfuStyle Theme
pubDate: 2023-12-03
lastModDate: 2025-07-01
ogImage: true
toc: true
share: true
giscus: true
search: true
---

You can use any view from the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) to build the pages you want. 

This post shows how to recreate the [`/`](#homepage), [`/projects`](#projects), [`/highlights`](#highlights), [`/photos`](#photos), [`/shorts`](#shorts), [`/changelog`](#changelog), [`/streams`](#streams), [`/feeds`](#feeds) and [`404`](#404) pages, add new ones, or remove existing ones. 

For `/releases` and `/prs`, check out [Customizing GitHub Activity Pages](../customizing-github-activity-pages/).

## Creating Pages

In [Project Structure](../project-structure/), it is mentioned that the theme’s organizational strategy is to store all substantive content in the `src/content/` directory, while the `src/pages/` directory uses `.mdx` files to assemble content into structured, styled layouts.

Open any `.mdx` file in `src/pages/`, and you'll notice a similar structure: YAML frontmatter + imported Astro components + JSX with layout components nesting view components.

The theme defined all `.mdx` files in `src/pages/` belong to the `pages` collection. The frontmatter fields for `pages` collection are defined by `pageSchema` in `src/content/schema.ts` as follows:

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

> [!tip]- Tips for creating a new page
> 
> To create a new page, first review the layout components (`src/layouts/`) and view components (`src/components/views/`) in the theme. Ensure you understand their usage, including required props, and preview the rendering in the browser to select the most appropriate layout and view.
> 
> Make sure to import the `BaseLayout` component in every page and wrap it around your JSX.
> 
> When using the `RenderPage` component, ensure that `collectionType` and `id` correspond to a directory and file in `src/content/` (excluding the extension).

## Updating Pages

### [Homepage](../../)

To update the homepage, open `src/content/home/index.md` and start writing the content you want to present.

> [!important]- No frontmatter needed for the `home` collection
> 
> Since the `home` collection doesn't have a defined schema in `src/content.config.ts`, you don't need to write any frontmatter. Just focus on the main content, and it will work fine.

### [`/projects`](../../projects/)

Open `src/content/projects/data.json`, delete the existing content, and write your own.

The fields for each entry in the `projects` collection are defined by `projectSchema` as follows:

| Property (* required) | Type     | Description                                                                                                                            |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `id`*                 | `string` | Name of the project to be displayed.                                                                                                   |
| `link`*               | `string` | URL linking to the project page or repository.                                                                                         |
| `desc`*               | `string` | A brief description summarizing the project.                                                                                           |
| `icon`*               | `Icon`   | Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>` as per [UnoCSS](https://unocss.dev/presets/icons) specs. |
| `category`*           | `string` | Category of the project.                                                                                                               |

The theme includes a code snippet for generating `projectSchema`. Type `projectData` to trigger it, then use `tab` to modify the values.

Finally, update the frontmatter in `src/pages/projects.mdx`.

> [!important]- Make sure to keep the `id` field unchanged
>
> It is required by Astro's [`file()` loader](https://docs.astro.build/en/reference/content-loader-reference/#file-loader) to create entries properly.

### [`/highlights`](../../highlights/)

Similar to the `/feeds` page, the `/highlights` page displays content retrieved via :link[astro-loader-bluesky-posts]{id=https://www.npmjs.com/package/astro-loader-bluesky-posts}. You can reconfigure it in `src/content.config.ts` by referring to the loader's README, specifying the Bluesky posts to fetch:

```ts title='src/content.config.ts' {5-14}
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

```ts title='src/content.config.ts' del={10-19} ins={6,20-21}
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

```astro title='src/components/views/CardView.astro' del={6-10,25-27} ins={11-13,28-35} ins="render"
---
import { getCollection, render } from 'astro:content'

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

> [!warning]- Local file support restrictions
> 
> - When passing local file paths to `images[n].src` and `video.src`, the files must be stored within the `src/assets/` (at any depth). Additionally, the path format must follow `"src/assets/**/*"` for it to work properly.
> - To use assets from other local paths, modify the relevant logic in `src/components/views/CardItem.astro`.
> - To store `highlights` outside the `content` directory, consider using [`import.meta.glob()`](https://docs.astro.build/en/guides/imports/#importmetaglob) instead of [`getCollection()`](https://docs.astro.build/en/reference/modules/astro-content/#getcollection), eliminating the need for a Zod schema or collection definition.
> - Additional references: [Images in `.astro` Files](https://docs.astro.build/en/guides/images/#images-in-astro-files), [Dynamically Import Images](https://docs.astro.build/en/recipes/dynamically-importing-images/).

> [!tip]- Allow remote images from `'cdn.bsky.app'` to be optimized
> 
> The `/highlights` page displays remote images from `'cdn.bsky.app'`. The theme sets this domain in `SITE.imageDomains` so [Astro can optimize them](https://docs.astro.build/en/guides/images/#display-optimized-images-with-the-image--component) — feel free to change it if needed.

> [!tip]- Use Astro loaders to fetch external data (may affect startup time)
>  
> `blueskyPostsLoader` and `feedLoader` (below) are both [Astro loaders](https://docs.astro.build/en/reference/content-loader-reference/#what-is-a-loader). Built with the [Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/), Astro loaders enable seamless data fetching from various sources as content collections. This API was first introduced in [Astro 4.14](https://astro.build/blog/astro-4140/#experimental-content-layer-api) and became stable in [Astro 5](https://astro.build/blog/astro-5/#content-layer).
> 
> Starting in Astro 5, the dev server address is shown only after external resources are loaded and content is synced. Using Astro loaders may delay server startup.

### [`/photos`](../../photos/)

Photos on the `/photos` page are manually configured in `src/content/photos/data.json`. Both local and public remote images are supported and can be mixed. This page can also showcase designs, illustrations, and other images — not just photos.

The fields for each entry in the `photos` collection are defined by `photoSchema` as follows:

| Property (* required) | Type     | Description                                                                                 |
| --------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `id`*                 | `string` | File (name/path) of the image in the `src/content/photos/` directory or a remote image URL. |
| `desc`                | `string` | Optional description for the image.                                                         |

For local images, files must be placed in `src/content/photos/`, and `id` must be configured such that it can be correctly matched in the following code:

```ts title='src/pages/photos/photos.[hash].json.ts'
const localImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/photos/**/*.{jpg,jpeg,png,webp,avif}'
)
const localImageKeys = Object.keys(localImages)
const localImagePath = localImageKeys.find((path) => path.includes(id))
```

For remote images, `id` must start with `http` or `https`. To enable thumbnail generation, also configure `imageDomains` in `src/config.ts` (see explanation below).

**Page implementation details**

- At build time, a `photos.[hash].json` file is generated based on your `data.json` config. When the `/photos` page loads, it fetches this file and renders the images dynamically.
- The file is served by `src/pages/photos/photos.[hash].json.ts` as a [static file endpoint](https://docs.astro.build/en/guides/endpoints/#static-file-endpoints), which does the following:
  - Loads remote or local images to extract metadata.
  - Uses :link[sharp]{id=lovell/sharp .github} to generate a blurred placeholder as a Data URL (cached in `'./node_modules/.astro/photos/'` during development).
  - Uses Astro’s [`getImage()`](https://docs.astro.build/en/reference/modules/astro-assets/#getimage) to generate 720px-wide thumbnails (served via Astro's built-in `/_image` endpoint during development, and HTTP cached during build).

**Additional notes that may be useful**

- Remote images larger than 10MB or loading longer than 10 seconds will be skipped with a warning. You can adjust these limits in `src/utils/image.ts`.
- Photos are displayed in a left-to-right, top-to-bottom flow based on their order in `data.json`.
- Lightbox view is powered by :link[viewerjs]{id=fengyuanchen/viewerjs .github}, customizable via `ImageViewer.astro`. Note: this component is also used in `PhotoView.astro` and `RenderPost.astro`.
- To generate thumbnails for remote images, Astro requires [remote image authorization](https://docs.astro.build/en/guides/images/#authorizing-remote-images). For large images over 720px wide, consider setting the `imageDomains` option in `src/config.ts`; otherwise, you can ignore this.
- You can customize the default parameters related to image loading and layout as needed in `PhotoView.astro`. For certain edge cases, see [#33](https://github.com/lin-stephanie/astro-antfustyle-theme/issues/33).

> [!warning]- Avoid mismatches caused by outdated placeholder or aspect ratio cache
>
> - For local images, the cache key is based on `id + PLACEHOLDER_PIXEL_TARGET + localImage.width + localImage.height`
> - For remote images, the cache key is based on `id + PLACEHOLDER_PIXEL_TARGET`
>
> If needed, delete `'./node_modules/.astro/photos/'` to clear the cache.

### [`/shorts`](../../shorts/)

The current `/shorts` page uses data from the `blog` collection. To create a standalone `shorts` collection, follow these steps:

**Step 1: Define the `shorts` collection**

```ts title='src/content.config.ts' ins={1-4,8}
const shorts = defineCollection({
  loader: glob({ base: './src/content/shorts', pattern: '**/[^_]*.{md,mdx}' }),
  schema: postSchema,
})

export const collections = {
  ...
  shorts,
}
```

**Step 2: Update `CardView` to query `shorts` instead of `blog`**

```astro title='src/components/views/CardView.astro' del={4-7} ins={1-2,8-16}
import { getFilteredPosts, getSortedPosts } from '~/utils/data'
import { resolvePath } from '~/utils/path'

if (collectionType === ('shorts' as CollectionKey)) {
  const posts = await getCollection('blog')
  dataForGrid = await getShortsFromBlog(posts)
}
if (collectionType === 'shorts') {
  const shorts = await getFilteredPosts(collectionType)
  const sortedShorts = getSortedPosts(shorts)
  dataForGrid = sortedShorts.map((item)=>({
    link: resolvePath(collectionType) + item.id,
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

### [`/changelog`](../../changelog/)

To recreate the `/changelog` page, please follow the [Adding New Posts](../adding-new-posts/). The content for the `/changelog` page, stored in the `src/content/changelog/` directory, belongs to the `changelog` collection. This collection also uses `postSchema` for frontmatter types.

### [`/streams`](../../streams/)

Similarly to adding projects,  open `src/content/streams/data.json`, delete the existing, and write your own.

The fields for each entry in the `streams` collection are defined by `streamSchema` as follows:

| Property (* required) | Type      | Description                                                                                                                                                         |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`*           | `string`  | Sets the stream title.                                                                                                                                              |
| `pubDate`*         | `date`    | Specifies the publication date. See supported formats [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples). |
| `link`*           | `string`  | Specifies the URL link to the stream.                                                                                                                               |
| `radio`            | `boolean` | Indicates whether the stream is a radio broadcast. If `true`, an icon will be added to the stream item in the list.                                                 |
| `video`            | `boolean` | Indicates whether the stream is a video broadcast. If `true`, an icon will be added to the stream item in the list.                                                 |
| `platform`         | `string`  | Specifies the platform where the stream is published.                                                                                                               |

The theme includes a code snippet for generating `streamSchema`. Type `streamData` to trigger it, then use `tab` to modify the values.

Finally, update the frontmatter in `src/pages/streams.mdx`.

> [!important]- Make sure to keep the `id` field unchanged
>
> It is required by Astro's [`file()` loader](https://docs.astro.build/en/reference/content-loader-reference/#file-loader) to create entries properly.

### [`/feeds`](../../feeds/)

The `/feeds` page displays content retrieved via :link[@ascorbic/feed-loader]{id=https://www.npmjs.com/package/@ascorbic/feed-loader}. You can define an external data source (like RSS, RDF, or Atom feeds) for the `feeds` collection using the following:

```ts title='src/content.config.ts' {5}
import { feedLoader } from '@ascorbic/feed-loader'

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})
```

### [`404`](../../404/)

To update the 404 page, you can directly edit `src/pages/404.mdx`.

## Removing Pages

Using remove the `/changelog` page as an example:

- Delete `src/pages/changelog.mdx`.
- Delete `src/content/changelog` directory.
- Update `src/content.config.ts` and `src/config.ts`:

```ts title='src/content.config.ts' del={8-11} del='changelog,'

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
- Add: [`/highlights`](#highlights)

2025-03-31
- Add: [`/shorts`](#shorts)

2025-04-30
- Changes for Astro 5.7

2025-07-01
- Add: [`/photos`](#photos)

[View full history](https://github.com/lin-stephanie/astro-antfustyle-theme/commits/main/src/content/blog/recreating-current-pages.md)
:::
