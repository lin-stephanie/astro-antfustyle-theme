import { base } from 'astro:config/server'

/**
 * Joins the provided path segments with the base path,
 * ensuring that multiple slashes are replaced with a single slash.
 */
export function withBasePath(...paths: string[]): string {
  return [base, ...paths].join('/').replace(/\/+/g, '/')
}

/**
 * Ensures that a given pathname ends with a trailing slash.
 */
export function ensureTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : pathname + '/'
}

/**
 * Resolves a given pathname by appending a trailing slash
 * and joining with the base path.
 */
export function resolvePath(pathname: string): string {
  return withBasePath(ensureTrailingSlash(pathname))
}
