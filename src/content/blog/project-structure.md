---
title: Project Structure
description: Introduces the structure of the Astro AntfuStyle Theme
pubDate: 2024-10-03
lastModDate: ''
toc: true
share: true
ogImage: true
---


This post will quickly familiarize you with the entire structure of the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme)project.

## Project Structure Overview

Opening the project in your editor will reveal the following folders and files:

==（修改结构）==

```md
astro-antfustyle-theme                             
├─ .editorconfig                                   // Configuration for ensuring consistent coding styles across editors
├─ .prettierrc                                     // Configuration for code formatter Prettier
├─ .vscode                                         // VS Code settings and configurations
│  ├─ astro-antfustyle-theme.code-snippets         // VS Code snippets for this project
│  ├─ extensions.json                              // Recommended VS Code extensions
│  ├─ launch.json                                  // Debug configurations for VS Code
│  └─ settings.json                                // Project-specific VS Code settings
├─ README.md                                       // Project overview and instructions
├─ astro.config.ts                                 // Configuration for Astro project
├─ ec.config.mjs                                   // Configuration for astro-expressive-code integration
├─ eslint.config.js                                // Configuration for code linting ESlint
├─ package.json                                    // Project metadata and dependencies
├─ plugins                                         // Custom remark plugins for the project
│  ├─ index.ts                                     // Exports all plugins
│  ├─ og-template                                  // Saves assets for Open Graph image generation
│  │  ├─ Inter-Regular-24pt.ttf                    // 
│  │  ├─ base64.ts                                 //
│  │  └─ markup.ts                                 //
│  ├─ remark-directive-sugar.ts                    // Enhances markdown syntax flexibility base on remark-directive
│  ├─ remark-generate-og-image.ts                  // Generates Open Graph images
│  ├─ remark-image-container.ts                    // Adds container elements for images
│  └─ remark-reading-time.ts                       // Calculates reading time for posts
├─ pnpm-lock.yaml                                  // Dependency versions lock file for pnpm
├─ public                                          // Static files served directly
│  ├─ apple-touch-icon.png                         // Icon for iOS devices
│  ├─ favicon.svg                                  // Browser tab icon
│  └─ og-images                                    // Storage for auto-generated Open Graph images
│     └─ og-image.png                              // Default Open Graph image
├─ src                                             // Source directory for all the project-specific code
│  ├─ assets                                       // Contains static assets like images and fonts
│  │  ├─ mental-health-oss                         // Saves assets relative to 'mental-health-oss' post
│  │  │  └─ oss-mental-iron-triangle.svg           // 
│  │  ├─ why-not-prettier                          //
│  │  │  └─ prettier-print-width.png               //
│  │  └─ why-reproductions-are-required            //
│  │     ├─ github-inbox-dark.png                  //
│  │     ├─ github-inbox-light.png                 //
│  │     ├─ issue-close-without-repro-dark.png     //
│  │     └─ issue-close-without-repro-light.png    //
│  ├─ components                                   // Astro components for the UI
│  │  ├─ Background.astro                          //
│  │  ├─ Categorizer.astro                         //
│  │  ├─ Footer.astro                              //
│  │  ├─ Group.astro                               //
│  │  ├─ GroupItem.astro                           //
│  │  ├─ Head.astro                                //
│  │  ├─ List.astro                                //
│  │  ├─ ListItem.astro                            //
│  │  ├─ NavBar.astro                              //
│  │  ├─ RenderPost.astro                          //
│  │  ├─ base                                      // Base components used across the site
│  │  │  └─ Link.astro                             //
│  │  ├─ backgrounds                               // Background specific components (Dot, Particle, Plum, Rose)
│  │  │  ├─ Dot.astro                              //
│  │  │  ├─ Particle.astro                         //
│  │  │  ├─ Plum.astro                             //
│  │  │  └─ Rose.astro                             //
│  │  ├─ toc                                       // Table of contents component
│  │  │  ├─ Toc.astro                              //
│  │  │  └─ TocItem.astro                          //
│  │  ├─ views                                     // View components for different types of content
│  │  └─ widgets                                   // Smaller, reusable UI components
│  │     ├─ BackLink.astro                         //
│  │     ├─ LogoButton.astro                       //
│  │     ├─ SearchSwitch.astro                     //
│  │     ├─ ShareLink.astro                        //
│  │     ├─ ThemeSwitch.astro                      //
│  │     └─ ToTopButton.astro                      //
│  ├─ config.ts                                    // Configuration file for theme-specific settings
│  ├─ content                                      // Stores content collections and an optional collections configuration file
│  │  ├─ about                                     // For 'stremas' collection (without schema-defined)
│  │  │  └─ index.md                               //
│  │  ├─ blog                                      // For 'blog' collection (with schema-defined)
│  │  │  ├─ async-with-composition-api.md          //
│  │  ├─ config.ts                                 // Configuration for content/data collections
│  │  ├─ projects                                  // For 'projects' collection (with schema-defined)
│  │  │  └─ data.json                              //
│  │  ├─ schema.ts                                 // Defines TypeScript schemas for the content
│  │  └─ streams                                   // For 'stremas' collection (with schema-defined)
│  │     └─ data.json                              //
│  ├─ env.d.ts                                     // Stores environment variables
│  ├─ layouts                                      // Defines the UI structure shared by one or more pages
│  │  ├─ BaseLayout.astro                          // Base layout used across the site
│  │  ├─ StandardLayout.astro                      // For regular content pages (used in `/`, `/blog/[slug]`)
│  │  ├─ TabbedLayout.astro                        // For tabbed content pages (used in `/changelog`, `/astro-blog`, `/astro-streams`)
│  │  └─ WideLayout.astro                          // For larger displays(used in `/projects`)
│  ├─ pages                                        // Markdown/MDX and Astro files for site pages
│  │  ├─ 404.mdx                                   // For custom 404 error page
│  │  ├─ blog                                      // For blog-related pages
│  │  │  ├─ [slug].astro                           // Dynamic route for individual blog posts
│  │  │  └─ index.mdx                              // Index page for blog listing
│  │  ├─ changelog.mdx                             // 
│  │  ├─ feeds.mdx                                 // 
│  │  ├─ index.mdx                                 //
│  │  ├─ projects.mdx                              //
│  │  └─ streams.mdx                               //
│  ├─ styles                                       // Stores CSS files for styling
│  │  ├─ main.css                                  // 
│  │  ├─ markdown.css                              //
│  │  └─ prose.css                                 //
│  ├─ types.ts                                     // TypeScript definitions specific to the project
│  └─ utils                                        // Utility functions and helpers
│     └─ index.ts                                  // Main entry point for utility functions
├─ tsconfig.json                                   // Configuration for TypeScript
└─ unocss.config.ts                                // Configuration for UnoCSS

```

