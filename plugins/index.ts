import type { RemarkPlugins, RehypePlugins } from 'astro'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const remarkPlugins: RemarkPlugins = []

export const rehypePlugins: RehypePlugins = [
  rehypeHeadingIds,
  [
    rehypeAutolinkHeadings,
    {
      properties: {
        ariaHidden: 'true',
        tabIndex: -1,
        class: 'header-anchor',
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
]
