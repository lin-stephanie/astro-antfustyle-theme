---
title: Project Structure
description: Introduces the structure of the Astro AntfuStyle Theme
pubDate: 2024-10-03
lastModDate: 2026-04-17
ogImage: true
toc: true
share: true
giscus: true
search: true
---

This post gives you a quick overview of the current structure of the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) and how its main parts work together.

## Overview

```md
astro-antfustyle-theme
|-.github                                   // GitHub templates and workflows
|-.vscode                                   // VS Code settings and snippets
| |-astro-antfustyle-theme.code-snippets    // Custom code snippets for faster development.
| |-extensions.json                         // List of recommended extensions for the project
| |-launch.json                             // Debug configuration
| |-settings.json                           // Workspace-specific settings
|-plugins                                   // Custom remark/rehype plugins and OG image template files
| |-index.ts                                // Entry point for remark/rehype plugin registration
| |-og-template                             // Files related to generating Open Graph images
| | |-Inter-Regular-24pt.ttf                // Font file used in Open Graph image generation
| | |-base64.ts                             // Base64-encoded backgrounds for OG image generation
| | |-markup.ts                             // Template for OG image generation
| |-remark-generate-og-image.ts             // Plugin for automatically generating OG images
| |-remark-reading-time.ts                  // Plugin for calculating eading times
|-public                                    // Static assets copied as-is
| |-apple-touch-icon.png                    // Apple touch icon for iOS devices
| |-giscus                                  // Stylesheet for Giscus comments
| |-favicon.ico                             // Favicon for browsers
| |-favicon.svg                             // SVG version of the favicon
| |-icon-192.png                            // 192x192px icon for web apps
| |-icon-512.png                            // 512x512px icon for web apps
| |-icon-mask.png                           // Maskable icon for web apps
| |-og-images                               // Stores automatically generated OG images
| | |-og-image.png                          // Fallback Open Graph image
| |-rss-styles.xsl                          // Stylesheet for RSS feed transformation
|-src                                       // Source directory
| |-assets                                  // Recommended for storing images used in posts
| |-components                              // Astro components used throughout the project
| | |-backgrounds                           // Animated page background components
| | |-base                                  // Shared structural UI components
| | |-nav                                   // Navigation components
| | |-tags                                  // Tag filter UI components
| | |-toc                                   // TOC components
| | |-views                                 // View components for different content
| | |-widgets                               // Interactive widgets
| |-content                                 // Stores collections
| | |-blog                                  // Blog posts
| | |-changelog                             // Changelog entries
| | |-home                                  // Homepage content
| | |-photos                                // Photo data and local images
| | |-projects                              // Project list JSON data
| | |-shorts                                // Short notes / FAQ-style standalone entries
| | |-streams                               // Stream list JSON data
| | |-schema.ts                             // Zod schemas for content collections
| |-layouts                                 // Page layouts
| | |-BaseLayout.astro                      // Base layout used across the site
| | |-StandardLayout.astro                  // Standard layout for most pages
| | |-TabbedLayout.astro                    // Tabbed layout for navigation
| |-pages                                   // Astro route entrypoints
| | |-blog                                  // Blog routes
| | | |-[...slug].astro                     // Dynamic route for individual blog posts
| | | |-index.mdx                           // Blog index page
| | |-changelog                             // Changelog routes
| | | |-[slug].astro                        // Dynamic route for individual changelog posts
| | | |-index.mdx                           // Changelog index page
| | |-photos                                // Photo routes
| | | |-index.mdx                           // Photos index page
| | | |-photos.[hash].json.ts               // Build-time generated `photos.[hash].json` endpoint for client-side retrieval
| | |-shorts                                // Shorts routes
| | | |-[...slug].astro                     // Dynamic route for individual shorts entries
| | | |-index.mdx                           // Shorts index page
| | |-404.mdx                               // Custom 404 page
| | |-app.webmanifest.js                    // Web app manifest for mobile and PWA support
| | |-feeds.mdx                             // Example page for fetching Astro Blog posts with `@ascorbic/feed-loader`
| | |-highlights.mdx                        // Page for creative work or curated posts
| | |-index.mdx                             // Homepage
| | |-projects.mdx                          // Projects page
| | |-prs.mdx                               // GitHub pull requests page
| | |-releases.mdx                          // GitHub releases page
| | |-rss.xml.js                            // RSS feed endpoint
| | |-streams.mdx                           // Example page for displaying Astro Streams with local JSON data
| |-styles                                  // Stylesheets
| | |-main.css                              // Main styles
| | |-markdown.css                          // Styles for rendering Markdown content
| | |-page.css                              // Styles for specific page
| | |-prose.css                             // Prose styles for text content
| |-utils                                   // Utility helpers
| | |-data.ts                               // For handling psots and GitHub/Bluesky data
| | |-datetime.ts                           // For handling date and time
| | |-image.ts                              // For handling image
| | |-misc.ts                               // For handling misc
| | |-path.ts                               // For handling path-related operations
| | |-toc.ts                                // For generating tables of contents
| |-config.ts                               // Theme configuration
| |-content.config.ts                       // Astro content collection definitions and loaders
| |-env.d.ts                                // Environment variable typings
| |-types.ts                                // Type definitions used by `config.ts`
|-.editorconfig                             // EditorConfig rules for consistent formatting
|-.env                                      // Local environment variables (if needed)
|-.gitattributes                            // Git attribute rules
|-.gitignore                                // Files ignored by GitHub
|-.prettierignore                           // Files ignored by Prettier
|-.prettierrc                               // Prettier config
|-AGENTS.md                                 // Repo instructions for coding agents
|-astro.config.ts                           // Astro config
|-ec.config.mjs                             // Expressive Code config
|-eslint.config.js                          // ESLint config
|-LICENSE                                   // Project license
|-package.json                              // Scripts, metadata, and dependencies
|-pnpm-lock.yaml                            // pnpm lockfile
|-README.md                                 // Project documentation
|-tsconfig.json                             // TypeScript config
|-unocss.config.ts                          // UnoCSS config
|-vercel.json                               // Vercel config
```

