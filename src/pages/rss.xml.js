import rss from '@astrojs/rss'
import { SITE } from '~/config'
import { getUrl } from '~/utils/common-utils'

export async function GET() {
  const blogItems = Object.values(
    import.meta.glob('../content/blog/**/*.{md,mdx}', {
      eager: true,
    })
  )

  const filteredBlogitems = blogItems.filter((item) => !item.frontmatter.draft)

  const sortedBlogItems = filteredBlogitems.sort(
    (a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate)
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

    items: sortedBlogItems.map((item) => {
      const slug = item.file
        .split('/')
        .pop()
        .replace(/\.mdx?$/, '')

      return {
        title: `${item.frontmatter.title}`,
        link: getUrl(`/blog/${slug}`),
        pubDate: item.frontmatter.pubDate,
        description: item.frontmatter.description,
        author: SITE.author,
        content: item.compiledContent(),
      }
    }),

    stylesheet: getUrl('/rss-styles.xsl'),
  })
}
