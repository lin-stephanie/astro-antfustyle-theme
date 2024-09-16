/* MISC */
export type Fn = () => void

export type Range = [number, number]

export interface Particle {
  x: number
  y: number
  velocity: {
    x: number
    y: number
  }
}

/* SITE */
type Url = `http://${string}` | `https://${string}`
type Icon = `i-${string}-${string}` | `i-${string}:${string}`
type Path = `/${string}`

interface BaseNavItem {
  /**
   * Set the navigation path, which must start with `/`.
   *
   * @example
   * '/blog'、'/blog/'
   */
  path: Path

  /**
   * Set prompt content for mouse hover.
   */
  prompt?: string
}

interface TextNavItem extends BaseNavItem {
  /**
   * Specifies the navigation item where type is 'text'.
   *
   * @description
   * Only text is shown regardless of the viewport size.
   *
   * @remark
   * Requires `text` to be configured.
   */
  type: 'text'

  /**
   * Set the text displayed for the navigation item.
   */
  text: string
}

export interface IconNavItem extends BaseNavItem {
  /**
   * Specifies the navigation item of type is 'icon'.
   *
   * @description
   * Only an icon is shown regardless of the viewport size.
   *
   * @remark
   * Requires `icon` to be configured.
   */
  type: 'icon'

  /**
   * Set the icon displayed for the navigation item. Required if `type` is 'icon' or 'rwd'.
   *
   * @description
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons Unocss} specs.
   *
   * @example
   * "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link  https://icones.js.org/ Check all available icons}
   */
  icon: Icon
}

export interface ResponsiveNavItem extends BaseNavItem {
  /**
   * Specifies the navigation item of type is 'rwd' (responsive).
   *
   * @description
   * Displays text when viewport width is over 768px and icons otherwise.
   *
   * @remark
   * Requires both `text` and `icon` to be configured.
   */
  type: 'rwd'

  /**
   * Set the text displayed for the navigation item. Required if `type` is 'text' or 'rwd'.
   */
  text: string

  /**
   * Set the icon displayed for the navigation item. Required if `type` is 'icon' or 'rwd'.
   *
   * @description
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons Unocss} specs.
   *
   * @example
   * "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link  https://icones.js.org/ Check all available icons}
   */
  icon: Icon
}

type NavItem = TextNavItem | IconNavItem | ResponsiveNavItem

export interface Site {
  /**
   * Set your final deployed URL, which will be passed to the
   * {@link https://docs.astro.build/en/reference/configuration-reference/#site site config} in Astro,
   * used for generating canonical URLs and more, found in `astro.config.ts`.
   */
  website: Url

  /**
   * Set the site name to format with {@link PageMetadata.title} as `<pageTitle> - <siteTitle>`
   * for title and meta tags, found in `src/components/Head.astro`.
   */
  title: string

  /**
   * Set the default content for meta tags, found in `src/components/Head.astro`.
   */
  description: string

  /**
   * Set the author name for meta tags, found in `src/components/Head.astro`.
   */
  author: string

  /**
   * Set the primary language of the document content, found in `src/layouts/BaseLayout.astro`.
   *
   * @description
   * It must be a single 'language tag' in the format defined in
   * {@link https://datatracker.ietf.org/doc/html/rfc5646#appendix-A RFC 5646: Tags for Identifying Languages (also known as BCP 47)}.
   *
   */
  lang: string

  /**
   * Set the page content's language and region for better content display on social platforms,
   * found in `src/components/Head.astro`.
   *
   * @description
   * It must be in 'language_TERRITORY' format, which you can find in
   * {@link https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html Language-Territory Information}.
   *
   * @example
   * 'zh_CN'
   * 'fr_FR'
   */
  ogLocale: string

  /**
   * Set the website navigation bar, found in `src/components/NavBar.astro`.
   *
   * @description
   * The configuration order corresponds to the display order on the page.
   *
   * @property {string} `type` - Set the type of navigation item:
   *  - 'text': Only text is shown regardless of the viewport size.
   *  - 'icon': Only an icon is shown regardless of the viewport size.
   *  - 'rwd': Responsive type, showing text when the viewport width exceeds 768px and icons otherwise.
   * @property {string} `text` - Set the text displayed for the navigation item. Required if `type` is 'text' or 'rwd'.
   * @property {string} `icon` - Set the icon displayed for the navigation item. Required if `type` is 'icon' or 'rwd'.
   */
  navBar: NavItem[]
}

/* SOCIALS */
export interface Socials {
  /**
   * Set a brief description to show where the link leads, displayed when hovered over.
   *
   * @description
   * You can use template literals to reference other configuration items.
   *
   * @example
   * `Follow ${SITE.author} on Twitter`
   */
  title: string

  /**
   * Set the URL to the social platform profile.
   */
  href: string

