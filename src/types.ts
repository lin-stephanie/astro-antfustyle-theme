/* SITE */
export type Url = `http://${string}` | `https://${string}`
type Path = `/${string}`

export interface Site {
  /**
   * Specifies the final deployed URL, which must start with `http://` or `https://`.
   *
   * It will be passed to the
   * {@link https://docs.astro.build/en/reference/configuration-reference/#site `site`}
   * config in Astro, used for generating canonical URLs, `rss.xml` and other features.
   */
  website: Url

  /**
   * Specifies the base path for your site, which must start with `/`.
   *
   * It wiil be passed to the
   * {@link https://docs.astro.build/en/reference/configuration-reference/#base `base`}
   * config in Astro, used when deploying to a subdirectory.
   *
   * @example
   * `/my-site/` (for a site deployed to `https://example.com/my-site/`)
   */
  base: Path

  /**
   * Specifies the site name for formatting the `title` in the frontmatter as `<pageTitle> - <siteTitle>`.
   *
   * Used for the title and meta tags, found in `src/components/base/Head.astro`.
   */
  title: string

  /**
   * Specifies the default content for meta tags, found in `src/components/base/Head.astro`.
   */
  description: string

  /**
   * Specifies your name for meta tags, found in `src/components/base/Head.astro`.
   */
  author: string

  /**
   * Specifies the primary language of the document content,
   * found in `src/layouts/BaseLayout.astro` and `src/utils/datetime.ts`.
   *
   * It must be a single 'language tag' in the format defined in
   * {@link https://datatracker.ietf.org/doc/html/rfc5646#appendix-A RFC 5646: Tags for Identifying Languages}
   * (also known as BCP 47).
   *
   * @example
   * 'zh-Hans' (Chinese written using the Simplified Chinese script)
   * 'zh-Hant' (Chinese written using the Traditional Chinese script)
   * 'fr' (French)
   */
  lang: string

  /**
   * Specifies the page content's language and region for better content display on social platforms,
   * found in `src/components/base/Head.astro`.
   *
   * It must be in `language_TERRITORY` format, which you can find in
   * {@link https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html Language-Territory Information}.
   *
   * @example
   * 'zh_CN'
   * 'fr_FR'
   */
  ogLocale: string

  /**
   * Specifies the allowed domains for optimizing remote images,
   * including those used with `![]()` and the `<Image />` or `<Picture />` components.
   *
   * It wiil be passed to the
   * {@link https://docs.astro.build/en/reference/configuration-reference/#imagedomains `image.domains`}
   * config in Astro.
   *
   * If you don't need remote image optimization, you can set it to `[]`.
   *
   * @example
   * ['astro.build']
   *
   * @see https://docs.astro.build/en/guides/images/#remote-images
   * @see https://docs.astro.build/en/guides/images/#display-optimized-images-with-the-image--component
   * @see https://docs.astro.build/en/reference/configuration-reference/#image-options
   * @see https://astro.build/blog/astro-540/#remote-image-optimization-in-markdown
   */
  imageDomains: string[]
}

/* UI */
export type Icon = `i-${string}-${string}` | `i-${string}:${string}`
export type RepoWithOwner = `${string}/${string}`

interface BaseNavItem {
  /**
   * Specifies the navigation path. It must start with `/`.
   *
   * @example
   * '/blog'、'/blog/'
   */
  path: Path

  /**
   * Sets the content displayed on hover for accessibility.
   */
  title: string
}

