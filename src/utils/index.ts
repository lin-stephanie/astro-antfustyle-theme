import dayjs from 'dayjs'
import type {
  CollectionEntry,
  ContentEntryMap,
  // InferEntrySchema,
} from 'astro:content'

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

type EntryWithData<T extends EntryKey> = CollectionEntry<T> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  // data: InferEntrySchema<"posts">
}

type Acc<T extends EntryKey> = Record<string, CollectionEntry<T>[]>

export const getPublishedItems = <T extends EntryKey>(
  items: EntryWithData<T>[]
) => {
  return items.filter((item) => !item.data.draft)
}

export const getSortedItems = <T extends EntryKey>(
  items: EntryWithData<T>[]
) => {
  const publishedItems = getPublishedItems(items)

  return publishedItems.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
}

export const groupItemsByYear = <T extends EntryKey>(
  items: EntryWithData<T>[]
) => {
  const sortedItems = getSortedItems(items)

  return sortedItems.reduce((acc: Acc<T>, item) => {
    const year = item.data.date.getFullYear().toString()
    acc[year] ? acc[year].push(item) : (acc[year] = [item])
    return acc
  }, {})
}

export const getYears = (items: Acc<keyof ContentEntryMap>) => {
  return Object.keys(items).sort((a, b) => parseInt(b) - parseInt(a))
}

/* export const getPublishedItems = async <T extends EntryKey>(entryType: T) => {
  const items = await getCollection(entryType)

  return items.filter((item) => !item.data.draft)
}

export const getSortedItems = async <T extends EntryKey>(entryType: T) => {
  const publishedItems = await getPublishedItems(entryType)

  return publishedItems.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
}

export const groupitemsByYear = async <T extends EntryKey>(entryType: T) => {
  const sortedItems = await getSortedItems(entryType)

  return sortedItems.reduce((acc: Acc<T>, item) => {
    const year = item.data.date.getFullYear().toString()
    acc[year] ? acc[year].push(item) : (acc[year] = [item])
    return acc
  }, {})
} */
