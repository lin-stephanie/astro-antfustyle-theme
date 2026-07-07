import { base } from 'astro:config/server'

/**
 * Joins the provided path segments with the base path,
 * ensuring that multiple slashes are replaced with a single slash.
 *
 * @example
 * base '/' + '/blog/' -> '/blog/'
 * base '/docs' + '/blog/' -> '/docs/blog/'
 * base '/docs/' + 'blog' -> '/docs/blog'
 * base '/docs' + '/og-images/blog.png' -> '/docs/og-images/blog.png'
 */
export function withBasePath(...paths: string[]): string {
  return [base, ...paths].join('/').replace(/\/+/g, '/')
}

/**
 * Ensures that a given pathname ends with a trailing slash.
 *
 * @example
 * '/blog' -> '/blog/'
 * '/blog/' -> '/blog/'
 * '/' -> '/'
 * '' -> '/'
 */
export function ensureTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : pathname + '/'
}

/**
 * Resolves a pathname by appending a trailing slash and joining with the base path.
 *
 * @example
 * '/blog' with base '/' -> '/blog/'
 * '/blog/' with base '/' -> '/blog/'
 * '/blog' with base '/docs' -> '/docs/blog/'
 * '/' with base '/docs' -> '/docs/'
 */
export function resolvePath(pathname: string): string {
  return withBasePath(ensureTrailingSlash(pathname))
}

/**
 * Normalizes an Astro base path to a leading-slash path without a trailing slash.
 *
 * @example
 * '/' -> ''
 * '/docs' -> '/docs'
 * 'docs/' -> '/docs'
 * '/docs/' -> '/docs'
 */
export function normalizeBasePath(basePath: string) {
  return `/${basePath}`.replace(/\/+/g, '/').replace(/\/$/, '')
}

/**
 * Removes the configured base path from a pathname.
 *
 * @example
 * '/docs/blog/' with base '/' -> '/docs/blog/'
 * '/docs/' with base '/' -> '/docs/'
 * '/docs/blog/' with base '/docs' -> '/blog/'
 * '/docs/' with base '/docs' -> '/'
 */
export function stripBasePath(pathname: string, basePath: string = base) {
  const normalizedBase = normalizeBasePath(basePath)
  if (!normalizedBase) return pathname

  if (pathname === normalizedBase) return '/'
  if (pathname.startsWith(`${normalizedBase}/`))
    return pathname.slice(normalizedBase.length)

  return pathname
}