interface TextNavItem extends BaseNavItem {
  /**
   * Defines how the navigation item is displayed responsively. Allowed values:
   *  - `'alwaysText'`: Always display text, regardless of screen size.
   *  - `'alwaysIcon'`: Always display as a chart, regardless of screen size.
   *  - `'textHiddenOnMobile'`: Display text when viewport is ≥768px, hide text when <768px.
   *  - `'iconHiddenOnMobile'`: Display icon when viewport is ≥768px, hide icon when <768px.
   *  - `'textToIconOnMobile'`: Display text when viewport is ≥768px, switch to icon when <768px.
   *  - `'iconToTextOnMobile'`: Display icon when viewport is ≥768px, switch to text when <768px.
   *
   * The `text` property is required for `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   * The `icon` property is required for `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  displayMode: 'alwaysText' | 'textHiddenOnMobile'

  /**
   * Sets the text displayed for the navigation item.
   *
   * Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  text: string
}

export interface IconNavItem extends BaseNavItem {
  /**
   * Defines how the navigation item is displayed responsively. Allowed values:
   *  - `'alwaysText'`: Always display text, regardless of screen size.
   *  - `'alwaysIcon'`: Always display as a chart, regardless of screen size.
   *  - `'textHiddenOnMobile'`: Display text when viewport is ≥768px, hide text when <768px.
   *  - `'iconHiddenOnMobile'`: Display icon when viewport is ≥768px, hide icon when <768px.
   *  - `'textToIconOnMobile'`: Display text when viewport is ≥768px, switch to icon when <768px.
   *  - `'iconToTextOnMobile'`: Display icon when viewport is ≥768px, switch to text when <768px.
   *
   * The `text` property is required for `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   * The `icon` property is required for `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  displayMode: 'alwaysIcon' | 'iconHiddenOnMobile'

  /**
   * Sets the icon displayed for the navigation item.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons UnoCSS} specs.
   *
   * Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   *
   * @example
   * "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link https://icon-sets.iconify.design/ Check all available icons}
   */
  icon: Icon
}

export interface ResponsiveNavItem extends BaseNavItem {
  /**
   * Defines how the navigation item is displayed responsively. Allowed values:
   *  - `'alwaysText'`: Always display text, regardless of screen size.
   *  - `'alwaysIcon'`: Always display as a chart, regardless of screen size.
   *  - `'textHiddenOnMobile'`: Display text when viewport is ≥768px, hide text when <768px.
   *  - `'iconHiddenOnMobile'`: Display icon when viewport is ≥768px, hide icon when <768px.
   *  - `'textToIconOnMobile'`: Display text when viewport is ≥768px, switch to icon when <768px.
   *  - `'iconToTextOnMobile'`: Display icon when viewport is ≥768px, switch to text when <768px.
   *
   * The `text` property is required for `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   * The `icon` property is required for `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  displayMode: 'textToIconOnMobile' | 'iconToTextOnMobile'

  /**
   * Sets the text displayed for the navigation item.
   *
   * Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  text: string

  /**
   * Sets the icon displayed for the navigation item.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons UnoCSS} specs.
   *
   * Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   *
   * @example
   * "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link https://icon-sets.iconify.design/ Check all available icons}
   */
  icon: Icon
}

export type InternalNav = TextNavItem | IconNavItem | ResponsiveNavItem

interface BaseSocialItem {
  /**
   * Set the URL to the social platform.
   */
  link: Url

  /**
   * Sets the content displayed on hover for accessibility.
   *
   * You can use template literals to reference other configuration items.
   *
   * @example
   * `Follow ${SITE.author} on Twitter`
   */
  title: string
}

interface TextSocialItem extends BaseSocialItem {
  /**
   * Defines how the social item is displayed responsively. Allowed values:
   *  - `'alwaysText'`: Always display text, regardless of screen size.
   *  - `'alwaysIcon'`: Always display as a chart, regardless of screen size.
   *  - `'textHiddenOnMobile'`: Display text when viewport is ≥768px, hide text when <768px.
   *  - `'iconHiddenOnMobile'`: Display icon when viewport is ≥768px, hide icon when <768px.
   *  - `'textToIconOnMobile'`: Display text when viewport is ≥768px, switch to icon when <768px.
   *  - `'iconToTextOnMobile'`: Display icon when viewport is ≥768px, switch to text when <768px.
   *
   * The `text` property is required for `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   * The `icon` property is required for `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  displayMode: 'alwaysText' | 'textHiddenOnMobile'

  /**
   * Sets the text displayed for the social item.
   *
   * Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  text: string
}

export interface IconSocialItem extends BaseSocialItem {
  /**
   * Defines how the social item is displayed responsively. Allowed values:
   *  - `'alwaysText'`: Always display text, regardless of screen size.
   *  - `'alwaysIcon'`: Always display as a chart, regardless of screen size.
   *  - `'textHiddenOnMobile'`: Display text when viewport is ≥768px, hide text when <768px.
   *  - `'iconHiddenOnMobile'`: Display icon when viewport is ≥768px, hide icon when <768px.
   *  - `'textToIconOnMobile'`: Display text when viewport is ≥768px, switch to icon when <768px.
   *  - `'iconToTextOnMobile'`: Display icon when viewport is ≥768px, switch to text when <768px.
   *
   * The `text` property is required for `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   * The `icon` property is required for `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  displayMode: 'alwaysIcon' | 'iconHiddenOnMobile'

  /**
   * Sets the icon displayed the social platform.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons UnoCSS} specs.
   *
   * Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   *
   * @example
   * "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link https://icon-sets.iconify.design/ Check all available icons}
   */
  icon: Icon
}

