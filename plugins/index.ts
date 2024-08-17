import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import remarkDirective from 'remark-directive'
import remarkImageContainer from './remark-image-container'
import remarkImgattr from 'remark-imgattr'
import remarkReadingTime from './remark-reading-time'
import remarkGenerateOgImage from './remark-generate-og-image'

import rehypeCallouts from 'rehype-callouts'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { FEATURES } from '../src/config'
import type { RemarkPlugins, RehypePlugins } from 'astro'

export const remarkPlugins: RemarkPlugins = [
  // https://github.com/remarkjs/remark-directive
  remarkDirective,
  remarkImageContainer,
  // https://github.com/OliverSpeir/remark-imgattr
  remarkImgattr,
  remarkReadingTime,
  ...(Array.isArray(FEATURES.ogImage) && FEATURES.ogImage[0]
    ? [remarkGenerateOgImage]
    : []),
]

export const rehypePlugins: RehypePlugins = [
  // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
  rehypeHeadingIds,
  // https://github.com/lin-stephanie/rehype-callouts
  [
    rehypeCallouts,
    {
      theme: 'obsidian',
    },
  ],

  // https://github.com/rehypejs/rehype-external-links
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],

  // https://github.com/rehypejs/rehype-autolink-headings
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: {
        class: 'header-anchor',
        ariaHidden: 'true',
        tabIndex: 0,
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
]
