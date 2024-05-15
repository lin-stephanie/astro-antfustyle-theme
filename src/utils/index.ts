import dayjs from 'dayjs'
import type { CollectionEntry, ContentEntryMap } from 'astro:content'

/* misc */
export function formatDate(d: string | Date, showYear = true) {
  const date = dayjs(d)

  if (!showYear || date.year() === dayjs().year()) return date.format('MMM D')

  return date.format('MMM D, YYYY')
}

export function getYear(a: Date | string | number) {
  return new Date(a).getFullYear()
}

export function isSameYear(
  a?: Date | string | number,
  b?: Date | string | number
) {
  return a && b && getYear(a) === getYear(b)
}

/* items */
type EntryKey = keyof ContentEntryMap

type Acc = Record<string, CollectionEntry<EntryKey>[]>

export const getPublishedItems = (items: CollectionEntry<EntryKey>[]) => {
  return items.filter((item) => !item.data.draft)
}

export const getSortedItems = (items: CollectionEntry<EntryKey>[]) => {
  const publishedItems = getPublishedItems(items)

  return publishedItems.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
}

export const groupItemsByYear = (items: CollectionEntry<EntryKey>[]) => {
  const sortedItems = getSortedItems(items)

  return sortedItems.reduce((acc: Acc, item) => {
    const year = item.data.date.getFullYear().toString()
    acc[year] ? acc[year].push(item) : (acc[year] = [item])
    return acc
  }, {})
}

export const getYears = (items: Acc) => {
  return Object.keys(items).sort((a, b) => parseInt(b) - parseInt(a))
}
