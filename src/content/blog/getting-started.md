---
title: Getting Started
description: How to quickly build your personal website with Astro AntfuStyle Theme
pubDate: 2024-10-04
lastModDate: 2024-12-27
toc: true
share: true
ogImage: true
---

This post outlines the essential steps to quickly set up your personal website using the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme). Each step may involve more detailed content, requiring you to consult other posts for further information.

## Preparation

(_Skip if you’re a developer_) To build your website with this theme, it's recommended to:

- [Install Node.js](https://nodejs.org/en/download/package-manager) for running and developing the project locally.
- [Install pnpm](https://pnpm.io/installation) for managing dependencies.
- [Configure Git](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git) for version control.
- [Register on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) for cloud hosting.
- [Install VS Code](https://code.visualstudio.com/download) for code editing. [Set up Git and sign in to GitHub](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git#_set-up-git-in-vs-code).
- Familiarity with [Astro](https://docs.astro.build/en/getting-started/) and [basic front-end knowledge](https://medium.com/swlh/web-development-fundamentals-for-newcomers-part-1-front-end-2e77f830754e) is a plus.

These are ideal conditions, but feel free to substitute with tools you're comfortable with.

## Create Your Project

Start with the latest theme version using one of two methods:

**Use GitHub**

Create a new repository in your GitHub account by clicking ["Use this template"](https://github.com/new?template_name=astro-antfustyle-theme&template_owner=lin-stephanie) (without commit history) or ["Fork"](https://github.com/lin-stephanie/astro-antfustyle-theme/fork) (preserves commit history) , then clone it locally:

```bash
# If SSH is not configured
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git

# If SSH is configured
git clone git@github.com:[YOUR_USERNAME]/[YOUR_REPO_NAME].git
```

**Use CLI**

Run the following commands in your desired directory to start locally:

```bash
# npm 6.x
npm create astro@latest --template lin-stephanie/astro-antfustyle-theme

# npm 7+, extra double-dash is needed
npm create astro@latest -- --template lin-stephanie/astro-antfustyle-theme

# yarn
yarn create astro --template lin-stephanie/astro-antfustyle-theme

# pnpm
pnpm dlx create-astro --template lin-stephanie/astro-antfustyle-theme
```

> [!tip]- Using Zip Files Instead of Git
>
> If you prefer not to use Git, you can [download the ZIP file](https://github.com/lin-stephanie/astro-antfustyle-theme/archive/refs/heads/main.zip), extract it, and work directly in your local directory.

## Launch the Project

Start the project by running the following commands from the project root (replace `pnpm` with your preferred package manager if needed):

```bash
# Install dependencies
pnpm install

# Start the local dev server (opens at 'http://localhost:4321')
pnpm dev
```

You can explore the current theme freely. Additionally, the following commands are available:

| Command                                     | Description                                                                                                                 |
| :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`                              | Installs dependencies                                                                                                       |
| `pnpm dev`                                  | Starts a local development server at `localhost:4321` and opens the site in your browser                                    |
| `pnpm sync`                                 | Generates TypeScript types for Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync) |
| `pnpm check`                                | Runs diagnostics against your project and reports errors to the console                                                     |
| `pnpm build`                                | Build your production site to `./dist/`                                                                                     |
| `pnpm preview`                              | Preview your build locally, before deploying                                                                                |
| `pnpm format`                               | Check code format with Prettier                                                                                             |
| `pnpm format:write`                         | Format code with Prettier                                                                                                   |
| `pnpm lint`                                 | Check code lint with ESLint                                                                                                 |
| `pnpm lint:fix`                             | Lint code with ESLint                                                                                                       |
| `pnpm astro --help`                         | Get help using the [Astro CLI](https://docs.astro.build/en/reference/cli-reference/)                                        |
| `pnpm toolbar:on`<br>`pnpm toolbar:off`<br> | Enable or disable the [Astro Dev Toolbar](https://docs.astro.build/en/guides/dev-toolbar/)                                  |


> [!warning]- Handling Package Management Alternatives
> 
> This project uses `pnpm` as the package manager, so you’ll need to install it if you haven’t yet.
>
> You can execute `npm install -g pnpm` to [install `pnpm`](https://pnpm.io/installation) globally. Alternatively, you can [enable `corepack`](https://github.com/nodejs/corepack) (allows you to manage package manager versions directly via Node.js) or [install the `ni` tool](https://github.com/antfu-collective/ni) (simplifies running commands across different package managers).
>
> If you want to use a different package manager, make sure to [convert the project to your chosen package manager](../faqs-and-known-issues/#revert-from-pnpm-to-npm-or-yarn) before running its commands.

## Configure the Project

Before configuring, it is advisable to review [**Project Structure**](../project-structure/) for an overview of the project and how it’s organized. Configuration can be done in two steps:

- [**Basic Configuration**](../basic-configuration/): Customize the `src/config.ts` file.
- [**Advanced Configuration**](../advanced-configuration/): Customize the LOGOs, site icons, styles, fonts and more.

## Authoring Content

Once configured, ensure the project is running correctly in your browser, then start creating or migrating your content. Jump to the section you're interested in:

- [**Adding New Posts**](../adding-new-posts/): How to create posts with tips and guidelines.
- [**Recreating Current Pages**](../recreating-current-pages/): Steps to recreate content for the `/`, `/projects`, `/changelog`, `/streams`, `/feeds`, and `404` pages, as well as creating and removing pages.
- :badge[NEW]{color=#f87171}[**Customizing GitHub Activity Pages**](../customizing-github-activity-pages/): Showcase your project releases or pull requests on GitHub.
- [**Markdown Syntax Guide**](../markdown-syntax-guide/): Showcase of Markdown rendering in this theme.
- [**Markdown/MDX Extended Features**](../markdown-mdx-extended-features/): Advanced features like callouts, code blocks, image captions, video embedding, and more.

## Deploy Your Project

Refer to [Astro’s Deployment Guide](https://docs.astro.build/en/guides/deploy/) to choose your preferred platform and follow its guide. Ensure the `SITE.website` option in the `src/config.ts` is correctly set before deploying!

> [!tip]- Deploying Without a Git Repository Using CLI Tools
>
> If you aren’t using GitHub and any other Git provider for deployment, follow the [CLI Deployment Guide](https://docs.astro.build/en/guides/deploy/#cli-deployment) to deploy without a Git repository, such as using [Vercel CLI](https://vercel.com/docs/deployments/deploy-with-vercel-cli#deploying-to-vercel-with-vercel-cli) or [Netlify CLI](https://docs.netlify.com/functions/deploy/#manual-deploys-with-cli).

## Sync Updates

Just like other open-source projects, this theme gets regular bug fixes and feature updates. To keep your customized project up to date, be sure to sync the latest changes. For more details, check out the [sync updates guide](../sync-updates/).

To stay informed about the latest changes, visit the [changelog](../../changelog/) or [releases](https://github.com/lin-stephanie/astro-antfustyle-theme/releases) pages. You can also [subscribe to the theme's RSS feed](../../rss.xml) for updates.

## Next Steps

You can dive deeper into the theme through the following sections:

- [**Managing Image Assets**](../managing-image-assets/): Best practices for using images in Markdown/MDX.
- [**About Open Graph Images**](../about-open-graph-images/): How to customize or auto-generate Open Graph images.
- [**FAQs and Known Issues**](../faqs-and-known-issues/): Get more insights into the theme's details.

Additionally, feel free to explore the theme's [tech stack](../../projects/). For parts not mentioned or clarified in the guide, you might find answers in the [Astro Docs](https://docs.astro.build/en/getting-started/). You can also follow the [Astro Blog](https://astro.build/blog/) or join the [Astro Lounge](https://discord.com/invite/grF4GTXXYm) community.

## Wrapping Up

Congratulations on completing the setup! Hopefully, this theme meets your needs.

If you encounter any issues, find errors, or see opportunities for improvement, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is invaluable to making this theme even better! 🌟

Thank you for taking the time to read this guide. Happy coding and enjoy building with the Astro AntfuStyle Theme! ❤️ 
