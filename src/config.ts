import type { Site, Ui, Features } from './types'

export const SITE: Site = {
  website: 'https://astro-antfustyle-theme.vercel.app/',
  base: '/',
  title: 'Astro AntfuStyle Theme',
  description:
    'A customizable, feature-rich Astro theme for blog and portfolio creation',
  author: 'Stephanie Lin',
  lang: 'en',
  ogLocale: 'en_US',
}

export const UI: Ui = {
  internalNavs: [
    {
      path: '/blog',
      title: 'Blog',
      displayMode: 'alwaysText',
      text: 'Blog',
      // icon: 'i-ri-article-line',
    },
    {
      path: '/projects',
      title: 'Projects',
      displayMode: 'alwaysText',
      text: 'Projects',
      // icon: 'i-ri-lightbulb-line',
    },
    {
      path: '/changelog',
      title: 'Changelog',
      displayMode: 'iconToTextOnMobile',
      text: 'Changelog',
      icon: 'i-ri-draft-line',
    },
  ],
  socialLinks: [
    {
      link: 'https://github.com/lin-stephanie/astro-antfustyle-theme',
      title: 'AntfuStyle on Github',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
    {
      link: 'https://github.com/lin-stephanie/astro-antfustyle-theme',
      title: `${SITE.author} on Twitter`,
      displayMode: 'alwaysIcon',
      icon: 'i-ri-twitter-x-fill',
    },
  ],
  navBarLayout: {
    left: [],
    right: [
      'internalNavs',
      'socialLinks',
      'searchButton',
      'themeButton',
      'rssLink',
    ],
    mergeOnMobile: true,
  },
  tabbedLayoutTabs: [
    { title: 'Changelog', path: '/changelog' },
    { title: 'AstroBlog', path: '/feeds' },
    { title: 'AstroStreams', path: '/streams' },
  ],
  groupView: {
    maxGroupColumns: 3,
    showGroupItemColorOnHover: true,
  },
  githubView: {
    monorepos: [
      'withastro/astro',
      'withastro/starlight',
      'delucis/astro-embed',
      'ascorbic/astro-loaders',
      'lin-stephanie/astro-loaders',
    ],
    mainLogoOverrides: [
      [
        /^@astrojs\/starlight(-.*)?/,
        'https://starlight.astro.build/favicon.svg',
      ],
    ],
    subLogoMatches: [
      [/.*theme.*/, 'i-unjs:theme-colors'],
      [/.*github.*/, 'https://www.svgrepo.com/show/475654/github-color.svg'],
      [/.*tweet|twitter.*/, 'i-logos:twitter'],
      [/.*bluesky.*/, 'i-logos:bluesky'],
      [/.*baseline.*/, 'i-logos:baseline'],
      [/.*youtube.*/, 'i-logos:youtube-icon'],
      [/.*vimeo.*/, 'i-logos:vimeo-icon'],
      [/.*airtable.*/, 'i-logos:airtable'],
    ],
  },
}

/**
 * Configures whether to enable special features:
 *  - Set to `false` or `[false, {...}]` to disable the feature.
 *  - Set to `[true, {...}]` to enable and configure the feature.
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
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'left',
      displayMode: 'hover',
    },
  ],
  ogImage: [
    true,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
    },
  ],
}
