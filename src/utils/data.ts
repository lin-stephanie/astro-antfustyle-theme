import {
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from '@atproto/api'
import { atUriToPostUri } from 'astro-loader-bluesky-posts'

import { ensureTrailingSlash, getUrl } from './common'

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
 * Processes Bluesky posts and converts them into `CardItemData` interface.
 */
export function processBlueskyPosts(data: CollectionEntry<'highlights'>[]) {
  const cards: CardItemData[] = []

  for (const item of data) {
    const { post, replies } = item.data
    const { indexedAt, html, link, embed, author } = post

    const card: CardItemData = {
      date: indexedAt,
      html: html,
      link: link,
    }

    if (embed) {
      if (AppBskyEmbedImages.isView(embed))
        card.images = embed.images.map((img) => ({
          src: img.thumb,
          alt: img.alt,
        }))

      if (AppBskyEmbedVideo.isView(embed))
        card.video = {
          src: `https://bsky.social/xrpc/com.atproto.sync.getBlob?did=${author.did}&cid=${embed.cid}`,
          alt: embed.alt ?? '',
          poster: embed.thumbnail ?? '',
        }

      if (AppBskyEmbedExternal.isView(embed))
        card.external = {
          uri: embed.external.uri,
          title: embed.external.title,
          description: embed.external.description,
          img: embed.external.thumb ?? '',
        }

      if (AppBskyEmbedRecord.isView(embed)) {
        if (AppBskyEmbedRecord.isViewRecord(embed.record)) {
          const { uri, value, author } = embed.record

          card.quote = {
            uri: atUriToPostUri(uri),
            text: value.text as string,
            author: {
              link: `https://bsky.app/profile/${author.handle}`,
              avatar: author.avatar ?? '',
              name: author.displayName ?? '',
              handle: author.handle,
            },
          }
        }
      }

      if (AppBskyEmbedRecordWithMedia.isView(embed)) {
        const { record, media } = embed

        if (media) {
          if (AppBskyEmbedImages.isView(media))
            card.images = media.images.map((img) => ({
              src: img.thumb,
              alt: img.alt,
            }))

          if (AppBskyEmbedVideo.isView(media))
            card.video = {
              src: `https://bsky.social/xrpc/com.atproto.sync.getBlob?did=${author.did}&cid=${media.cid}`,
              alt: media.alt ?? '',
              poster: media.thumbnail ?? '',
            }

          if (AppBskyEmbedExternal.isView(media))
            card.external = {
              uri: media.external.uri,
              title: media.external.title,
              description: media.external.description,
              img: media.external.thumb ?? '',
            }
        }

        if (AppBskyEmbedRecord.isViewRecord(record.record)) {
          const { uri, value, author } = record.record

          card.quote = {
            uri: atUriToPostUri(uri),
            text: value.text as string,
            author: {
              link: `https://bsky.app/profile/${author.handle}`,
              avatar: author.avatar ?? '',
              name: author.displayName ?? '',
              handle: author.handle,
            },
          }
        }
      }
    }

    if (replies && replies.length > 0) {
      card.details = replies.map((reply) => reply.html)
    }

    cards.push(card)
  }

  return cards
}

/**
 * Processes blog posts and converts them into `CardItemData` interface.
 */
export async function getShortsFromBlog(data: CollectionEntry<'blog'>[]) {
  const cards: CardItemData[] = []
  const basePath = getUrl(ensureTrailingSlash('/blog'))
  const sortedData = data.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )

  for (const item of sortedData) {
    const slug = item.slug
    const title = item.data.title
    const date = item.data.pubDate

    if (slug === 'markdown-syntax-guide') {
      cards.push({
        link: `${basePath}/${slug}`,
        text: title,
        date: date,
      })
    } else {
      const { headings } = await item.render()
      const neededHeadingLevel = slug === 'faqs-and-known-issues' ? 3 : 2
      let processedTitle = title
      switch (slug) {
        case 'faqs-and-known-issues':
          processedTitle = 'FAQs'
          break
        case 'adding-new-posts':
          processedTitle = 'New Posts'
          break
        case 'recreating-current-pages':
          processedTitle = 'Current Pages'
          break
        case 'customizing-github-activity-pages':
          processedTitle = 'GitHub Activity'
          break
        case 'markdown-mdx-extended-features':
          processedTitle = 'Extended Features'
          break
        case 'managing-image-assets':
          processedTitle = 'Asset Management'
          break
        case 'about-open-graph-images':
          processedTitle = 'Open Graph'
          break
      }

      const itemCards = headings
        .filter(
          (h) => h.depth === neededHeadingLevel && h.text !== 'Wrapping Up'
        )
        .map((h) => ({
          link: `${basePath}${slug}#${h.slug}`,
          text: `${processedTitle}: ${h.text}`,
          date: date,
        }))

      cards.push(...itemCards)
    }
  }

  return cards
}