  /**
   * Set the icon for the social platform.
   *
   * @description
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons Unocss} specs.
   *
   * @example "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link  https://icones.js.org/ Check all available icons}
   */
  icon: Icon

  /**
   * Whether to hide the social icon when the viewport width less than 768px.
   *
   * @default false
   */
  rwd?: boolean
}

/* LAYLOUT */
interface Tab {
  /**
   * Set the display title of the tab.
   */
  title: string

  /**
   * Set the navigation path associated with the tab, which must start with `/`.
   *
   * @example
   * '/blog'、'/blog/'
   */
  path: Path
}
export type Tabs = [Tab, Tab, ...Tab[]]

export interface Layouts {
  /**
   * Enable and configure for tabs within a tabbed layout, used in `src/layouts/TabbedLayout.astro`.
   *
   * @description
   * If your website does not use the `TabbedLayout`, you can set it to `false`; however,
   * configuration is required before using this layout.
   */
  tabbedLayoutTabs: false | Tabs

  /**
   * Set the number of columns in the group view on the `/projects` page,
   * used in `src/components/views/GroupItem.astro`.
   */
  groupItemCols: 2 | 3
}

/* FEATURES */
export type BgType = 'plum' | 'dot' | 'rose' | 'particle'
type Mentioned = `@${string}` | ''
type FeatureConfig<T> = false | [boolean, T]

export interface ShareConfig {
  /**
   * Set whether to include Twitter for sharing,
   * If enabled, optionally configure a Twitter username to be mentioned:
   *  - Set to `false` or `[false, '@userName']` to exclude.
   *  - Set to `[true, '@userName']` to include.
   *
   * @description
   * The Twitter username must start with `@`.
   * If set to an empty string, '@userName' will be excluded from the shared text.
   */
  twitter: FeatureConfig<Mentioned>

  /**
   * Set whether to include Mastodon for sharing,
   * If enabled, optionally configure a Mastodon username to be mentioned:
   *  - Set to `false` or `[false, '@userName@serverName']` to exclude.
   *  - Set to `[true, '@userName@serverName']` to include.
   *
   * @description
   * The Mastodon username must start with `@`.
   * If set to an empty string, '@userName@serverName' will be excluded from the shared text.
   */
  mastodon: FeatureConfig<Mentioned>

  /**
   * Set whether to include Facebook for sharing.
   */
  facebook: boolean

  /**
   * Set whether to include Pinterest for sharing.
   */
  pinterest: boolean

  /**
   * Set whether to include Reddit for sharing.
   */
  reddit: boolean

  /**
   * Set whether to include Telegram for sharing.
   */
  telegram: boolean

  /**
   * Set whether to include WhatsApp for sharing.
   */
  whatsapp: boolean

  /**
   * Set whether to include Email for sharing.
   */
  email: boolean
}

interface TocConfig {
  /**
   * Set the display position of the table of contents.
   */
  position: 'left' | 'right'
}

interface OgImageConfig {
  /**
   * Set the name of the author or brand associated with the content.
   *
   * @description
   * Used to display above the title to enhance recognition.
   */
  authorOrBrand: string

  /**
   * Set title for fallback OG image.
   *
   * @description
   * A fallback OG image is the default image used when the specified or auto-generated OG image is missing,
   * ensuring that any page shared on social platforms displays an image.
   *
   * @remarks
   * The fallback OG image is stored at `/public/og-images/og-image.png`.
   * Delete the existing file to regenerate.
   */
  fallbackTitle: string

  /**
   * Set the fallback background for automatically generated OG images.
   *
   * @description
   * The automatically generated OG images will default to the page's {@link PageMetadata.bgType} for
   * the background. If not set, the background will use the type specified in this field.
   */
  fallbackBgType: BgType
}

export interface Features {
  /**
   * Enable and configure the sharing feature, which allows visitors to share content to social platforms.
   *
   * @description
   * If enabled, share links appear at the bottom of all posts.
   * Disable for a specific post by setting the `share` field in the frontmatter to `false`.
   */
  share: FeatureConfig<ShareConfig>

  /**
   * Enable and configure the TOC feature.
   *
   * @description
   * If enabled, both the `/blog/[slug]` and `/projects` pages will automatically include a TOC.
   * Disable for a specific post or the `/projects` page by setting the `toc` field in the frontmatter to `false`.
   *
   * @remarks
   * The TOC automatically hides when the viewport width less than 1024px.
   */
  toc: FeatureConfig<TocConfig>

  /**
   * Enable and configure the automatic OG image generation feature.
   *
   * @description
   * If enabled, auto-generate OG images for Markdown/MDX files lacking ogImage
   * in frontmatter and store in `/public/og-images`.
   *
   * @remarks
   * Only available for pages generated from Markdown/MDX, as the process is implemented through remark plugin.
   */
  ogImage: FeatureConfig<OgImageConfig>
}
