import type { CollectionEntry } from 'astro:content'
import type { CardItemData } from '~/components/views/CardItem.astro'
import type { GitHubView } from '~/types'

export const VERSION_COLOR = {
  major: 'bg-rose:15 text-rose-7 dark:text-rose-3',
  minor: 'bg-purple:15 text-purple-7 dark:text-purple-3',
  patch: 'bg-green:15 text-green-7 dark:text-green-3',
  pre: 'bg-teal:15 text-teal-7 dark:text-teal-3',
}

/**
 * Matches the input string against the rules in `UI.githubView.mainLogoOverrides`
 * or `UI.githubView.subLogoMatches`, and returns the matching URL/Icon.
 */
export function matchLogo(
  input: string,
  logos: GitHubView['mainLogoOverrides'] | GitHubView['subLogoMatches']
) {
  for (const [pattern, logo] of logos) {
    if (typeof pattern === 'string') {
      if (input === pattern) {
        return logo
      }
    } else if (pattern instanceof RegExp) {
      if (pattern.test(input)) {
        return logo
      }
    }
  }
  return undefined
}

/**
 * Extracts the package name (before the `@` version part) from a `tagName`.
 */
export function extractPackageName(tagName: string) {
  const match = tagName.match(/(^@?[^@]+?)(?:@)/)
  if (match) return match[1]
  return tagName
}

/**
 * Extracts the version number from a `tagName`.
 */
export function extractVersionNum(tagName: string) {
  const match = tagName.match(/.+(\d+\.\d+\.\d+(?:-[\w.]+)?)(?:\s|$)/)
  if (match) return match[1]
  return tagName
}

/**
 * Processes the version number and return the highlighted and non-highlighted parts.
 */
export function processVersion(
  versionNum: string
): ['major' | 'minor' | 'patch' | 'pre', string, string] {
  const parts = versionNum.split(/(\.)/g)
  let highlightedIndex = -1
  let versionType: 'major' | 'minor' | 'patch' | 'pre'

  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] !== '.') {
      const num = +parts[i]
      if (!Number.isNaN(num) && num > 0) {
        highlightedIndex = i
        break
      }
    }
  }

  if (highlightedIndex === 0) {
    versionType = 'major'
  } else if (highlightedIndex === 2) {
    versionType = 'minor'
  } else if (highlightedIndex === 4) {
    versionType = 'patch'
  } else {
    versionType = 'pre'
  }

  const nonHighlightedPart = parts.slice(0, highlightedIndex).join('')
  const highlightedPart = parts.slice(highlightedIndex).join('')

  return [versionType, nonHighlightedPart, highlightedPart]
}

/**
 * Processes Bluesky posts and converts them into `CardItem` interface.
 **/
export function processBlueskyPosts(
  data: CollectionEntry<'highlights'>[]
): CardItemData[] {
  return data.map((item) => {
    const { indexedAt, html, link, embed, author } = item.data.post

    const card: CardItemData = {
      date: indexedAt,
      html: html,
      link: link,
    }

    if (embed && typeof embed.$type === 'string') {
      const typeStr = embed.$type
      if (typeStr.startsWith('app.bsky.embed.images')) {
        card.embedType = 'image'
        if (Array.isArray(embed.images)) {
          card.images = embed.images.map((img) => ({
            src: img.thumb ?? img.fullsize ?? '',
            alt: img.alt ?? '',
          }))
        }
      } else if (typeStr.startsWith('app.bsky.embed.video')) {
        card.embedType = 'video'
        card.video = {
          src: `https://bsky.social/xrpc/com.atproto.sync.getBlob?did=${author.did}&cid=${embed.cid}`,
          alt: (embed.alt as string) ?? '',
          thumbnail: (embed.thumbnail as string) ?? '',
        }
      } else if (typeStr.startsWith('app.bsky.embed.external')) {
        card.embedType = 'external'
        const ext = embed.external as {
          uri: string
          title: string
          description: string
          thumb: string
        }
        if (ext) {
          card.external = {
            uri: ext.uri ?? '',
            title: ext.title ?? '',
            description: ext.description ?? '',
            thumb: ext.thumb ?? '',
          }
        }
      } /* else if (typeStr.startsWith('app.bsky.embed.recordWithMedia')) {
        card.embedType = 'record-with-media'
        card.record = {}
      } */ else if (typeStr.startsWith('app.bsky.embed.record')) {
        card.embedType = 'record'
        card.record = embed.record as Record<string, unknown> | undefined
      }
    }

    return card
  })
}
