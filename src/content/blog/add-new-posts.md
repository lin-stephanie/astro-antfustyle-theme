---
title: Add New Posts
description: "How to create new posts in Astro AntfuStyle Theme: guidelines, tips, and tricks"
pubDate: 2023-10-04
lastModDate: ''
toc: true
share: true
ogImage: true
---

This post explains how to create new posts in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) and provides guidelines, tips, and tricks for writing posts.

## Creating a New Post

To create a new post, add a new `.md` or `.mdx` file in `src/content/blog/` ([see when to use MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/#why-mdx) for enhanced Markdown features). Use a consistent naming scheme (lower-case, dashes instead of spaces), as the filename will be used as the path ([slug](https://docs.astro.build/en/guides/content-collections/#defining-custom-slugs)).

You can organize posts directly under `src/content/blog/` or in nested subdirectories (see ["Astro Routing Docs"](https://docs.astro.build/en/guides/routing/#rest-parameters) for more):


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
Visit Astro AntfuStyle Theme on <a href="https://github.com/antfu" target="_blank" class="inline-block ml-1 op-75"><span class="i-simple-icons-github"></span> GitHub</a>
```

Use MDX if:

- You need to embed components.
- The content requires conditional rendering or dynamic data.
- You need interactive code examples or other highly interactive content.

> [!warning]- MDX Support Limitations in RSS Generation
> 
> The theme automatically generates `rss.xml` via `src/pages/rss.xml.js`. When processing [Including full post content](https://docs.astro.build/en/guides/rss/#including-full-post-content), it uses the `compiledContent()` helper to retrieve and sanitize the rendered HTML. 
> 
> However, this feature does not support MDX files, which may result in the `items.content` value not being generated as expected for posts written in `.mdx` files.

## Editing Frontmatter

All `.md` and `.mdx` files in the `src/content/blog/` belong to the `blog` content collection.

Each post requires [YAML frontmatter](https://jekyllrb.com/docs/front-matter/) , which adds metadata at the top of Markdown/MDX files. The frontmatter fields for `blog` posts are defined by `schema: postSchema`in `src/content/schema.ts` as follows:

| Property (* required) | Type (Default Value)                             | Description                                                                                                                                                                                                                                                                                    | Example                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `created`             | [`z.coerce.date()`](https://zod.dev/?id=dates-1) | 内部会调用 `Date` 对象的 [`toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) 方法，返回的字符串总是以 UTC 为基础，即 "Zero time offset"（零时差），这意味着不论 `Date` 对象在创建时所基于的本地时区是什么，转换成的 ISO 8601 字符串都会表示为 UTC 时间。                                            | `"2023-01-10T00:00:00.000Z"`、`"2023-01-10"`、`"1/10/23"`<br><br>更多用法见：[MDN- Date.parse() - Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples) |
| `minutesRead`         |                                                  | 手动设置阅读所需时间（min）；如果不设置，默认基于 [`reading-time`](https://github.com/ngryman/reading-time/) 库自动计算并生成阅读时间；如果手动设置为 0，则不会在页面上显示出阅读时间                                                                                                                                                                    |                                                                                                                                                                                                           |
| `title`               |                                                  | 被限制不超过 60 个字符，主要考虑两点：1. 超过这个字符限制会造成列表展示每个 post item 时出现换行影响布局；2. 该字段会被用于在社交平台上共享时显示，[超过这个字符限制可能会造成在较小的屏幕上被截断](https://zhead.dev/meta/og%3Atitle)，查看 [Title Tag](https://moz.com/learn/seo/title-tag)                                                                                           |                                                                                                                                                                                                           |
| `description`         |                                                  | 被限制为 50-160 个字符，这是考虑了 SERP 布局影响所建议的，查看 [What Are Meta Descriptions and How to Write Them](https://moz.com/learn/seo/meta-description) 获取更多信息；Title and description (excerpt) are important for search engine optimization (SEO) and thus AstroPaper encourages to include these in blog posts. |                                                                                                                                                                                                           |
| `draft`               |                                                  |                                                                                                                                                                                                                                                                                                | 如果是 draft 提醒可以修改显示的文本或者可以显示但需要修改措辞？                                                                                                                                                                       |

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

To see how basic Markdown renders, refer to the ==**"Markdown Syntax Guide"**==. To explore how to use MDX to enhance your flexibility in writing posts, check the [MDX Docs](https://mdxjs.com/docs/) and [MDX in Astro](https://docs.astro.build/en/guides/integrations-guide/mdx/#mdx-in-astro).

Regardless of whether you're using Markdown or MDX, **don't miss out on the ==Markdown Extended Features==** supported by this theme, including callouts (admonitions/alerts), fully-featured code blocks, image captions and links, video embeddings, styled GitHub links, and more.

Additionally, the title (set by the `title` property in the YAML frontmatter) is automatically rendered as an h1. You don’t need to include the title again in the post, and it’s recommended to start with h2 headings. 

> [!important]- Excluding Frontmatter Title from Table of Contents
> 
> Note that even if you configure `FEATURES.toc[1].minHeadingLevel` in `src/config.ts` to include 1, the title set by the `title` property won't be included in the auto-generated table of contents—it only includes h1 headings written in the Markdown/MDX content.

## Wrapping Up

This covers how to create a new post in the theme. After following these steps, you can preview your post in real-time at `/blog/if-stored-in-subdirectory/your-post-name` in your browser.

If you encounter issues, find errors, or see opportunities for improvement on this theme, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated!
