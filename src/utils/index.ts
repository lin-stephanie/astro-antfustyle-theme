import dayjs from 'dayjs'
import type { CollectionEntry, ContentEntryMap } from 'astro:content'
import type { GrouptSchema } from '~/content/schema'

/* time */
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

export function getPublishedItems(items: CollectionEntry<EntryKey>[]) {
  return items.filter((item) => !item.data.draft)
}

export function getSortedItems(items: CollectionEntry<EntryKey>[]) {
  const publishedItems = getPublishedItems(items)

  return publishedItems.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
}

export function groupItemsByYear(items: CollectionEntry<EntryKey>[]) {
  const sortedItems = getSortedItems(items)

  return sortedItems.reduce((acc: Acc, item) => {
    const year = item.data.date.getFullYear().toString()
    acc[year] ? acc[year].push(item) : (acc[year] = [item])
    return acc
  }, {})
}

export function getYears(items: Acc) {
  return Object.keys(items).sort((a, b) => parseInt(b) - parseInt(a))
}

/* bgs */
export function initCanvas(
  canvas: HTMLCanvasElement,
  width = 400,
  height = 400,
  _dpi?: number
) {
  const ctx = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1
  // prettier-ignore
  // @ts-expect-error (vendor)
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

export function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)

  return [x + dx, y + dy]
}

export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getRandomPercentage(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2) + '%'
}

/* projects */
export function slug(text: string) {
  return text.toLowerCase().replace(/[\s\\/]+/g, '-')
}

export function extractIconsStartingWithI(data: GrouptSchema): string[] {
  const icons: string[] = []

  for (const key in data) {
    const projects = data[key]
    projects.forEach((project) => {
      if (project.icon && project.icon.startsWith('i')) {
        icons.push(project.icon)
      }
    })
  }

  return icons
}

/* global */
export function getUrl(...paths: string[]): string {
  const baseUrl = import.meta.env.BASE_URL
  const fullPath = [baseUrl, ...paths].join('/').replace(/\/+/g, '/')

  return fullPath
}

export function setClickOutsideToClose(
  panels: { id: string; ignores: string[] }[]
) {
  document.addEventListener('click', (event: MouseEvent) => {
    panels.forEach((panel: { id: string; ignores: string[] }) => {
      const panelEl = document.getElementById(panel.id)
      if (!panelEl) return

      const target = event.target

      const isClickedOutside =
        target instanceof Node &&
        !panelEl.contains(target) &&
        !panel.ignores.some((ignoreId) => {
          const ignoreEl = document.getElementById(ignoreId)
          return ignoreEl?.contains(target)
        })

      if (isClickedOutside) {
        panelEl.classList.add('float-panel-closed')
      }
    })
  })
}
