---
title: Project Structure
description: Introduces the structure of the Astro AntfuStyle Theme
pubDate: 2024-10-03
lastModDate: 2024-12-27
toc: true
share: true
ogImage: true
---


This post will quickly familiarize you with the entire structure of the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) project.

## Project Structure Overview

Opening the project in your editor will reveal the following folders and files:

```md
astro-antfustyle-theme                      
|-.editorconfig                             // Configuration for maintaining consistent coding styles across editors.
|-.prettierignore                           // Configuration for Prettier to ignore.
|-.prettierrc                               // Configuration file for Prettier code formatting rules.
|-.vscode                                   // VS Code settings and configurations.
| |-astro-antfustyle-theme.code-snippets    // Custom code snippets for faster development within VS Code.
| |-extensions.json                         // List of recommended VS Code extensions for the project.
| |-launch.json                             // Debug configuration for VS Code.
| |-settings.json                           // Workspace-specific settings for VS Code.
|-LICENSE                                   // The license governing the use of the project.
|-README.md                                 // The main documentation for the project.
|-astro.config.ts                           // Astro configuration file.
|-ec.config.mjs                             // Expressive Code configuration file.
|-eslint.config.js                          // ESLint configuration for maintaining code quality.
|-package.json                              // Project metadata and dependencies.
|-plugins                                   // Custom plugins for extending Astro project.
| |-index.ts                                // Entry point for plugin registration.
| |-og-template                             // Files related to generating Open Graph images.
| | |-Inter-Regular-24pt.ttf                // Font file used in Open Graph image generation.
| | |-base64.ts                             // Base64-encoded backgrounds for OG image generation.
| | |-markup.ts                             // Template for OG image generation.
| |-remark-directive-sugar.ts               // Plugin for implementing predefined directives.
| |-remark-generate-og-image.ts             // Plugin for automatically generating OG images.
| |-remark-image-container.ts               // Plugin for wrapping images in custom containers.
| |-remark-reading-time.ts                  // Plugin for calculating eading times.
|-pnpm-lock.yaml                            // Lock file ensuring consistent installation of dependencies.
|-public                                    // Publicly accessible static assets.
| |-apple-touch-icon.png                    // Apple touch icon for iOS devices.
| |-favicon.ico                             // Favicon for browsers.
| |-favicon.svg                             // SVG version of the favicon.
| |-icon-192.png                            // 192x192px icon for web apps.
| |-icon-512.png                            // 512x512px icon for web apps.
| |-icon-mask.png                           // Maskable icon for web apps.
| |-og-images                               // Stores automatically generated OG images.
| | |-og-image.png                          // Fallback Open Graph image.
| |-rss-styles.xsl                          // Stylesheet for RSS feed transformation.
|-src                                       // Source directory containing components, pages, and content.
| |-assets                                  // Recommended for organizing and storing images used in posts.
| |-components                              // Astro components used throughout the project.
| | |-backgrounds                           // Background design components.
| | |-base                                  // Base components used across the site.
| | |-toc                                   // Table of contents components.
| | |-views                                 // View components for different content display layouts.
| | |-widgets                               // Widget components for interactive features.
| |-config.ts                               // Configuration file for theme-specific settings.
| |-content                                 // Stores content/data collections.
| | |-blog                                  // For 'blog' content collection (with postSchema).
| | |-changelog                             // For 'changelog' content collection (with postSchema).
| | |-config.ts                             // Configuration for content/data collections.
| | |-home                                  // For 'home' content collection.
| | | |-index.md                            // Homepage content in Markdown.
| | |-projects                              // For 'projects' content collection (with projectsSchema).
| | | |-data.json                           // Data for project listings.
| | |-schema.ts                             // Schema definitions for type-checking frontmatter and JSON.
| | |-streams                               // For 'streams' content collection (with streamsSchema).
| | | |-data.json                           // Data for stream listings.
| |-env.d.ts                                // TypeScript declaration file for environment variables.
| |-layouts                                 // Layout components for different page structures.
| | |-BaseLayout.astro                      // Base layout used across the site.
| | |-StandardLayout.astro                  // Standard layout for most pages.
| | |-TabbedLayout.astro                    // Tabbed layout for easy content navigation.
| |-pages                                   // Directory for generating pages in the Astro project.
| | |-404.mdx                               // Custom 404 error page.
| | |-blog                                  // Blog post pages.
| | | |-[...slug].astro                     // Dynamic routing for individual blog posts.
| | | |-index.mdx                           // Blog index page.
| | |-changelog                             // Changlog post pages.
| | | |-[slug].astro                        // Dynamic routing for individual changlog posts.
| | | |-index.mdx                           // Changlog index page.
| | |-feeds.mdx                             // Feeds page.
| | |-index.mdx                             // Homepage in Markdown.
| | |-manifest.webmanifest.js               // Web app manifest file for mobile and PWA support.
| | |-projects.mdx                          // Projects page.
| | |-prs.mdx                               // Render your GitHub pull requests.
| | |-releases.mdx                          // Render your GitHub releases.
| | |-rss.xml.js                            // RSS feed generator.
| | |-streams.mdx                           // Streams page.
| |-styles                                  // Stylesheets for the project.
| | |-main.css                              // Main styles for the project.
| | |-markdown.css                          // Styles for rendering Markdown content.
| | |-prose.css                             // Prose styles for text content.
| |-types.ts                                // TypeScript types used across the project.
| |-utils                                   // Utility functions and helpers.
| | |-animation.ts                          // Utility functions for Animation.
| | |-common.ts                             // General utility functions.
| | |-datetime.ts                           // Utility functions for date and time.
| | |-github.ts                             // Utility functions for handling GitHub data.
| | |-post.ts                               // Utility functions for working with posts.
| | |-toc.ts                                // Utility functions for generating tables of contents.
|-tsconfig.json                             // TypeScript configuration file.
|-unocss.config.ts                          // UnoCSS configuration for utility-first CSS.
```

