import type { Config } from './types'

const config: Config = {
  site: {
    url: 'http://example.com',
    name: 'Astro AntfuStyle Theme',
    author: 'Stephanie Lin',
    socials: [
      {
        name: 'Twitter',
        href: 'https://twitter.com/ASTRO_org',
        icon: 'i-ri-twitter-x-fill',
        rwd: false,
      },
      {
        name: 'Github Repo',
        href: 'https://github.com/lin-stephanie',
        icon: 'i-uil-github-alt',
        rwd: false,
      },
    ],
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
    },
  },
  features: {
    share: [
      true,
      {
        twitter: '@ste7lin',
        mastodon: '@antfu@m.webtoo.ls',
      },
    ],
  },
}

export default config
