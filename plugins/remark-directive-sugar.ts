/**
 * @description Register directive nodes in mdast.
 * @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#types
 */
/// <reference types="mdast-util-directive" />

import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

import type { Root } from 'mdast'
import type { MarkdownVFile } from '@astrojs/markdown-remark'

type BadgePreset = Record<string, { text: string; color: string }>
interface Config {
  badge: {
    defaultColor: string
    preset: BadgePreset
  }
}

/* video */
const VIDEO_PLATFORMS: Record<string, (id: string) => string> = {
  youtubeId: (id) => `https://www.youtube-nocookie.com/embed/${id}`,
  bilibiliId: (id) => `https://player.bilibili.com/player.html?bvid=${id}`,
  vimeoId: (id) => `https://player.vimeo.com/video/${id}`,
}

/* link */
const FAVICON_BASE_URL = 'https://www.google.com/s2/favicons'
const FAVICON_RESOLUTION = 128
const GITHUB_USERNAME_REGEXP =
  /^@[a-zA-Z0-9](?!.*--)[a-zA-Z0-9-_]{0,37}[a-zA-Z0-9]$/
const GITHUB_REPO_REGEXP =
  /^(?:@)?([a-zA-Z0-9](?!.*--)[a-zA-Z0-9-_]{0,37}[a-zA-Z0-9])\/.*$/
const LINK_STYLE = ['square', 'rounded', 'github'] as const
const TAB_ORG_REGEXP = /^org-(\w+)$/
const GITHUB_TAB = [
  'repositories',
  'projects',
  'packages',
  'stars',
  'sponsoring',
  'sponsors',
  'org-repositories',
  'org-projects',
  'org-packages',
  'org-sponsoring',
  'org-people',
]

/* badge */
const CONFIG: Config = {
  badge: {
    defaultColor: '#bebfc5',
    preset: {
      a: { text: 'ARTICLE', color: '#E9D66B|#fbf8cc' },
      v: { text: 'VIDEO', color: '#D473D4|#f1c0e8' },
      o: { text: 'OFFICIAL', color: '#4a8ce8|#a3c4f3' },
      f: { text: 'FEED', color: '#9568de|#cfbaf0' },
      t: { text: 'TOOL', color: '#FF9966|#ffcfd2' },
      w: { text: 'WEBSITE', color: '#8AB9F1|#90dbf4' },
      g: { text: 'GITHUB', color: '#74C365|#b9fbc0' },
    },
  },
}
const BADGE_REGEXP = /^badge-(.*)/
const VALID_BADGES = new Set(Object.keys(CONFIG.badge.preset))

/**
 * In MDX/Markdown, supports regular
 * {@link https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use remark-directive usage},
 * along with the following predefined directives:
 *
 *  - `::video`: enable consistent video embedding.
 *  - `:link`: link to GitHub users/repositories or other external URLs in Markdown/MDX. (Inspired by: https://github.com/antfu/markdown-it-magic-link)
 *  - `:badge`/`:badge-*`: customizable badge-like markers.
 */
