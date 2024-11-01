import dayjs from 'dayjs'

/**
 * Formats a given date into a human-readable string.
 */
export function formatDate(d: Date | string, showYear = true) {
  const date = dayjs(d)

  if (!showYear /* || date.year() === dayjs().year() */)
    return date.format('MMM D')

  return date.format('MMM D, YYYY')
}

/**
 * Gets the year from a given date.
 */
export function getYear(a: Date | string | number) {
  return new Date(a).getFullYear()
}

/**
 * Compares two dates to check if they fall within the same year.
 */
export function isSameYear(
  a?: Date | string | number,
  b?: Date | string | number
) {
  return a && b && getYear(a) === getYear(b)
}

/**
 * Retrieves the current time formatted as a string in 'HH:MM:SS' format.
 */
export function getCurrentFormattedTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