The above annotations provide a brief overview of the roles of directories and files in this theme project. Below, you'll find additional details on the project structure along with recommendations for its organization.

## Understanding the `Pages` and `Content` Directories

The [`src/pages/`](https://docs.astro.build/en/basics/project-structure/#srcpages) directory is a critical part of Astro, responsible for generating website pages, with each page corresponding to a route based on its file name. While Astro supports `.astro`, `.md`, and `.mdx` files for this purpose, **this theme exclusively uses `.astro` and `.mdx` files** for generating pages (the reasoning behind this will be explained below).

The [`src/content/`](https://docs.astro.build/en/basics/project-structure/#srccontent) directory is another reserved directory in Astro. It is designated for organizing content collections (supporting `.md` and `.mdx` files) and data collections (supporting `.yaml` and `.json` files). Additionally, it supports [type-checking frontmatter and JSON using zod schemas](https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod). Each new directory created inside `src/content/` represents a new content or data collection (**with the directory name serving as the collection name**). This is where you’ll store the real content of your site.

It is recommended to review the [Astro's Content Collections Docs](https://docs.astro.build/en/guides/content-collections/) to get a basic understanding of what Collections are and how to define them. 

### Page-Collection Mapping and Zod Schema

Here’s how the theme’s pages correlate to collections and utilize zod schemas for type-checking:

<div class='overflow-x-auto'>

| Page Path                                              | Collection Location for Content Display | Collection Location for Content Display | Collection Includes zod Schema? | Zod Schema（found in `src/content/schema.ts`） |
| ------------------------------------------------------ | --------------------------------------- | --------------------------------------- | ------------------------------- | -------------------------------------------- |
| `/`                                                    | `src/pages/index.mdx`                   | `src/content/home/`                     | No                              | -                                            |
| `/blog`                                                | `src/pages/blog/index.mdx`              | `src/content/blog/`                     | Yes                             | `postSchema`                                 |
| `/blog/post-name` <br> `/blog/sequences/one/two/three` | `src/pages/blog/[...slug].astro`        | `src/content/blog/`                     | Yes                             | `postSchema`                                 |
| `/projects`                                            | `src/pages/projects.mdx`                | `src/content/projects/`                 | Yes                             | `projectsSchema`                             |
| `/changelog`                                           | `src/pages/changelog.mdx`               | `src/content/changelog/`                | Yes                             | `postSchema`                                 |
| `/feeds`                                               | `src/pages/feeds.mdx`                   | ==Data fetched externally==             | No                              | -                                            |
| `/streams`                                             | `src/pages/streams.mdx`                 | `src/content/streams/`                  | Yes                             | `streamsSchema`                              |

</div>

Further explanation on the decision process of when to use which file format in theme development:

- `.astro`: Used for reusable components (`src/components/`), constructing page layouts (`src/layouts/`), and generating multiple static pages through [dynamic routing](https://docs.astro.build/en/guides/routing/#static-ssg-mode) ( `src/pages/blog/[...slug].astro`, as only `.astro` files can handle [Astro API](https://docs.astro.build/en/reference/api-reference/#getstaticpaths) calls).
- `.mdx`: Used for generating single static pages through [static routing](https://docs.astro.build/en/guides/routing/#static-routes) (`src/pages/xxx.mdx`), and when component-style markup and JS expressions are needed in posts (this theme does not cover such usage).
- `.md`: Used for authoring text-heavy content like blog posts and documentation where no components are needed (`src/content/blog/xxx.md`, `src/content/home/index.md`, `src/content/changelog/xxx.md`).
- `.json`: Used for list data (`src/content/projects/data.json`, `src/content/streams/data.json`).

This structure improves maintainability and scalability, and adherence to the file usage rules in this theme is recommended.

==（修改 callouts）==

> [!important]- Reasons for `.mdx` in `src/pages/`
> 
> Supports component imports, simplifying the organization of page structures with layout/view components.
> 
> Processed through Astro’s remark and rehype pipelines, enabling custom remark plugins to ==automatically generate matching OG images== for each page.
> 
> Additionally, the `.mdx` files in the `src/pages/` are also defined as content collections. See ==Recreate Current Pages - Creating Pages== for more details.

## Wrapping Up

This article provides a clear overview of the theme project’s structure and the reasoning behind its organization. By following these guidelines, you can maintain a scalable and manageable setup, while still having the flexibility to adapt it to your needs.

You can also explore ==Managing Image Assets==, or dive deeper into the ==tech stack== used in the theme to familiarize yourself with its features.

If you encounter any issues, find errors, or see opportunities for improvement as you explore the theme, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme), or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated! 

Thank you for your interest in this project!


