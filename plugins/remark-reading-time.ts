import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

/**
 * Used to add a reading time property to the frontmatter of your Markdown or MDX files.
 *
 * @see https://docs.astro.build/en/recipes/reading-time/
 */
function remarkReadingTime() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (tree, file) => {
    const { frontmatter } = file.data.astro
    if (frontmatter.minutesRead || frontmatter.minutesRead === 0) return

    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    frontmatter.minutesRead = Math.max(1, Math.round(readingTime.minutes))
  }
}

export default remarkReadingTime
