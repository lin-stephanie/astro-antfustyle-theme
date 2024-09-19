import type { MarkdownHeading } from 'astro'

export interface TocHeading extends MarkdownHeading {
  children: TocHeading[]
}

interface TocOpts {
  maxHeadingLevel?: number | undefined
  minHeadingLevel?: number | undefined
}

/**
 * Injects a Table of Contents (ToC) entry into the correct position
 * within the tree structure based on its `depth` property.
 */
function injectChild(items: TocHeading[], item: TocHeading): void {
  const lastItem = items.at(-1)

  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item)
  } else {
    const depthDiff = item.depth - lastItem.depth

    if (depthDiff > 1) {
      let currentDepth = lastItem.depth + 1
      let currentItems = lastItem.children

      while (currentDepth < item.depth) {
        const fillerItem: TocHeading = {
          depth: currentDepth,
          children: [],
          slug: '',
          text: '',
        }
        currentItems.push(fillerItem)
        currentItems = fillerItem.children
        currentDepth++
      }

      currentItems.push(item)
    } else {
      injectChild(lastItem.children, item)
      return
    }
  }
}

/**
 * Generates a ToC from an array of Markdown headings,
 * including only those within the specified heading levels.
 */
export function generateToc(
  headings: readonly MarkdownHeading[],
  { maxHeadingLevel = 4, minHeadingLevel = 2 }: TocOpts = {}
) {
  // by default this ignores/filters out h1 and h5 heading(s)
  const bodyHeadings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
  )

  const toc: TocHeading[] = []
  for (const heading of bodyHeadings)
    injectChild(toc, { ...heading, children: [] })

  return toc
}
