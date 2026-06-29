import { checkFileExistsInDir } from '~/utils/server'
import { ensureTrailingSlash, stripBasePath } from '~/utils/path'
import { FEATURES } from '~/config'

import type { Logger } from '~/utils/server'

export const OG_IMAGE_DIR = 'og-images'
export const FALLBACK_OG_IMAGE_SLUG = 'og-image'
export const FALLBACK_OG_IMAGE_FILENAME = `${FALLBACK_OG_IMAGE_SLUG}.png`
export const FALLBACK_OG_IMAGE_PATHNAME = `/${OG_IMAGE_DIR}/${FALLBACK_OG_IMAGE_FILENAME}`
export const OG_IMAGE_DOCS_HINT =
  'See https://astro-antfustyle-theme.vercel.app/blog/about-open-graph-images/ for more information'

interface PublicOgImageCheckResult {
  exists: boolean
  valid: boolean
  filename?: string
}

interface ResolveOgImagePathnameOptions {
  authorOrBrand: string
  pathname: string
  title?: string
  ogImage?: string | boolean
  logger: Logger
}

/**
 * Appends the OG image documentation hint to a log message
 */
export function withOgImageDocsHint(detail: string) {
  return `${detail} ${OG_IMAGE_DOCS_HINT}`
}

/**
 * Returns the OG image configuration or undefined if not configured
 */
export function getOgImageConfig() {
  const ogImage = FEATURES.ogImage

  return Array.isArray(ogImage) && ogImage[0] ? ogImage[1] : undefined
}

/**
 * Checks whether an `ogImage` value points to an existing file in `public/og-images/`.
 *
 * @example
 * 'custom.png' -> checks public/og-images/custom.png -> filename: custom.png
 * 'custom/custom.png' -> checks public/og-images/custom/custom.png -> filename: custom/custom.png
 * 'og-images/custom.png' -> checks public/og-images/custom.png -> filename: custom.png
 * 'og-images/custom/custom.png' -> checks public/og-images/custom/custom.png -> filename: custom/custom.png
 * '/custom.png' -> invalid
 * '../custom.png' -> invalid
 * '' -> invalid
 */
export function checkPublicOgImageExists(
  ogImage: string,
  logger?: Logger
): PublicOgImageCheckResult {
  // trim 'og-images/' from the beginning of the input if present
  const input = ogImage.trim()
  const filename = input.startsWith(`${OG_IMAGE_DIR}/`)
    ? input.slice(OG_IMAGE_DIR.length + 1)
    : input

  const segments = filename.split('/')
  const valid =
    !!input &&
    !input.startsWith('/') &&
    segments.every((segment) => segment && segment !== '.' && segment !== '..')

  if (!valid) {
    logger?.warn(
      `Invalid OG image path '${ogImage}'. ${withOgImageDocsHint(
        `Set \`ogImage\` to the path relative to the \`public/${OG_IMAGE_DIR}\` directory, such as 'custom.png', 'blog/custom.jpg', '${OG_IMAGE_DIR}/blog/custom.webp'.`
      )}.`
    )

    return { exists: false, valid: false }
  }

  return {
    exists: checkFileExistsInDir(`public/${OG_IMAGE_DIR}`, filename),
    valid: true,
    filename,
  }
}

/**
 * Builds the rendered page pathname for a content collection entry.
 *
 * The collection is the data source, while `pathnamePrefix` is the public URL
 * segment where entries from that collection are rendered.
 *
 * @example
 * pathnamePrefix: '/blog', postId: 'getting-started' -> '/blog/getting-started/'
 * pathnamePrefix: '/writing', postId: 'nested/note' -> '/writing/nested/note/'
 */
export function getPostPathname(pathnamePrefix: string, postId: string) {
  return ensureTrailingSlash(
    `/${pathnamePrefix}/${postId}`.replace(/\/+/g, '/')
  )
}

/**
 * Builds the rendered page pathname for a static MDX page collection entry.
 *
 * The root `src/pages/index.mdx` page maps to `/`; every other page id maps
 * directly to a trailing-slashed pathname.
 *
 * @example
 * 'index' -> '/'
 * 'projects' -> '/projects/'
 * 'blog/hi' -> '/blog/hi/'
 */
export function getPagePathname(pageId: string) {
  return pageId === 'index' ? '/' : ensureTrailingSlash(`/${pageId}`)
}

/**
 * Converts a page pathname into the slug segment used by the OG image endpoint.
 *
 * @example
 * '/' -> 'index'
 * '/blog/' -> 'blog'
 * '/blog/getting-started/' -> 'blog/getting-started'
 */
export function pathnameToOgImageSlug(pathname: string) {
  const normalized = pathname.replace(/^\/+/, '').replace(/\/$/, '')

  return normalized || 'index'
}

/**
 * Converts a page pathname into the generated OG image filename.
 *
 * @example
 * '/' -> 'index.png'
 * '/blog/' -> 'blog.png'
 * '/blog/getting-starte/' -> 'blog/getting-started.png'
 */
export function pathnameToOgImageFile(pathname: string) {
  return `${pathnameToOgImageSlug(pathname)}.png`
}

/**
 * Converts a page pathname into the site-relative generated OG image pathname.
 *
 * @example
 * '/' -> '/og-images/index.png'
 * '/blog/' -> '/og-images/blog.png'
 * '/blog/getting-started/' -> '/og-images/blog/getting-started.png'
 */
export function pathnameToOgImagePath(pathname: string) {
  return `/${OG_IMAGE_DIR}/${pathnameToOgImageFile(pathname)}`
}

/**
 * Resolves the site-relative OG image path used to build `og:image` and `twitter:image` meta content.
 *
 * @example
 * custom field 'custom.png' and file exists -> '/og-images/custom.png'
 * custom field 'og-images/custom.png' and file exists -> '/og-images/custom.png'
 * custom field 'missing.png' and file is missing -> '/og-images/og-image.png'
 * custom field 'fallback' -> '/og-images/og-image.png'
 * pathname '/blog/post/', title exists, ogImage true -> '/og-images/blog/post.png'
 * pathname '/blog/post/', title exists, ogImage undefined -> '/og-images/blog/post.png'
 * pathname '/blog/post/', ogImage false -> undefined
 * pathname '/blog/', title empty -> '/og-images/og-image.png'
 * pathname '/blog/', title equals authorOrBrand -> '/og-images/og-image.png'
 */
export function resolveOgImagePathname({
  ogImage,
  title,
  authorOrBrand,
  pathname,
  logger,
}: ResolveOgImagePathnameOptions) {
  if (ogImage === false) return undefined
  if (ogImage === 'fallback') return FALLBACK_OG_IMAGE_PATHNAME

  if (typeof ogImage === 'string') {
    const publicOgImage = checkPublicOgImageExists(ogImage, logger)

    if (publicOgImage.exists && publicOgImage.filename)
      return `/${OG_IMAGE_DIR}/${publicOgImage.filename}`

    if (!publicOgImage.exists) {
      logger.warn(
        `Specified OG image '${ogImage}' was not found. ${withOgImageDocsHint(`Falling back to \`${FALLBACK_OG_IMAGE_PATHNAME}\``)}.`
      )
    }

    return FALLBACK_OG_IMAGE_PATHNAME
  }

  if (title?.trim() && title !== authorOrBrand) {
    const pagePathname = stripBasePath(pathname)
    return pathnameToOgImagePath(pagePathname)
  }

  return FALLBACK_OG_IMAGE_PATHNAME
}