export interface ResponsiveSocialItem extends BaseSocialItem {
  /**
   * Defines how the social item is displayed responsively. Allowed values:
   *  - `'alwaysText'`: Always display text, regardless of screen size.
   *  - `'alwaysIcon'`: Always display as a chart, regardless of screen size.
   *  - `'textHiddenOnMobile'`: Display text when viewport is ≥768px, hide text when <768px.
   *  - `'iconHiddenOnMobile'`: Display icon when viewport is ≥768px, hide icon when <768px.
   *  - `'textToIconOnMobile'`: Display text when viewport is ≥768px, switch to icon when <768px.
   *  - `'iconToTextOnMobile'`: Display icon when viewport is ≥768px, switch to text when <768px.
   *
   * @remark
   * The `text` property is required for `'alwaysText'`, `'textHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   * The `icon` property is required for `'alwaysIcon'`, `'iconHiddenOnMobile'`,
   * `'iconToTextOnMobile'` or `'textToIconOnMobile'`.
   */
  displayMode: 'textToIconOnMobile' | 'iconToTextOnMobile'

  /**
   * Sets the text displayed for the social item.
   *
   * Required for `displayMode` values `'alwaysText'`, `'textHiddenOnMobile'`, `'iconToTextOnMobile'`
   * or `'textToIconOnMobile'`.
   */
  text: string

  /**
   * Sets the icon displayed the social platform.
   *
   * Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>`
   * as per {@link https://unocss.dev/presets/icons UnoCSS} specs.
   *
   * Required for `displayMode` values `'alwaysIcon'`, `'iconHiddenOnMobile'`, `'iconToTextOnMobile'`
   * or `'textToIconOnMobile'`.
   *
   * @example
   * "i-ri:twitter-x-fill", "i-ri-twitter-x-fill", "i-mdi:github", "i-mdi-github"
   *
   * @see {@link https://icon-sets.iconify.design/ Check all available icons}
   */
  icon: Icon
}

export type SocialLink = TextSocialItem | IconSocialItem | ResponsiveSocialItem

type NavBarComponentType =
  | 'internalNavs'
  | 'socialLinks'
  | 'searchButton'
  | 'themeButton'
  | 'rssLink'
  | 'hr'

export interface NavBarLayout {
  /**
   * Defines which components ('internalNavs', 'socialLinks', 'searchButton', themeButton',
   * 'rssLink', 'hr') are positioned on the left side of the navigation bar. Note:
   *
   * - Leave empty to place all components on the right.
   * - No duplicates allowed between `left` and `right`.
   * - The order defines the display sequence.
   * - Use `'hr'` to insert a divider between components.
   */
  left: NavBarComponentType[]

  /**
   * Defines which components ('internalNavs', 'socialLinks', 'searchButton', 'themeButton',
   * 'rssLink', 'hr') are positioned on the right side of the navigation bar. Note:
   *
   * - Leave empty to place all components on the right.
   * - No duplicates allowed between `left` and `right`.
   * - The order defines the display sequence.
   * - Use `'hr'` to insert a divider between components.
   */
  right: NavBarComponentType[]

  /**
   * Controls whether the 'internalNavs' and 'socialLinks' section are combined into
   * a single navigation menu on mobile, managed through a hamburger icon.
   */
  mergeOnMobile: boolean
}

