import type { Site, Socials, Layouts, Features } from './types'

export const SITE: Site = {
  website: 'https://example.com',
  base: '/',
  title: 'Astro AntfuStyle Theme',
  description: 'A customizable, feature-rich Astro theme for blog & portfolio',
  author: 'Stephanie Lin',
  lang: 'en',
  ogLocale: 'en_US',
  navBar: [
    {
      type: 'rwd',
      path: '/blog',
      prompt: 'Blog',
      text: 'Blog',
      icon: 'i-ri-file-text-line',
    },
    {
      type: 'rwd',
      path: '/projects',
      prompt: 'Projects',
      text: 'Projects',
      icon: 'i-ri-lightbulb-line',
    },
    {
      type: 'icon',
      path: '/changelog',
      prompt: 'Changelog',
      icon: 'i-ri-file-list-2-line',
    },
  ],
}

export const SOCIALS: Socials[] = [
  {
    title: `${SITE.title}'s Github Repo`,
    href: 'https://github.com/lin-stephanie/astro-antfustyle-theme',
    icon: 'i-uil-github-alt',
    rwd: false,
  },
  {
    title: "Astro's Twitter",
    href: 'https://twitter.com/ASTRO_org',
    icon: 'i-ri-twitter-x-fill',
    rwd: false,
  },
]

export const LAYOUTS: Layouts = {
  tabbedLayoutTabs: [
    { title: 'Changelog', path: '/changelog' },
    { title: 'AstroBlog', path: '/feeds' },
    { title: 'AstroStreams', path: '/streams' },
  ],
  groupItemCols: 3,
}

/**
 * Configure whether to enable certain special features on the website, configuration method:
 *  - Set to `false` or `[false, {...}]` to disable this feature.
 *  - Set to `[true, {...}]` to enable and configure this feature.
 */
export const FEATURES: Features = {
  share: [
    true,
    {
      twitter: [true, '@ste7lin'],
      mastodon: [true, '@ste7lin@fairy.id'],
      facebook: false,
      pinterest: false,
      reddit: false,
      telegram: false,
      whatsapp: false,
      email: false,
    },
  ],
  toc: [
    true,
    {
      position: 'left',
    },
  ],
  ogImage: [
    false,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
    },
  ],
}