The above annotations provide a brief overview of the roles of directories and files in this theme project. Below, you'll find additional details on the project structure along with recommendations for its organization.

## Key Directories

### `src/pages/`

[`src/pages/`](https://docs.astro.build/en/basics/project-structure/#srcpages) defines routes. In this theme, `.mdx` files in `src/pages/` are mainly used to assemble layouts and views, while `.astro` files are used for dynamic routes and other cases that need Astro APIs such as [`getStaticPaths()`](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths).

### `src/content/`

`src/content/` stores the [content collections](https://docs.astro.build/en/guides/content-collections/). Each folder maps to one collection defined in `src/content.config.ts`, and the frontmatter/data shape is validated by the schemas in `src/content/schema.ts` when applicable. While Astro 5 allows collections to be stored anywhere using the [Content Layer API](https://docs.astro.build/en/reference/content-loader-reference/), this structure is retained from [Astro 4](https://v4.docs.astro.build/en/basics/project-structure/#srccontent) for clarity and consistency.

This split keeps route composition in `src/pages/` and substantive content in `src/content/`, which makes the project easier to scale and customize.

## Page-Collection Mapping

The current page-to-collection mapping is:

| URL Path                                              | Page File Location                  | Collection Storage Location                                      | Zod Schema              |
| ----------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------- | ----------------------- |
| `/`                                                   | `src/pages/index.mdx`               | `src/content/home/`                                              | -                       |
| `/blog`                                               | `src/pages/blog/index.mdx`          | `src/content/blog/`                                              | `postSchema`            |
| `/blog/post-name` <br>`/blog/sequences/one/two/three` | `src/pages/blog/[...slug].astro`    | `src/content/blog/`                                              | `postSchema`            |
| `/projects`                                           | `src/pages/projects.mdx`            | `src/content/projects/`                                          | `projectSchema`         |
| `/releases`                                           | `src/pages/releases.mdx`            | [Via build-time loader](../customizing-github-activity-pages/)   | Default by loader       |
| `/prs`                                                | `src/pages/prs.mdx`                 | [Via build-time loader](../customizing-github-activity-pages/)   | Default by loader       |
| `/highlights`                                         | `src/pages/highlights.mdx`          | [Via build-time loader](../recreating-current-pages/#highlights) | Default by loader       |
| `/photos`                                             | `src/pages/photos/index.mdx`        | `src/content/photos/`                                            | `photoSchema`           |
| `/shorts`                                             | `src/pages/shorts/index.mdx`        | `src/content/shorts/`                                            | `postSchema`            |
| `/shorts/post-name` <br>`/shorts/sequences/one/two/three`                                   | `src/pages/shorts/[...slug].astro`  | `src/content/shorts/`                                            | `postSchema`            |
| `/changelog`                                          | `src/pages/changelog/index.mdx`     | `src/content/changelog/`                                         | `postSchema`            |
| `/changelog/post-name`                                      | `src/pages/changelog/[slug].astro`  | `src/content/changelog/`                                         | `postSchema`            |
| `/feeds`                                              | `src/pages/feeds.mdx`               | [Via build-time loader](../recreating-current-pages/#feeds)           | Default by loader       |
| `/streams`                                            | `src/pages/streams.mdx`             | `src/content/streams/`                                           | `streamSchema`          |

## File Usage Conventions

In this theme, the common file roles are:

- `.astro`: reusable components (`src/components/`), constructing page layouts (`src/layouts/`), and [dynamic routes]((https://docs.astro.build/en/guides/routing/#static-ssg-mode)) that need [Astro APIs](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths) (`src/pages/blog/[...slug].astro`).
- `.mdx`: [static route](https://docs.astro.build/en/guides/routing/#static-routes) entry files in `src/pages/` and content files that need imports or component-style authoring.
- `.md`: text-heavy content that does not need MDX features (`src/content/blog/xxx.md`, `src/content/home/index.md`, `src/content/changelog/xxx.md`).
- `.json`: structured list data (`src/content/projects/data.json`, `src/content/streams/data.json`).

This convention is recommended because it keeps content authoring straightforward while preserving flexibility for route composition and advanced UI behavior.

> [!important]- Why `.mdx` is used in `src/pages/`
>
> `.mdx` route files can import layouts and views directly, which keeps each page entry concise.
>
> They also pass through the theme’s remark/rehype pipeline, so page frontmatter and [OG image generation]((../about-open-graph-images/#how-this-theme-automatically-generates-og-images)) stay aligned with the rest of the site.

## Other Notes

- `src/pages/photos/photos.[hash].json.ts` generates a hashed JSON file used by the `/photos` page for client-side photo loading.
- External GitHub and feed data are defined in `src/content.config.ts` through loaders, so changes there can affect startup time and build behavior.

## Wrapping Up

Understanding this structure makes it much easier to customize the theme without mixing route setup, content authoring, and reusable UI logic together.

For the next step, review [Basic Configuration](../basic-configuration/) or [Recreating Current Pages](../recreating-current-pages/). You can also explore [Managing Image Assets](../managing-image-assets/), or dive deeper into the [tech stack](../../projects/) used in the theme to better understand its capabilities.

If you encounter any issues, find errors, or see opportunities for improvement as you explore the theme, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions), or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated! 

Thank you for your interest in this project! 😊

:::details
::summary[Changelog]
2025-04-30
- Update for Astro 5.7

2025-05-20
- Add `vercel.json` for configuring CORS headers

2026-04-17
- Sync project structure with the latest committed tree

[View full history](https://github.com/lin-stephanie/astro-antfustyle-theme/commits/main/src/content/blog/project-structure.md)
:::
