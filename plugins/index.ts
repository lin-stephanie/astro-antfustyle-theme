import type { RemarkPlugins, RehypePlugins } from 'astro'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const remarkPlugins: RemarkPlugins = []

export const rehypePlugins: RehypePlugins = [
  // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
  rehypeHeadingIds,
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
