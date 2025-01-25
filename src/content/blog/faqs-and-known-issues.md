---
title: FAQs and Known Issues
description: FAQs and known issues in Astro AntfuStyle Theme
pubDate: 2020-01-01
lastModDate: ''
toc: true
share: true
ogImage: true
---

## FAQs

### Lighthouse Scores

:::details
::summary[Testing the `/projects` page with the `'dot'` background results in:]
![Lighthouse Scores](../../assets/faqs-and-known-issues/lighthouse-scores.png)
:::

The accessibility score is not perfect due to "Background and foreground colors do not have a sufficient contrast ratio", which is a result of the theme's styling. If you don’t mind this, the theme performs very well in Lighthouse. A high-contrast version is planned.

You can also check the live demo’s performance on PageSpeed Insights: [https://pagespeed.web.dev/](https://pagespeed.web.dev/)

### About SEO and Accessibility

The SEO functionality of the theme is enhanced by integrating the official [@astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap) and the third-party [astro-robots-txt](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt), which automatically generate `sitemap.xml` and `robots.txt` files, respectively. Additionally,  the theme can generate and configure [Google JSON-LD Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) in the page headers for different types of content, helping search engines better understand and display your site's information accurately.

As for accessibility, the theme is tested using the [Sa11y](https://sa11y.netlify.app/) tool, making it easy for you to check your content --- _a simple yet effective assistant_.

### Revert from `pnpm` to `npm` or `yarn`

- Delete the `node_modules` directory and `pnpm_lock.yaml` from the project root.
- Replace `pnpm` with `npm/yarn` in `package.json` (this step isn't needed for this project).
- Run `npm install` or `yarn install`.

### Path Aliases

Path alias configuration:

```ts title='tsconfig.json' {6}
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

Aliases work in files processed by Vite and TypeScript under `src/`, but not in files like `plugins/remark-generate-og-image.ts` or `unocss.config.ts` unless you use [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths).

**Example:**

```typescript title='src/components/MyComponent.tsx'
import { formatDate } from '~/utils/helpers';

function MyComponent() {
  return <div>{formatDate(new Date())}</div>;
}

export default MyComponent;
```

### Icon Usage

This theme has [@unocss/preset-icons](https://www.npmjs.com/package/@unocss/preset-icons) and [@iconify-json](https://www.npmjs.com/package/@iconify/json) pre-installed and configured, allowing the use of icons wherever needed. According to UnoCSS specs, icons must follow the format `i-<collection>-<icon>` or `i-<collection>:<icon>`. Examples include:

- `"i-ri:twitter-x-fill"`
- `"i-ri-twitter-x-fill"`
- `"i-mdi:github"`
- `"i-mdi-github"`

You can explore more available icon sets on [icon-sets.iconify.design](https://icon-sets.iconify.design/). Once you've found the desired icon, select it, then copy the UnoCSS icon name from the "Icon" dropdown.

For more details on usage, please refer to the [UnoCSS - Icons preset](https://unocss.dev/presets/icons#icons-preset). 

### Post Date Format

The default date format is `MMM D, YYYY`, handled by `formatDate` in `src/utils/index.ts`. Adjust as needed using [day.js format list](https://day.js.org/docs/en/display/format#list-of-all-available-formats).

### Page Backgrounds

Backgrounds, except for 'rose', use custom elements with animations that stop to prevent memory leaks. No major performance issues have been reported, but please [report any problems](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) if you encounter theme.

Currently, backgrounds are not supported for pages at the `/blog/[...slug]` path. If you wish to add one, you can modify the `src/pages/blog/[...slug].astro` file like this:

```astro title='src/pages/blog/[...slug].astro' ins={8}
...
<BaseLayout
  title={frontmatter.title}
  description={frontmatter.description}
  ogImage={frontmatter.ogImage}
  {pubDate}
  {lastModDate}
  bgType='plum'  // 'dot', 'rose', 'particle'  
>
  ...
</BaseLayout>
```

Additionally, you can directly modify the constants in each background component (`/src/components/backgrounds/`) to customize the animation effects.

> [!warning]- CPU Usage Warning for 'dot' Background
>
> The 'Dot' background animation can be CPU-intensive, potentially causing slowdowns or noisy fans on less powerful devices ([#1](https://github.com/lin-stephanie/astro-antfustyle-theme/issues/1), [antfu/antfu.me#86](https://github.com/antfu/antfu.me/issues/86)). Despite adjustments to reduce the load ([8fb85e1](https://github.com/lin-stephanie/astro-antfustyle-theme/commit/8fb85e1)), the effect may still be noticeable. If this is an issue, consider using a different background.

### Search Functionality

The theme utilizes :link[Pagefind]{id=CloudCannon/pagefind} to enable search functionality.

You can control the search index dynamically in `src/layouts/StandardLayout.astro`. By default, only blog posts are searchable (set in `src/pages/blog/[...slug].astro` with `isSearchable={true}`). You can adjust this by passing the `isSearchable` prop to the StandardLayout component, or for more custom search options, check out [Configuring what content is indexed](https://pagefind.app/docs/indexing/). 

Search for `data-pagefind-` in the editor to see the current setup.

> [!warning]- Pagefind Works after Build
>
> Pagefind works only after the site is fully built. Test it by running `pnpm build && pnpm preview` after building the Astro site.

### Image Zoom

The theme uses :link[medium-zoom]{id=francoischalifour/medium-zoom} to zoom images that match the `.prose img:not(.no-zoom)` selector. To disable zoom for a specific image, add the `no-zoom` class. 

Configuration can be done in `src/layouts/BaseLayout.astro`.

### RSS Subscription Scope

Currently, the theme's RSS configuration (see `src/pages/rss.xml.js`) only allows visitors to subscribe to posts under `src/content/blog/`.

If you want to further customize which content on the site can be subscribed to, refer to the theme’s integrated [@astrojs/rss](https://www.npmjs.com/package/@astrojs/rss) documentation and [Astro's official guide](https://docs.astro.build/en/guides/rss/).

If the official integration doesn’t meet your needs, you may consider using [jpmonette/feed](https://github.com/jpmonette/feed). Additionally, community-provided [RSS Recipes](https://docs.astro.build/en/community-resources/content/#rss) are also worth checking out.

### Language-specific Build

Localization support will be added soon. For now, manual changes are required.

## Known Issues

Here are some unresolved issues found during theme development. If you have a solution, feel free to [submit a PR](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls) --- much appreciated!

1. No hints or error warnings when passing props in MDX components.

2. Even if `bgType` is not set to `'dot'` or `'particle'`, the JS for these backgrounds and p5.js is still bundled in the Astro build. However, it's not loaded by the browser unless used, so it generally doesn’t affect performance. (Attempts to load :link[p5.js]{id=processing/p5.js} from a CDN instead of importing it as a module caused errors: "p5 is not defined").

3. Automatically generated OG Images don’t support emojis, and titles may occasionally overflow the image boundary, making them partially invisible, despite margins and padding being set in the template.

Thank you for taking the time to explore and use the Astro AntfuStyle Theme. 

If you encounter any issues, find errors, or see opportunities for improvement, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls).

Let’s keep pushing forward and making great things happen --- your input is always welcome! 🙌
