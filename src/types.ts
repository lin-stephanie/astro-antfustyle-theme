interface Socials {
  /** The name of the social platform, displayed when hovered over. */
  name: string

  /** The URL to the social platform profile. */
  href: string

  /**
   * The icon for the social platform.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons Unocss} specs.
   *
   * @example "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   *
   * @see Check all available icons: https://icones.js.org/
   */
  icon: string

  /**
   * Whether to hide the social icon when the viewport width less than 768px.
   *
   * @default false
   */
  rwd?: boolean
}

interface BaseNavItem {
  /**
   * Set the navigation item's URL, which must start with `/`.
   */
  path: string

  /** Show the role of the item when hovered over. */
  prompt?: string
}

interface TextNavItem extends BaseNavItem {
  /**
   * Navigation item where type is 'text'.
   * Only text is shown regardless of the viewport size.
   *
   * Requires `text` to be configured.
   */
  type: 'text'

  /** The text displayed for the navigation item. */
  text: string
}

interface IconNavItem extends BaseNavItem {
  /**
   * Navigation item where type is 'icon'.
   * Only an icon is shown regardless of the viewport size.
   *
   * Requires `icon` to be configured.
   */
  type: 'icon'
  /**
   * The icon displayed for the navigation item. Required if `type` is 'icon' or 'rwd'.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons Unocss} specs.
   *
   * @example "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   *
   * @see Check all available icons: https://icones.js.org/
   */
  icon: string
}

interface ResponsiveNavItem extends BaseNavItem {
  /**
   * Navigation item where type is 'rwd' (responsive).
   * Responsive type, showing text when the viewport width exceeds 768px and icons otherwise.
   *
   * Requires both `text` and `icon` to be configured.
   */
  type: 'rwd'

  /**
   * The text displayed for the navigation item. Required if `type` is 'text' or 'rwd'.
   */
  text: string

  /**
   * The icon displayed for the navigation item. Required if `type` is 'icon' or 'rwd'.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons Unocss} specs.
   *
   * @example "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   *
   * @see Check all available icons: https://icones.js.org/
   */
  icon: string
}

export type NavItem = TextNavItem | IconNavItem | ResponsiveNavItem

interface SiteConfig {
  /**
   * Set the site name to format with {@link PageMetadata.title} as `<title> - <name>`
   * for use in title and meta tags.
   */
  name: string

  /**
   * Set the author name.
   */
  author: string

  /**
   * Set the social media links.
   */
  socials: Socials[]

  /**
   * Set the structure of the page navigation bar.
   * The configuration order corresponds to the display order on the page.
   *
   * The `NavItem` can be one of three types, each enforcing required fields based on the `type` property.
   *
   * The `type` of navigation item.
   * - 'text': Only text is shown regardless of the viewport size.
   * - 'icon': Only an icon is shown regardless of the viewport size.
   * - 'rwd': Responsive type, showing text when the viewport width exceeds 768px and icons otherwise.
   */
  navBar: NavItem[]
}

interface PageMetadata {
  /**
   * Set the page title to format with {@link SiteConfig.name} as `<title> - <name>`
   * for use in title and meta tags.
   */
  title: string

  /**
   * Set the page description for meta tags.
   */
  description: string
}

type PagesConfig = Record<string, PageMetadata>

export interface Config {
  site: SiteConfig
  pages: PagesConfig
}

/* misc */
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
