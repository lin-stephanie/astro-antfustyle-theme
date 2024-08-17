import type { Config, Socials } from './types'

const config: Config = {
  site: {
    url: 'http://example.com',
    name: 'Astro AntfuStyle Theme',
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
  },
  pages: {
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
  },
  features: {
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
        authorOrBrand: 'Astro AntfuStyle Theme',
        fallbackTitle:
          'A customizable, feature-rich Astro theme for blog and portfolio',
        fallbackBgType: 'plum',
      },
    ],
  },
}

export const SOCIALS: Socials[] = [
  {
    title: `${config.site.author}'s Twitter`,
    href: 'https://twitter.com/ASTRO_org',
    icon: 'i-ri-twitter-x-fill',
    rwd: false,
  },
  {
    title: `${config.site.name}'s Github Repo`,
    href: 'https://github.com/lin-stephanie',
    icon: 'i-uil-github-alt',
    rwd: false,
  },
]

export default config
