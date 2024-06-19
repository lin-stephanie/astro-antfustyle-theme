type Mentioned = `@${string}` | ''
type Icon = `i-${string}-${string}` | `i-${string}:${string}`

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
  icon: Icon

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
  icon: Icon
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
  icon: Icon
}

export type NavItem = TextNavItem | IconNavItem | ResponsiveNavItem

interface SiteConfig {
  /**
   * Set your final deployed URL, which will be passed to the
   * {@link https://docs.astro.build/en/reference/configuration-reference/#site site config} in Astro,
   * used for generating canonical URLs and more.
   */
  url: string

  /**
   * Set the site name to format with {@link PageMetadata.title} as `<title> - <name>`
   * for use in title and meta tags.
   */
  name: string

  /**
   * Set the author name for use in meta tags.
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
   *  - 'text': Only text is shown regardless of the viewport size.
   *  - 'icon': Only an icon is shown regardless of the viewport size.
   *  - 'rwd': Responsive type, showing text when the viewport width exceeds 768px and icons otherwise.
   */
  navBar: NavItem[]
}

interface PageMetadata {
  /**
   * Set the page title to format with {@link SiteConfig.name} as `<title> - <name>`
   * for use in title and meta tags.
   *
   * If set to an empty string, displays only `<name>`.
   */
  title: string

  /**
   * Set the page description for meta tags.
   */
  description: string
}

type PagesConfig = Record<string, PageMetadata>

type FeatureConfig<T> = false | [boolean, T]

export interface ShareConfig {
  /**
   * The template for pre-filled text used when visitors share the article on social platforms.
   *
   * It can include two placeholders:
   *  - {@you}: Your username on social platforms, replaced with configurations from
   *    the {@link twitter} and mastodon settings.
   *  - {url}: The automatically generated link shared by the visitor.
   *
   * @example
   * "Reading {@you}'s {url} \n\n I think..."
   *
   */
  // template: string

  /**
   * Set the Twitter username for mentions. Must start with '@'.
   * If set to an empty string, the social platform is excluded from sharing options.
   */
  twitter: Mentioned

  /**
   * Set the Twitter username for mentions. Must start with '@'.
   * If set to an empty string, the social platform is excluded from sharing options.
   */
  mastodon: Mentioned
}

interface FeaturesConfig {
  /**
   * Enable and configure the sharing feature, which allows visitors to share content to social platforms.
   *
   * If enabled, posts with a 'duration' field in the frontmatter will have sharing links appended to the bottom.
   *
   */
  share: FeatureConfig<ShareConfig>
}

export interface Config {
  site: SiteConfig
  pages: PagesConfig
  /**
   * Configure whether to enable certain special features on the website, configuration method:
   *  - Set to `false` or `[false, {...}]` to disable this feature.
   *  - Set to `[true, {...}]` to enable and configure this feature.
   */
  features: FeaturesConfig
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