interface Tab {
  /**
   * Sets the navigation path associated with the tab, which must start with `/`.
   *
   * @example
   * '/blog'、'/blog/'
   */
  path: Path

  /**
   * Sets the content displayed on hover for accessibility.
   */
  title: string
}

export type Tabs = [Tab, Tab, ...Tab[]]

interface GroupView {
  /**
   * Sets the maximum number of columns displayed in the group view.
   */
  maxGroupColumns: 2 | 3

  /**
   * Determines whether group item icons display in color when hovered over.
   *
   * If `true`, the icon for the group item will display in its original colors on hover.
   */
  showGroupItemColorOnHover: boolean
}

export interface GitHubView {
  /**
   * Defines monorepo repositories using `<owner>/<repo>` format.
   *
   * For monorepos, the tag name is used as the primary text for `/releases` page.
   */
  monorepos: RepoWithOwner[]

  /**
   * Configures main logos for repositories or packages (for monorepos).
   *
   * Matching supports regex or `<owner>/<repo>` format, prioritized by order,
   * and defaults to the owner's avatar if no custom logo is specified.
   */
  mainLogoOverrides: [RepoWithOwner | RegExp, Url | Icon][]

  /**
   * Configures auxiliary logos for repositories or packages (for monorepos).
   *
   * Matching supports regex or `<owner>/<repo>` format, prioritized by order,
   * with no logo displayed for unmatched cases.
   */
  subLogoMatches: [RepoWithOwner | RegExp, Url | Icon][]
}

interface ExternalLink {
  /**
   * Controls whether external links are opened in a new tab.
   * See {@link https://github.com/lin-stephanie/astro-antfustyle-theme/pull/15 #15} for details.
   */
  newTab: boolean

  /**
   * Specifies the cursor type for external links when `newTab` is `true`.
   * See {@link https://github.com/lin-stephanie/astro-antfustyle-theme/pull/15 #15} for details.
   *
   * Accepts {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#keyword standard keywords},
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#url custom URLs},
   * or an empty string, defaulting to 'pointer' like internal links.
   *
   * @example
   * 'url("/images/new-tab.svg") 10 10, pointer'
   */
  cursorType: string

  /**
   * Controls whether to add an indicator to external links when `newTab` is `true`.
   * See {@link https://github.com/lin-stephanie/astro-antfustyle-theme/pull/15 #15} for details.
   */
  showNewTabIcon: boolean
}

export interface Ui {
  /**
   * Sets internal navigation links in display order.
   *
   * Used in `src/components/nav/NavBar.astro`.
   */
  internalNavs: InternalNav[]

  /**
   * Sets external social links in display order.
   *
   * Used in `src/components/nav/NavBar.astro`.
   */
  socialLinks: SocialLink[]

  /**
   * Controls the layout of the navigation bar.
   *
   * Used in `src/components/nav/NavBar.astro`.
   */
  navBarLayout: NavBarLayout

  /**
   * Enables and configures for tabs within a tabbed layout.
   *
   * If your website does not use the `TabbedLayout`, you can set it to `false`.
   * Otherwise, required before using this layout.
   *
   * Used in `src/layouts/TabbedLayout.astro`.
   */
  tabbedLayoutTabs: false | Tabs

  /**
   * Configures the `/projects` UIs.
   *
   * Used in `src/components/views/GroupItem.astro` and `src/components/base/Categorizer.astro`.
   */
  groupView: GroupView

  /**
   * Configures the `/releases` and `/prs` UIs.
   *
   * Used in `src/components/views/GithubView.astro`.
   */
  githubView: GitHubView

  /**
   * Configures external links' behavior and appearance.
   *
   * Used in `plugins/index.ts`, `src/components/base/Link.astro`
   * and `src/layouts/BaseLayout.astro`.
   */
  externalLink: ExternalLink

  /**
   * Controls the display style of post metadata (creation date, read time, modified date):
   * - 'minimal': Plain text with middle dots.
   * - 'icon': Includes icons before each metadata item.
   *
   * On mobile devices, the modified date (if present) is hidden.
   *
   * Used in `src/components/base/PostMeta.astro`.
   */
  postMetaStyle: 'minimal' | 'icon'
}

