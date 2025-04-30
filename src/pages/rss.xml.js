import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

import { SITE } from '~/config'
import { withBasePath } from '~/utils/path'

export async function GET() {
  const blog = await getCollection('blog')

  const filteredBlogitems = blog.filter((item) => !item.data.draft)

  const sortedBlogItems = filteredBlogitems.sort(
    (a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate)
  )

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    customData: `
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <title>${SITE.title}</title>
        <url>${SITE.website}/icon-512.png</url>
        <link>${SITE.website}</link>
      </image>`,

    items: sortedBlogItems.map((item) => ({
      title: `${item.data.title}`,
      link: withBasePath(`/blog/${item.id}`),
      pubDate: item.data.pubDate,
      description: item.data.description,
      author: SITE.author,
    })),

    stylesheet: withBasePath('/rss-styles.xsl'),
  })
}
