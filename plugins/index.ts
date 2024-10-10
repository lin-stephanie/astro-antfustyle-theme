import { visit } from 'unist-util-visit'
import remarkDirective from 'remark-directive'
import remarkDirectiveSugar from './remark-directive-sugar'
import remarkImageContainer from './remark-image-container'
import remarkImgattr from 'remark-imgattr'
import remarkMath from 'remark-math'
import remarkReadingTime from './remark-reading-time'
import remarkGenerateOgImage from './remark-generate-og-image'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeCallouts from 'rehype-callouts'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { FEATURES } from '../src/config'
import type { RemarkPlugins, RehypePlugins } from 'astro'

export const remarkPlugins: RemarkPlugins = [
  // https://github.com/remarkjs/remark-directive
  remarkDirective,
  remarkDirectiveSugar,
  remarkImageContainer,
  // https://github.com/OliverSpeir/remark-imgattr
  remarkImgattr,
  // https://github.com/remarkjs/remark-math/tree/main/packages/remark-math
  remarkMath,
  remarkReadingTime,
  ...(Array.isArray(FEATURES.ogImage) && FEATURES.ogImage[0]
    ? [remarkGenerateOgImage]
    : []),
]

export const rehypePlugins: RehypePlugins = [
  // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
  rehypeHeadingIds,
  // https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
  rehypeKatex,
  // https://github.com/lin-stephanie/rehype-callouts
  [
    rehypeCallouts,
    {
      theme: 'vitepress',
    },
  ],

  // https://github.com/rehypejs/rehype-external-links
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: 'noopener noreferrer',
      // @ts-expect-error (import('hast').Element)
      properties: (node) => {
        let content = ''
        visit(node, 'text', (textNode) => {
          content += textNode.value
        })
        return {
          ariaLabel: `${content && `Link to: ${content} `}(external link)`,
        }
      },
    },
  ],

  // https://github.com/rehypejs/rehype-autolink-headings
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      // @ts-expect-error (import('hast').Element)
      properties: (node) => {
        let content = ''
        visit(node, 'text', (textNode) => {
          content += textNode.value
        })
        return {
          'class': 'header-anchor',
          'tabIndex': 0,
          'ariaHidden': 'false',
          'ariaLabel': `Link to heading: ${content}`,
          'data-pagefind-ignore': true,
        }
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
]
