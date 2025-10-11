---
title: Customizing GitHub Activity Pages
description: How to showcase your own GitHub releases or pull requests in Astro AntfuStyle Theme
pubDate: 2023-12-01
lastModDate: 2025-04-30
ogImage: true
toc: true
share: true
giscus: true
search: true
---

This post guides you on recreating the [`/releases`](../../releases/) and [`/prs`](../../prs/) pages in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) to showcase your GitHub releases and pull requests.

## Configure the Loaders

The `/releases` and `/prs` pages use [astro-loader-github-releases](https://www.npmjs.com/package/astro-loader-github-releases) and [astro-loader-github-prs](https://www.npmjs.com/package/astro-loader-github-prs) to fetch data for `releases` and `prs` content collections. In `src/content.config.ts`, configure these loaders to fetch your GitHub activity data as described in their README:

```ts title='src/content.config.ts'
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

> [!warning]- A GitHub PAT is needed for PRs and for releases in `mode: 'repoList'`
>
> - Create a [GitHub PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with at least `repo` scope permissions to authenticate requests.
> - In the project root, create a `.env` file and set the `GITHUB_TOKEN` environment variable to your PAT.
> - Make sure `.env` is ignored by Git (it's included in `.gitignore` by default).
> - Additional reference: [Setting Environment Variables](https://docs.astro.build/en/guides/environment-variables/#setting-environment-variables)

> [!tip]- Use Astro loaders to fetch external data (may affect startup time)
>  
> `githubReleasesLoader` and `githubReleasesLoader` are both [Astro loaders](https://docs.astro.build/en/reference/content-loader-reference/#what-is-a-loader). Built with the [Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/), Astro loaders enable seamless data fetching from various sources as content collections. This API was first introduced in [Astro 4.14](https://astro.build/blog/astro-4140/#experimental-content-layer-api) and became stable in [Astro 5](https://astro.build/blog/astro-5/#content-layer).
> 
> Starting in Astro 5, the dev server address is shown only after external resources are loaded and content is synced. Using Astro loaders may delay server startup.

## Update Page Content

Depending on your loader configuration, you can modify the settings in `src/config.ts` that affect the UI of these two pages. Refer to the [`UI.githubView` option](./basic-configuration/#githubview) for specific details.

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

Additionally, to remove a page, uninstall the loader, delete its collection from `src/content.config.ts`, and remove the `.mdx` file in `/page`.

## Wrapping Up

The theme uses [SSG (Static Site Generation)](https://developer.mozilla.org/en-US/docs/Glossary/SSG), so `/releases` and `/prs` updates rely on periodic rebuilds, which may cause slight delays (acceptable for GitHub data). For real-time updates, keep the current UI but switch to [SSR (Server-side Rendering)](https://docs.astro.build/en/guides/on-demand-rendering/). Check the official docs for details. 

Looking forward, the theme will continue leveraging Astro loaders to enable showcasing diverse external personal data. 🧩

:::details
::summary[Changelog]
2025-03-31
- Add: A GitHub PAT Is Needed for PRs and for Releases in `mode: 'repoList'`

2025-04-30
- Changes for Astro 5.7

[View full history](https://github.com/lin-stephanie/astro-antfustyle-theme/commits/main/src/content/blog/customizing-github-activity-pages.md)
:::
