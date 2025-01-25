---
title: Adding New Posts
description: "How to create new posts in Astro AntfuStyle Theme: guidelines, tips, and tricks"
pubDate: 2023-12-06
lastModDate: ''
toc: true
share: true
ogImage: true
---

This post explains how to create new posts in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) and provides guidelines, tips, and tricks for writing posts.

## Creating a New Post

To create a new post, add a new `.md` or `.mdx` file in `src/content/blog/` ([see when to use MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/#why-mdx) for enhanced Markdown features). Use a consistent naming scheme (lower-case, dashes instead of spaces), as the filename will be used as the path ([slug](https://docs.astro.build/en/guides/content-collections/#defining-custom-slugs)).

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

All `.md` and `.mdx` files in the `src/content/blog/` belong to the `blog` content collection.

Each post requires [YAML frontmatter](https://jekyllrb.com/docs/front-matter/) , which adds metadata at the top of Markdown/MDX files. The frontmatter fields for `blog` posts are defined by `schema: postSchema`in `src/content/schema.ts` as follows:


| Property (* required) | Type (default)                                | Description                                                                                                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`*                    | `string`                                          | Sets the post title, limited to **60 characters**. This follows [Moz's recommendation](https://moz.com/learn/seo/title-tag), ensuring approximately 90% of titles display correctly in SERPs and preventing truncation on smaller screens or social platforms. |
| `subtitle`                  | `string` (`''`)                                   | Provides a post subtitle. If provided, it will be displayed below the title. If not needed, leave the field as an empty string or delete it.                                                                                                                   |
| `description`               | `string` (`''`)                                   | Provides a brief description, used in meta tags for SEO and sharing purposes. If not needed, leave the field as an empty string or delete it, and the `SITE.description` will be used directly.                                                                |
| `pubDate`*                  | `z.coerce.date()`                                 | Specifies the publication date. See supported formats [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples). For example:<br>`"2023-01-10T00:00:00.000Z"`<br>`"2023-01-10"`<br>`"1/10/23"`              |
| `lastModDate`               | `z.union([z.coerce.date(), z.literal('')])`       | Tracks the last modified date. If not needed, leave the field as an empty string or delete it.                                                                                                                                                                 |
| `minutesRead`               | `number`                                          | Provides an estimated reading time in minutes. To auto-generate, delete the field; to hide it on the page, enter 0.                                                                                                                                            |
| `radio`                     | `boolean` (`false`)                               | Indicates if the post includes audio content or links to an external audio source. If `true`, an icon will be added to the post item in the list.                                                                                                              |
| `video`                     | `boolean` (`false`)                               | Indicates if the post includes video content or links to an external video source. If `true`, an icon will be added to the post item in the list.                                                                                                              |
| `platform`                  | `string` (`''`)                                   | Specifies the platform where the audio or video content is published. If provided, the platform name will be displayed. If not needed, leave the field as an empty string or delete it.                                                                        |
| `toc`                       | `boolean` (`true`)                                | Controls whether the table of contents (TOC) is generated for the post.                                                                                                                                                                                        |
| `share`                     | `boolean` (`true`)                                | Controls whether social sharing options are available for the post.                                                                                                                                                                                            |
| `ogImage`                   | `z.union([z.string(), z.boolean()])` <br>(`true`) | Specifies the Open Graph (OG) image for social media sharing. To auto-generate OG image, delete the field or set to `true`. To disable it, set the field to `false`. To use a custom image, provide the full filename from `/public/og-images/`.               |
| `redirect`                  | `string`                                          | Defines a URL to redirect the post.                                                                                                                                                                                                                            |
| `draft`                     | `boolean` (`false`)                               | Marks the post as a draft. If `true`, it is only visible in development and excluded from production builds.                                                                                                                                                   |


The theme includes a VS Code snippet for auto-generating this frontmatter (located in `.vscode/astro-antfustyle-theme.code-snippets`). Type `postFrontmatter` and press `tab` to insert it (tab completion is enabled in `.vscode/settings.json`).

> [!tip]- The Theme Supports Astro's [Intellisense in Content Files](https://astro.build/blog/astro-4140/#experimental-intellisense-inside-content-files)
> 
> Hovering over a property shows descriptions, and mismatches in types prompt warnings.

> [!note]- Formatting Post Titles
> 
> Auto-generated titles capitalize the first letter of each word.  If you've tried editing the auto-generated frontmatter snippet, you'll notice that the cursor reaches the title field last after tabbing through all others.
> 
> To correctly format titles according to [The Chicago Manual of Style](https://www.chicagomanualofstyle.org/home.html), you can use the [Smart-Title-Case](https://marketplace.visualstudio.com/items?itemName=awtnb.smart-title-case) VS Code extension.

## Writing the Post

Once frontmatter is set, start writing your post!

To see how basic Markdown renders, refer to the [Markdown Syntax Guide](../markdown-syntax-guide/). To explore how to use MDX to enhance your flexibility in writing posts, check the [MDX Docs](https://mdxjs.com/docs/) and [MDX in Astro](https://docs.astro.build/en/guides/integrations-guide/mdx/#mdx-in-astro).

Regardless of whether you're using Markdown or MDX, _don't miss out on the [Markdown/MDX extended features](../markdown-mdx-extended-features/) supported by this theme_, including callouts (admonitions/alerts), fully-featured code blocks, image captions and links, video embeddings, styled GitHub links, and more.

Additionally, the title (set by the `title` property in the YAML frontmatter) is automatically rendered as an h1. You don’t need to include the title again in the post, and it’s recommended to start with h2 headings. 

> [!important]- TOC Excludes `title` Property Defined in Frontmatter
> 
> Note that even if you configure `FEATURES.toc[1].minHeadingLevel` in `src/config.ts` to include `1`, the title set by the `title` property in frontmatter won't be included in the auto-generated TOC --- it only includes h1 headings written in the Markdown/MDX content.

## Wrapping Up

Here’s how to create a new post in the theme. Once completed, you can preview your post in real-time at `/blog/if-stored-in-subdirectory/your-post-name` in your browser.

Happy writing, and may your content reach a wide and engaged audience! 🌎
