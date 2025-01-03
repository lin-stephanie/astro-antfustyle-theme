---
title: Customizing GitHub Activity Pages
subtitle: ''
description: How to showcase your own GitHub releases or pull requests in Astro AntfuStyle Theme
pubDate: 2023-12-01
lastModDate: 2024-12-27
toc: true
share: true
ogImage: true
---

This post guides you on recreating the [`/releases`](../../releases) and [`/prs`](../../prs) pages in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) to showcase your GitHub releases and pull requests.

## Configure the Loaders

The `/releases` and `/prs` pages use [astro-loader-github-releases](https://www.npmjs.com/package/astro-loader-github-releases) and [astro-loader-github-prs](https://www.npmjs.com/package/astro-loader-github-prs) to fetch data for `releases` and `prs` content collections. In `src/content/config.ts`, configure these loaders to fetch your GitHub activity data as described in their README:

```ts title='src/content/config.ts'
import { githubReleasesLoader } from 'astro-loader-github-releases'
import { githubPrsLoader } from 'astro-loader-github-prs'

...

const releases = defineCollection({
  loader: githubReleasesLoader({
    // Configure to fetch your desired GitHub release data
  }),
})

const prs = defineCollection({
  loader: githubPrsLoader({
    // Configure to fetch your desired GitHub PRs data
  }),
})

export const collections = {
  ...
  releases,
  prs,
}
```

> [!tip]- Utilizing Astro Loaders for GitHub Data Integration
> 
> `githubReleasesLoader` and `githubPrsLoader` are [Astro loaders](https://docs.astro.build/en/reference/content-loader-reference/#what-is-a-loader) built with the Content Loader API, enabling data fetching from various sources as content collections. This API, introduced in [Astro 4.14](https://astro.build/blog/astro-4140/#experimental-content-layer-api), became stable in [Astro 5](https://astro.build/blog/astro-5/#content-layer).

## Update Page Content

Depending on your loader configuration, you can modify the settings in `src/config.ts` that affect the UI of these two pages. Refer to the ==[`UI.githubView` configuration](../basic-configuration/#githubview) for specific details.

In `src/pages/releases.mdx` and `src/pages/prs.mdx`, you can update the frontmatter and directly modify the titles and subtitles rendered on the pages.

In `src/components/views/GithubView.astro`, you can remove or update the footer text displayed on both pages.

## Automate Data Refreshing

[Astro loaders fetch data only during builds](https://docs.astro.build/en/reference/content-loader-reference/#object-loaders). To refresh `/releases` and `/prs` after deployment, schedule a rebuild using your hosting platform. 

This theme is hosted on GitHub, with the Live Demo deployed on Vercel. The rebuild is triggered via a GitHub workflow that periodically calls Vercel’s deploy hook. 

If your setup is similar, start by [creating a Vercel deploy hook](https://vercel.com/docs/deployments/deploy-hooks#creating-a-deploy-hook) (For Netlify, [create a build hook](https://docs.netlify.com/configure-builds/build-hooks/)), then [store it as a secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) in your GitHub repository, naming it `VERCEL_DEPLOY_HOOK`. Finally, update the GitHub workflow file `.github/workflows/scheduled-vercel-deploy.yml` to periodically call the deploy hook:

```yml title='.github/workflows/scheduled-vercel-deploy.yml' del={12}
name: Scheduled Vercel Deployment

on:
  schedule:
    # https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule
    # Adjust the time for triggering this workflow
    - cron: '0 1 * * 6'

jobs:
  deploy:
    # Remove the following line or modify it for your repository
    if: github.repository == 'lin-stephanie/astro-antfustyle-theme'
    runs-on: ubuntu-latest

    steps:
      - name: Trigger deployment
        env:
          DEPLOY_HOOK_URL: ${{ secrets.VERCEL_DEPLOY_HOOK }}
        run: |
          if [ -z "$DEPLOY_HOOK_URL" ]; then
            echo "Error: Vercel deploy hook URL is not set."
            exit 1
          fi
          curl -X POST "$DEPLOY_HOOK_URL"
          echo "Deployment triggered successfully."
```

Additionally, to remove a page, uninstall the loader, delete its collection from `src/content/config.ts`, and remove the `.mdx` file in `/page`.

## Wrapping Up

The theme uses [SSG (Static Site Generation)](https://developer.mozilla.org/en-US/docs/Glossary/SSG), so `/releases` and `/prs` updates rely on periodic rebuilds, which may cause slight delays (acceptable for GitHub data). For real-time updates, keep the current UI but switch to [SSR (Server-side Rendering)](https://docs.astro.build/en/guides/on-demand-rendering/). Check the official docs for details. 

Looking forward, the theme will continue leveraging Astro loaders to enable showcasing diverse external personal data. 🧩
