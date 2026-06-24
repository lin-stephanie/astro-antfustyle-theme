import { inspect } from 'node:util'

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
export function formatLogMessage(message: string, detail?: string) {
  const normalizedDetail = detail?.trim()

  if (!normalizedDetail) return message

  return normalizedDetail.includes('\n')
    ? `${message}\n${normalizedDetail}`
    : `${message} (${normalizedDetail})`
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
