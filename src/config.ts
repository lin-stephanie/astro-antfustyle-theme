import type { Site, Socials, Pages, Features } from './types'

export const SITE: Site = {
  website: 'http://example.com',
  title: 'Astro AntfuStyle Theme',
  description:
    'A customizable, feature-rich Astro theme for blog and portfolio',
  author: 'Stephanie Lin',
  navBar: [
    {
      type: 'rwd',
      path: '/blog',
      prompt: 'Blog',
      text: 'Blog',
      icon: 'i-ri-article-line',
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
      path: '/demos',
      prompt: 'Demos',
      icon: 'i-ri-screenshot-line',
    },
    {
      type: 'icon',
      path: '/chat',
      prompt: 'Contact Me',
      icon: 'i-ri-chat-1-line',
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

export const PAGES: Pages = {
  about: {
    title: '',
    description: 'About',
    // bgType: 'plum',
  },
  blog: {
    title: 'Blog',
    description: 'Blog',
    // bgType: 'rose',
  },
  projects: {
    title: 'Projects',
    description: 'Projects',
    // bgType: 'dot',
  },
  404: {
    title: '',
    description: 'Not Found',
    // bgType: 'particle',
  },
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
      telegram: false,
      whatsapp: false,
      facebook: false,
      pinterest: false,
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
