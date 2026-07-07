import { inspect } from 'node:util'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { cwd } from 'node:process'

/**
 * Minimal logger interface used by build-time helpers.
 */
export interface Logger {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
}

/**
 * A logger that does nothing.
 * Used when no logger is provided.
 */
export const silentLogger: Logger = {
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
}

/**
 * Formats a log message with optional detail.
 *
 * Single-line details are appended inline in parentheses,
 * while multi-line details are appended on a new line.
 */
export function formatLoggerWarnMessage(message: string, detail?: string) {
  const normalizedDetail = detail?.trim()

  if (!normalizedDetail) return message

  return normalizedDetail.includes('\n')
    ? `${message}\n${normalizedDetail}`
    : `${message} (${normalizedDetail})`
}

/**
 * Formats an inline info label to match Astro's blue logger prefixes.
 */
export function formatLoggerInfoMessage(label: string, message: string) {
  return import.meta.env.DEV ? `\x1b[34m[${label}]\x1b[39m ${message}` : message
}

/**
 * Formats an error message for logging
 */
export function getErrorMessage(err: unknown): string {
  if (err == null || err === '') return 'Unknown error'

  const message = inspect(err, {
    depth: null,
    colors: false,
    compact: false,
  }).trim()

  return message || 'Unknown error'
}

/**
 * Resolves path segments relative to the current working directory.
 *
 * @example
 * cwd /repo + public/og-images + blog.png -> /repo/public/og-images/blog.png
 * cwd /repo + src/utils + og-image/template -> /repo/src/utils/og-image/template
 * cwd /repo + dist + og-images/blog/post.png -> /repo/dist/og-images/blog/post.png
 */
export function resolveCwdPath(...paths: string[]) {
  return join(cwd(), ...paths)
}

/**
 * Checks if a file exists in a specified directory.
 * This path is relative to the current working directory.
 */
export function checkFileExistsInDir(path: string, filename: string) {
  const fullPath = resolveCwdPath(path, filename)

  return existsSync(fullPath)
}