/* FEATURES */
export type BgType = 'plum' | 'dot' | 'rose' | 'particle'
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type Mentioned = `@${string}` | `@${string}@${string}` | ''
type FeatureConfig<T> = false | [boolean, T]

interface slideEnterAnimConfig {
  /**
   * Adjusts the animation speed (ms). Smaller values speed up; larger values slow down.
   */
  enterStep: number
}

interface OgImageConfig {
  /**
   * Sets your name or brand name that will be displayed on the OG image.
   */
  authorOrBrand: string

  /**
   * Sets the fallback title for OG images.
   *
   * Used when the `title` in the frontmatter is missing or invalid.
   */
  fallbackTitle: string

  /**
   * Sets the fallback background for OG images.
   *
   * By default, the background used for auto-generated OG images is based on the `bgType` set in frontmatter.
   * This value is only used for the fallback OG image (stored at `/public/og-images/og-image.png`)
   * and as the background when `bgType` is not specified.
   *
   * A fallback OG image is the default image used when the specified or auto-generated OG image is missing.
   * You can delete the existing file to regenerate a new one.
   */
  fallbackBgType: BgType
}

export interface TocConfig {
  /**
   * Sets the minimum heading level for TOC.
   *
   * Must be a valid heading level (h1-h6) and not greater than {@link maxHeadingLevel}.
   */
  minHeadingLevel: HeadingLevel

  /**
   * Sets the maximum heading level for TOC.
   *
   * Must be a valid heading level (h1-h6) and not lower than {@link minHeadingLevel}.
   */
  maxHeadingLevel: HeadingLevel

  /**
   * Sets the position of TOC on the page (either on the left or right).
   */
  displayPosition: 'left' | 'right'

  /**
   * Controls how the TOC is displayed. Allowed values:
   * - `'always'`: TOC is always visible.
   * - `'content'`: TOC shows when hovering over the content area (element with class 'prose').
   * - `'hover'`: TOC shows only when hovering over the TOC itself.
   */
  displayMode: 'always' | 'content' | 'hover'
}

export interface ShareConfig {
  /**
   * Configures Twitter sharing:
   *  - Set to `false` or `[false, '@userName']` to disable.
   *  - Set to `[true, '@userName']` to enable and mention you.
   *
   * If an empty string is used, '@userName' will not appear in the pre-filled sharing text.
   */
  twitter: FeatureConfig<Mentioned>

  /**
   * Configures Bluesky sharing:
   *  - Set to `false` or `[false, '@handle']` to disable.
   *  - Set to `[true, '@handle']` to enable and mention you.
   *
   * If an empty string is used, '@handle' will not appear in the pre-filled sharing text.
   */
  bluesky: FeatureConfig<Mentioned>

  /**
   * Configures Mastodon sharing:
   *  - Set to `false` or `[false, '@userName@serverName']` to disable.
   *  - Set to `[true, '@userName@serverName']` to enable and mention you.
   *
   * If an empty string is used, '@userName@serverName' will not appear in the pre-filled sharing text.
   */
  mastodon: FeatureConfig<Mentioned>

  /**
   * Controls whether to include Facebook for sharing.
   */
  facebook: boolean

  /**
   * Controls whether to include Pinterest for sharing.
   */
  pinterest: boolean

  /**
   * Controls whether to include Reddit for sharing.
   */
  reddit: boolean

  /**
   * Controls whether to include Telegram for sharing.
   */
  telegram: boolean

  /**
   * Controls whether to include WhatsApp for sharing.
   */
  whatsapp: boolean

  /**
   * Controls whether to include Email for sharing.
   */
  email: boolean
}

interface GiscusConfig {
  /**
   * GitHub repository in the format `owner/repo`.
   *
   * @example 'lin-stephanie/astro-antfustyle-theme'
   */
  'data-repo': RepoWithOwner

  /**
   * Unique ID of the GitHub repository.
   *
   * @example "R_kgDOLylKbA"
   */
  'data-repo-id': string

  /**
   * Discussion category name.
   *
   * @example "Giscus"
   */
  'data-category': string

