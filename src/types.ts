export type Fn = () => void

export interface NavTabsItem {
  href: string
  label: string
}

export type NavTabsItems = [NavTabsItem, NavTabsItem, ...NavTabsItem[]]

export const items: NavTabsItems = [
  { href: '/blog', label: 'Blog' },
  { href: '/talks', label: 'Talks' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/streams', label: 'Streams' },
  { href: '/notes', label: 'Notes' },
]
