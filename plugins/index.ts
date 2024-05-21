import type { RemarkPlugins, RehypePlugins } from 'astro'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const remarkPlugins: RemarkPlugins = []

export const rehypePlugins: RehypePlugins = [
  rehypeHeadingIds,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'prepend', // default
      properties: {
        class: 'header-anchor',
        ariaHidden: 'true', // default
        tabIndex: -1, // default
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
]