  /**
   * Unique ID of the discussion category.
   *
   * @example "DIC_kwDOLylKbM4Cpugn"
   */
  'data-category-id': string

  /**
   * Mapping between pages and discussions.
   *
   * @example 'title'
   */
  'data-mapping': string

  /**
   * Enable strict mapping (1 = true, 0 = false).
   */
  'data-strict': '0' | '1'

  /**
   * Enable reactions (1 = true, 0 = false).
   */
  'data-reactions-enabled': '0' | '1'

  /**
   * Emit discussion metadata (1 = true, 0 = false).
   */
  'data-emit-metadata': '0' | '1'

  /**
   * Position of the comment input box.
   */
  'data-input-position': 'top' | 'bottom'

  /**
   * Language for the Giscus widget UI.
   */
  'data-lang': string
}

interface SearchConfig {
  /**
   * Specify which content collections rendered by `RenderPost.astro` are indexed.
   *
   * - By default, only `blog` and `changelog` are indexed, as their dynamic routes
   * (`/blog/[...slug]` and `/changelog/[slug]`) use `RenderPost.astro`.
   * - If needed, see https://pagefind.app/ for adjusting the search implementation.
   */
  includes: string[]

  /**
   * Whether to enable search filtering by collection.
   *
   * When enabled, the search panel displays multiple tabs named after the collections,
   * allowing users to search in each collection separately.
   *
   * When disabled, all results are searched together.
   */
  filter: boolean

  /**
   * Whether to enable Pagefind’s built-in highlight feature.
   *
   * When enabled, search terms are highlighted on the destination page
   * after navigating from the search results.
   */
  navHighlight: boolean

  /**
   * Configure batch loading for search results.
   *
   *  - Set to `false` or `[false, N]` to load all results at once.
   *  - Set to `[true, N]` to load results in batches of N pages.
   */
  batchLoadSize: FeatureConfig<number>

  /**
   * Limits how many matched items are shown for each result (page).
   *
   * - Set to `false` or `[false, N]` to show all matched items.
   * - Set to `[true, N]` to enable and limit to N items.
   */
  maxItemsPerPage: FeatureConfig<number>
}

export interface Features {
  /**
   * Whether to enable slide-in animation on each page
   * except the `/highlights`, `/photos`, and `/shorts` pages.
   */
  slideEnterAnim: FeatureConfig<slideEnterAnimConfig>

  /**
   * Whether to enable OG image auto-generation.
   *
   * - Automatically generates OG images for Markdown/MDX files when:
   *   - The `ogImage` field is absent in frontmatter, or
   *   - The `ogImage` field is set to `true`.
   * - To disable for a specific post or page, set `ogImage: false` in the frontmatter.
   * - Generated images are saved in `/public/og-images`.
   * - If disabled, deleting `/public/og-images/og-image.png` won't regenerate it.
   */
  ogImage: FeatureConfig<OgImageConfig>

  /**
   * Whether to enable TOC feature.
   *
   * To disable for a specific post or page, set the `toc` field in the frontmatter to `false`.
   *
   * Note: The feature is not supported on the `/highlights`, `/photos`, `/shorts`, `/releases`
   * and `/prs` pages.
   */
  toc: FeatureConfig<TocConfig>

  /**
   * Whether to enable sharing feature to display social links at the bottom of posts.
   *
   * To disable for a specific post, set the `share` field in the frontmatter to `false`.
   */
  share: FeatureConfig<ShareConfig>

  /**
   * Whether to enable Giscus comment feature.
   *
   * - Generate your configuration: https://giscus.app/
   * - For more details: https://astro-antfustyle-theme.vercel.app/blog/advanced-configuration/#configure-giscus-comments
   *
   * To disable for a specific post, set the `giscus` field in the frontmatter to `false`.
   */
  giscus: FeatureConfig<GiscusConfig>

  /**
   * Whether to enable Pagefind search feature.
   *
   * To disable for a specific post, set the `search` field in the frontmatter to `false`.
   *
   * For Pagefind’s built-in configuration, directly modify `src/components/widgets/SearchSwitch.astro`.
   */
  search: FeatureConfig<SearchConfig>
}