The above annotations provide a brief overview of the roles of directories and files in this theme project. Below, you'll find additional details on the project structure along with recommendations for its organization.

## Understanding the `Pages` and `Content` Directories

The [`src/pages/`](https://docs.astro.build/en/basics/project-structure/#srcpages) directory is a critical part of Astro, responsible for generating website pages, with each page corresponding to a route based on its file name. While Astro supports `.astro`, `.md`, and `.mdx` files for this purpose, **this theme exclusively uses `.astro` and `.mdx` files for generating pages** (the reasoning behind this will be explained below).

The [`src/content/`](https://docs.astro.build/en/basics/project-structure/#srccontent) directory is another reserved directory in [Astro 4](https://v4.docs.astro.build/en/guides/content-collections/). It is designated for organizing content collections (supporting `.md` and `.mdx` files) and data collections (supporting `.yaml` and `.json` files). Additionally, it supports [type-checking frontmatter and JSON using zod schemas](https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod). Each new directory created inside `src/content/` represents a new content or data collection (with the directory name serving as the collection name). This is where you’ll store the real content of your site.

It is recommended to review the [Astro's Content Collections Docs](https://docs.astro.build/en/guides/content-collections/) to get a basic understanding of what Collections are and how to define them. 

### Page-Collection Mapping and Zod Schema

Here’s how the theme’s pages correlate to collections and utilize zod schemas for type-checking:

<div class='overflow-x-auto'>

| URL Path                                              | Page File Location                 | Content/Data Collection Path                                       | Zod Schema for Collection |
| ----------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------ | ------------------------- |
| `/`                                                   | `src/pages/index.mdx`              | `src/content/home/`                                                | -                         |
| `/blog`                                               | `src/pages/blog/index.mdx`         | `src/content/blog/`                                                | `postSchema`              |
| `/blog/post-name` <br>`/blog/sequences/one/two/three` | `src/pages/blog/[...slug].astro`   | `src/content/blog/`                                                | `postSchema`              |
| `/projects`                                           | `src/pages/projects.mdx`           | `src/content/projects/`                                            | `projectsSchema`          |
| `/changelog`                                          | `src/pages/changelog/index.mdx`    | `src/content/changelog/`                                           | `postSchema`              |
| `/changelog/xxx`                                      | `src/pages/changelog/[slug].astro` | `src/content/changelog/`                                           | `postSchema`              |
| `/feeds`                                              | `src/pages/feeds.mdx`              | [Via Astro loader](../recreating-current-pages/#feeds-page) | -                         |
| `/streams`                                            | `src/pages/streams.mdx`            | `src/content/streams/`                                             | `streamsSchema`           |
| `/releases`                                           | `src/pages/releases.mdx`           | [Via Astro loader](../customizing-github-activity-pages/)          | -                         |
| `/prs`                                                 | `src/pages/prs.mdx`                | [Via Astro loader](../customizing-github-activity-pages/)          | -                         |

</div>

Further explanation on the decision process of when to use which file format in theme development:

`.astro`: Used for reusable components (`src/components/`), constructing page layouts (`src/layouts/`), and generating multiple static pages through [dynamic routing](https://docs.astro.build/en/guides/routing/#static-ssg-mode) ( `src/pages/blog/[...slug].astro`, as only `.astro` files can handle [Astro API](https://docs.astro.build/en/reference/api-reference/#getstaticpaths) calls).

`.mdx`: Used for generating single static pages through [static routing](https://docs.astro.build/en/guides/routing/#static-routes) (`src/pages/xxx.mdx`), and when component-style markup and JS expressions are needed in posts.

`.md`: Used for authoring text-heavy content like blog posts and documentation where no components are needed (`src/content/blog/xxx.md`, `src/content/home/index.md`, `src/content/changelog/xxx.md`).

`.json`: Used for list data (`src/content/projects/data.json`, `src/content/streams/data.json`).

This structure improves maintainability and scalability, and adherence to the file usage rules in this theme is recommended.

> [!important]- Reasons for `.mdx` in `src/pages/`
> 
> Supports component imports, simplifying the organization of page structures with layout/view components.
> 
> Processed through Astro’s remark and rehype pipelines, enabling custom remark plugins to [automatically generate matching OG images](../about-open-graph-images/#how-this-theme-automatically-generates-og-images) for each page.
> 
> Additionally, the `.mdx` files in the `src/pages/` are also defined as content collections. [More details](../recreating-current-pages/#creating-pages).

## Wrapping Up

This article provides a clear overview of the theme project’s structure and the reasoning behind its organization. By following these guidelines, you can maintain a scalable and manageable setup, while still having the flexibility to adapt it to your needs.

You can also explore [Managing Image Assets](../managing-image-assets/), or dive deeper into the [tech stack](../../projects/) used in the theme to familiarize yourself with its features.

If you encounter any issues, find errors, or see opportunities for improvement as you explore the theme, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions), or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated! 

Thank you for your interest in this project! 😊


