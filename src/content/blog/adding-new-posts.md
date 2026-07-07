---
title: Adding New Posts
description: "How to create new posts in Astro AntfuStyle Theme: guidelines, tips, and tricks"
pubDate: 2023-12-06
lastModDate: 2026-07-07
ogImage: true
toc: true
share: true
giscus: true
search: true
---

This post explains how to create new posts in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) and provides guidelines, tips, and tricks for writing posts.

## Creating a New Post

To create a new post, add a new `.md` or `.mdx` file in `src/content/blog/` ([see when to use MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/#why-mdx) for enhanced Markdown features). Use a consistent naming scheme (lower-case, dashes instead of spaces), as the filename will be used as the [path](https://docs.astro.build/en/guides/content-collections/#defining-custom-ids).

You can organize posts directly under `src/content/blog/` or in nested subdirectories (see [Astro Routing Docs](https://docs.astro.build/en/guides/routing/#rest-parameters) for more):

```md
src/content/blog
├── post-1.md
└── post-2
    └── index.mdx
└── subdirectory
    └── post-3.md

<!-- `post-1.md` generates the page path `/blog/post-1` -->
<!-- `post-2/index.mdx` generates the page path `/blog/post-2` -->
<!-- `post-3.md` in a subdirectory generates the page path `/blog/subdirectory/post-3` -->
```

### Choosing Between Markdown and MDX

Use Markdown for simple posts with minimal interaction. You can also embed HTML and [UnoCSS](https://unocss.dev/) directly in Markdown, e.g.:

```md title='src/content/home/index.md' wrap
Visit the theme's <a class="inline-block ml-1.5 op-75 hover:op-100" href="https://github.com/lin-stephanie/astro-antfustyle-theme"><span i-simple-icons-github></span> GitHub repo</a>
```

Use MDX if:

- You need to embed components.
- The content requires conditional rendering or dynamic data.
- You need interactive code examples or other highly interactive content.

## Editing Frontmatter

All `.md` and `.mdx` files in the `src/content/blog/` belong to the `blog` collection.

Each post requires [YAML frontmatter](https://jekyllrb.com/docs/front-matter/), which adds metadata at the top of Markdown/MDX files. The frontmatter fields for `blog` posts are defined by `schema: postSchema` in `src/schema.ts` as follows:

| Property (* required) | Type (default)                                    | Description                                                                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`*              | `string`                                          | Sets the post title, limited to **60 characters**. This follows [Moz's recommendation](https://moz.com/learn/seo/title-tag), ensuring approximately 90% of titles display correctly in SERPs and preventing truncation on smaller screens or social platforms. Page-specific OG images also require a title different from `FEATURES.ogImage[1].authorOrBrand`; otherwise the fallback OG image is used. |
| `subtitle`            | `string` (`''`)                                   | Provides a post subtitle. If provided, it will be displayed below the title. If not needed, leave the field as an empty string or delete it.                                                                                                                   |
| `description`         | `string` (`''`)                                   | Provides a brief description, used in meta tags for SEO and sharing purposes. If not needed, leave the field as an empty string or delete it, and the `SITE.description` will be used directly.                                                                |
| `tags`                | `string[]` (`[]`)                                 | Adds tags to the post. These are displayed in post metadata and can also be used by list/card view tag filters on pages that enable them. If not needed, leave the field as an empty array or delete it.                                                      |
| `cover`               | `image() \| z.url()` (`''`)                       | Defines a cover image for the post. Specify either a URL or a path relative to the current directory. If not needed, leave the field as an empty string or delete it.                                                                                           |
| `coverAlt`            | `string` (`''`)                                   | Defines the cover image alt text. If `UI.postView.useCoverAltAsCaption` is `true`, it is also shown below the cover image as a caption. If not needed, leave the field as an empty string or delete it.                                                       |
| `pubDate`*            | `z.coerce.date()`                                 | Specifies the publication date. See supported formats [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples). For example:<br>`"2023-01-10T00:00:00.000Z"`<br>`"2023-01-10"`<br>`"1/10/23"`              |
| `lastModDate`         | `z.union([z.coerce.date(), z.literal('')])`       | Tracks the last modified date. If not needed, leave the field as an empty string or delete it.                                                                                                                                                                 |
| `minutesRead`         | `number \| boolean` (`true`)                      | Provides an estimated reading time. Set a positive number to override it manually, set `true` or delete the field to auto-generate it, and set `false` to hide it.                                                                                              |
| `radio`               | `boolean` (`false`)                               | Indicates if the post includes audio content or links to an external audio source. If `true`, an icon will be added to the post item in the list.                                                                                                              |
| `video`               | `boolean` (`false`)                               | Indicates if the post includes video content or links to an external video source. If `true`, an icon will be added to the post item in the list.                                                                                                              |
| `platform`            | `string` (`''`)                                   | Specifies the platform where the audio or video content is published. If provided, the platform name will be displayed. If not needed, leave the field as an empty string or delete it.                                                                        |
| `bgType`              | `z.union([z.literal(false), z.enum(['plum', 'dot', 'rose', 'particle'])])` (`false`) | Specifies whether to apply a background on this post and select its type. It is also used as the page-specific OG image background; if not needed, delete the field or set to `false`. |
| `ogImage`             | `z.union([z.literal('fallback'), z.string(), z.boolean()])` <br>(`true`) | Controls OG image metadata. Set to `true` or omit the field to generate a page-specific endpoint image from the final pathname, such as `/blog/foo/` -> `/og-images/blog/foo.png`; if the `title` is empty or matches `FEATURES.ogImage[1].authorOrBrand`, the fallback is used. Set to 'fallback' to use `/og-images/og-image.png`, or false to omit OG image metadata. To use a custom image, place it in `public/og-images/` and set this field to its relative path (for example, `custom.png` or `blog/custom.png`). Missing images fall back to `/og-images/og-image.png`. |
| `toc`                 | `boolean` (`true`)                                | Controls whether the table of contents (TOC) is generated for the post.                                                                                                                                                                                        |
| `share`               | `boolean` (`true`)                                | Controls whether social sharing is available for the post.                                                                                                                                                                                                     |
| `giscus`              | `boolean` (`true`)                                | Controls whether Giscus comments are available for the post.                                                                                                                                                                                                   |
| `search`              | `boolean` (`true`)                                | Controls whether search is available for the post. If `true`, search will be enabled; otherwise, it will be disabled.                                                                                                                                          |
| `redirect`            | `z.union([z.url(), z.literal('')])` (`''`)        | Defines a URL to redirect the post. If not needed, leave the field as an empty string or delete it.                                                                                                                                                            |
| `draft`               | `boolean` (`false`)                               | Marks the post as a draft. If `true`, it is only visible in development and excluded from production builds.                                                                                                                                                   |

The theme includes a VS Code snippet for auto-generating this frontmatter (located in `.vscode/astro-antfustyle-theme.code-snippets`). Type `postFrontmatter` and press `tab` to insert it (tab completion is enabled in `.vscode/settings.json`).

> [!tip]- The theme supports [experimental intellisense for content collections](https://docs.astro.build/en/reference/experimental-flags/content-intellisense/)
> 
> Hovering over a property shows descriptions, and mismatches in types prompt warnings.

> [!note]- Formatting post titles
> 
> Auto-generated titles capitalize the first letter of each word.  If you've tried editing the auto-generated frontmatter snippet, you'll notice that the cursor reaches the title field last after tabbing through all others.
> 
> To correctly format titles according to [The Chicago Manual of Style](https://www.chicagomanualofstyle.org/home.html), you can use a [Smart-Title-Case](https://marketplace.visualstudio.com/items?itemName=awtnb.smart-title-case) VS Code extension.

## Writing the Post

Once frontmatter is set, start writing your post!

To see how basic Markdown renders, refer to the [Markdown Syntax Guide](../markdown-syntax-guide/). To explore how to use MDX to enhance your flexibility in writing posts, check the [MDX Docs](https://mdxjs.com/docs/) and [MDX in Astro](https://docs.astro.build/en/guides/integrations-guide/mdx/#mdx-in-astro).

Regardless of whether you're using Markdown or MDX, _don't miss out on the [Markdown/MDX extended features](../markdown-mdx-extended-features/) supported by this theme_, including callouts (admonitions/alerts), fully-featured code blocks, image captions and links, video embeddings, styled links, and more.

Additionally, the title (set by the `title` property in the YAML frontmatter) is automatically rendered as an h1. You don’t need to include the title again in the post, and it’s recommended to start with h2 headings. 

> [!important]- TOC excludes `title` property defined in frontmatter
> 
> Note that even if you configure `FEATURES.toc[1].minHeadingLevel` in `src/config.ts` to include `1`, the title set by the `title` property in frontmatter won't be included in the auto-generated TOC — it only includes h1 headings written in the Markdown/MDX content.

## Wrapping Up

Here’s how to create a new post in the theme. Once completed, you can preview your post in real-time at `/blog/if-stored-in-subdirectory/your-post-name` in your browser.

Happy writing, and may your content reach a wide and engaged audience! 🌎

:::details
::summary[Changelog]
2026-04-17
- Update `minutesRead` to match the current `number | boolean` schema behavior
- Update `redirect` to reflect that an empty string disables redirection
- Add `tags`, `cover`, and `coverAlt` frontmatter fields

2026-07-07
- Update `title`, `bgType` and `ogImage` guidance for route-generated OG images
- Update schema file path to `src/schema.ts`

[View full history](https://github.com/lin-stephanie/astro-antfustyle-theme/commits/main/src/content/blog/adding-new-posts.md)
:::