function remarkDirectiveSugar() {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @param {import('vfile').VFile} file
   *   File.
   */
  return (tree: Root, file: MarkdownVFile) => {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}
        const children = node.children

        if (node.name === 'video') {
          /* ::video */
          if (node.type === 'textDirective')
            file.fail(
              'Unexpected `:video` text directive. Use double colons (`::`) for an `video` leaf directive.',
              node
            )

          if (node.type === 'containerDirective')
            file.fail(
              'Unexpected `:::video` container directive. Use double colons (`::`) for an `video` leaf directive.',
              node
            )

          // handle attributes
          let src = ''
          const { youtubeId, bilibiliId, vimeoId, iframeSrc } = attributes

          if (!youtubeId && !bilibiliId && !vimeoId && !iframeSrc) {
            file.fail(
              'Invalid `video` directive. Unexpectedly missing one of the following: `youtubeId`, `bilibiliId`, `iframeSrc`.',
              node
            )
          } else {
            for (const [key, id] of Object.entries({
              youtubeId,
              bilibiliId,
              vimeoId,
            })) {
              if (id) {
                src = VIDEO_PLATFORMS[key](id)
                break
              }
            }
            if (!src && iframeSrc) {
              src = iframeSrc
            }
          }

          // nested in div（otherwise, the transform style won‘t apply）
          data.hName = 'div'
          data.hProperties = {
            class: 'sugar-video',
            style: `${attributes.noScale && 'margin: 1rem 0'}`,
          }
          data.hChildren = [
            {
              type: 'element',
              tagName: 'iframe',
              properties: {
                style: `${attributes.noScale && 'transform: none'}`,
                src: src,
                title: attributes.title || 'Video Player',
                loading: 'lazy',
                allow:
                  'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                allowFullScreen: true,
              },
              children: [],
            },
          ]
        } else if (node.name === 'link') {
          /* :link */
          if (node.type === 'leafDirective')
            file.fail(
              'Unexpected `::link` text directive. Use single colon (`:`) for an `link` text directive.',
              node
            )

          if (node.type === 'containerDirective')
            file.fail(
              'Unexpected `:::link` container directive. Use single colon (`:`) for an `link` text directive.',
              node
            )

          let resolvedText = ''
          let resolvedLink = ''
          let resolvedImageUrl = ''
          let resolvedTab = ''
          let isOrg = false
          let resolvedStyle = ''

          const { id, link, imageUrl, tab, style } = attributes

          // check label
          if (children.length > 0 && children[0].type === 'text') {
            resolvedText = children[0].value
          } else if (!id) {
            file.fail(
              'Invalid `link` directive. The text in the `[]` of `:link[]{}` is required if `id` attribute is not specified.',
              node
            )
          }

          // check type
          if (style && (LINK_STYLE as readonly string[]).includes(style)) {
            resolvedStyle = style as typeof resolvedStyle
          } else if (
            style &&
            !(LINK_STYLE as readonly string[]).includes(style)
          ) {
            file.fail(
              'Invalid `link` directive. The `style` must be one of "square", "rounded", or "github".',
              node
            )
          }

          // check tab
          if (tab && !GITHUB_TAB.includes(tab)) {
            file.fail(
              'Invalid `link` directive. The `tab` must be one of the following: "repositories", "projects", "packages", "stars", "sponsoring", "sponsors", "org-repositories", "org-projects", "org-packages", "org-sponsoring", or "org-people".',
              node
            )
          } else if (tab) {
            const match = tab.match(TAB_ORG_REGEXP)
            if (match) {
              isOrg = true
              resolvedTab = match[1]
            } else {
              resolvedTab = tab
            }
          }

          // handle
          if (!id && link) {
            // non github scope
            resolvedLink = link
            resolvedImageUrl =
              imageUrl ||
              `${FAVICON_BASE_URL}?domain=${new URL(resolvedLink).hostname}&sz=${FAVICON_RESOLUTION}`
            resolvedStyle = resolvedStyle || 'square'
          } else if (id) {
            // github scope
            if (id.match(GITHUB_USERNAME_REGEXP)) {
              resolvedLink =
                link ||
                (resolvedTab && isOrg
                  ? `https://github.com/orgs/${id.substring(1)}/${resolvedTab}`
                  : `https://github.com/${id.substring(1)}?tab=${resolvedTab}`)

              resolvedImageUrl =
                imageUrl || `https://github.com/${id.substring(1)}.png`

              resolvedStyle = resolvedStyle || 'rounded'
              resolvedText = resolvedText || id.substring(1)
            } else if (id.match(GITHUB_REPO_REGEXP)) {
              const match = id.match(GITHUB_REPO_REGEXP)
              resolvedLink = link || `https://github.com/${id}`

              resolvedImageUrl =
                imageUrl || `https://github.com/${match && match[1]}.png`

              resolvedStyle = resolvedStyle || 'square'
              resolvedText = resolvedText || id
            } else {
              file.fail(
                'Invalid `link` directive. The `id` attribute must be provided in the format `@username` or `username/reponame`.',
                node
              )
            }
          } else {
            file.fail(
              'Invalid `link` directive. The `link` attribute is required if `id` attribute is not specified.',
              node
            )
          }

          if (resolvedStyle === 'square' || resolvedStyle === 'rounded') {
            data.hName = 'a'
            data.hProperties = {
              class: `${
                resolvedStyle === 'square'
                  ? 'sugar-link-square'
                  : 'sugar-link-rounded'
              }`,
              href: resolvedLink,
            }
            data.hChildren = [
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: 'sugar-link-image',
                  style: `background-image: url("${resolvedImageUrl}")`,
                },
                children: [],
              },
              {
                type: 'text',
                value: resolvedText,
              },
            ]
          } else if (resolvedStyle === 'github') {
            data.hName = 'span'
            data.hProperties = {
              style: 'white-space: nowrap',
            }
            data.hChildren = [
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: 'i-carbon-logo-github',
                },
                children: [],
              },
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  class: 'sugar-link-github',
                  href: resolvedLink,
                },
                children: [{ type: 'text', value: resolvedText }],
              },
            ]
          }
        } else if (node.name === 'badge') {
          /* :badge */
          if (node.type === 'leafDirective')
            file.fail(
              'Unexpected `::badge` text directive. Use single colon (`:`) for an `badge` text directive.',
              node
            )

          if (node.type === 'containerDirective')
            file.fail(
              'Unexpected `:::badge` container directive. Use single colon (`:`) for an `badge` text directive.',
              node
            )

          let resolvedText = ''
          let resolvedColorLight = ''
          let resolvedColorDark = ''

          const { color } = attributes

          // check label & get text
          if (children.length > 0 && children[0].type === 'text') {
            resolvedText = children[0].value
          } else {
            file.fail(
              'Invalid `badge` directive. The text in the `[]` of `:badge[]{}` is required.',
              node
            )
          }

          // get color
          // resolvedColor = color || CONFIG.badge.defaultColor
          if (color) {
            const colors = color.split('|').map((color) => color.trim())
            if (colors.length === 1) {
              resolvedColorLight = resolvedColorDark = colors[0]
            } else if (colors.length === 2) {
              ;[resolvedColorLight, resolvedColorDark] = colors
            } else {
              file.fail(
                "Invalid `badge` directive. The `color` expected one or two color values split by '|'.",
                node
              )
            }
          } else {
            resolvedColorLight = resolvedColorDark = CONFIG.badge.defaultColor
          }

          data.hName = 'span'
          data.hProperties = {
            class: 'sugar-badge',
            style: `--badge-color-light:${resolvedColorLight}; --badge-color-dark:${resolvedColorDark}`,
          }
          data.hChildren = [
            {
              type: 'text',
              value: resolvedText,
            },
          ]
        } else if (node.name.match(BADGE_REGEXP)) {
          /* :badge-* */
          const match = node.name.match(BADGE_REGEXP)
          if (match && VALID_BADGES.has(match[1])) {
            let resolvedColor = ''
            let resolvedColorLight = ''
            let resolvedColorDark = ''

            const { color } = attributes

            // get type
            const type = match[1]

            // get color
            resolvedColor = color || CONFIG.badge.preset[type].color

            if (resolvedColor) {
              const colors = resolvedColor
                .split('|')
                .map((color) => color.trim())
              if (colors.length === 1) {
                resolvedColorLight = resolvedColorDark = colors[0]
              } else if (colors.length === 2) {
                ;[resolvedColorLight, resolvedColorDark] = colors
              } else {
                file.fail(
                  "Invalid `badge` directive. The `color` expected one or two color values split by '|'.",
                  node
                )
              }
            } else {
              resolvedColorLight = resolvedColorDark = CONFIG.badge.defaultColor
            }

            data.hName = 'span'
            data.hProperties = {
              class: 'sugar-badge',
              // style: `background: ${CONFIG.badge.preset[type].color} `,
              style: `--badge-color-light:${resolvedColorLight}; --badge-color-dark:${resolvedColorDark}`,
            }
            data.hChildren = [
              {
                type: 'text',
                value: CONFIG.badge.preset[type].text,
              },
            ]
          } else {
            file.fail(
              'The `badge` directive failed to match a valid badge name.',
              node
            )
          }
        } else {
          /* common */
          const hast = h(node.name, attributes)
          data.hName = hast.tagName
          data.hProperties = hast.properties
        }
      }
    })
  }
}

export default remarkDirectiveSugar
