/**
 * @description Register directive nodes in mdast.
 * @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#types
 */
/// <reference types="mdast-util-directive" />

import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { MarkdownVFile } from '@astrojs/markdown-remark'

const VIDEO_PLATFORMS: Record<string, (id: string) => string> = {
  youtubeId: (id) => `https://www.youtube-nocookie.com/embed/${id}`,
  bilibiliId: (id) => `https://player.bilibili.com/player.html?bvid=${id}`,
  vimeoId: (id) => `https://player.vimeo.com/video/${id}`,
}

const GITHUB_USERNAME = /^@[a-zA-Z0-9](?!.*--)[a-zA-Z0-9-_]{0,37}[a-zA-Z0-9]$/
const GITHUB_REPO = /^([a-zA-Z0-9](?!.*--)[a-zA-Z0-9-_]{0,37}[a-zA-Z0-9])\/.*$/
const LINK_STYLE = ['button-s', 'button-r', 'github-link'] as const
/* const GITHUB_TAB = [
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
] */

/**
 * `::video`: enable consistent video embedding in Markdown/MDX.
 *
 * `:link`: add styled external links in Markdown/MDX, including simplified syntax for linking to GitHub users/repos
 * (inspired by: https://github.com/antfu/markdown-it-magic-link)
 *
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

        /* ::video */
        if (node.name === 'video') {
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
              'Unexpectedly missing one of the following in the `video` directive: `youtubeId`, `bilibiliId`, `iframeSrc`.',
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
            class: 'video',
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
        }

        /* :link */
        if (node.name === 'link') {
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
          let resolvedStyle = ''

          const { id, link, imageUrl /* , tab */, style } = attributes

          // check label
          if (children.length > 0 && children[0].type === 'text') {
            resolvedText = children[0].value
            // console.log(resolvedText)
          } else if (!id) {
            file.fail(
              'Invalid directive. The text in the `[]` of `:link[]{}` is required if `id` attribute is not specified.',
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
              'The `style` must be one of "button-s", "button-r", or "github-link".',
              node
            )
          }

          if (!id && link) {
            // non github scope
            resolvedLink = link
            resolvedImageUrl =
              imageUrl ||
              `https://favicon.yandex.net/favicon/${new URL(resolvedLink).hostname}`
            resolvedStyle = resolvedStyle || 'button-s'
          } else if (id) {
            // github scope
            if (id.match(GITHUB_USERNAME)) {
              resolvedLink = link || `https://github.com/${id.substring(1)}`
              resolvedImageUrl =
                imageUrl || `https://github.com/${id.substring(1)}.png`
              resolvedStyle = resolvedStyle || 'button-r'
              resolvedText = resolvedText || id
            } else if (id.match(GITHUB_REPO)) {
              const match = id.match(GITHUB_REPO)
              resolvedLink = link || `https://github.com/${id}`
              resolvedImageUrl =
                imageUrl || `https://github.com/${match && match[1]}.png`
              resolvedStyle = resolvedStyle || 'button-s'
              resolvedText = resolvedText || id
            } else {
              file.fail(
                'Invalid directive. The `id` attribute must be provided in the format `@username` or `username/reponame`.',
                node
              )
            }
          } else {
            file.fail(
              'Invalid directive. The `link` attribute is required if `id` attribute is not specified.',
              node
            )
          }

          if (resolvedStyle === 'button-s' || resolvedStyle === 'button-r') {
            data.hName = 'a'
            data.hProperties = {
              class: `magic-button ${
                resolvedStyle === 'button-s'
                  ? 'magic-button-square'
                  : 'magic-button-rounded'
              }`,
              href: resolvedLink,
            }
            data.hChildren = [
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: 'magic-button-image',
                  style: `background-image: url("${resolvedImageUrl}")`,
                },
                children: [],
              },
              {
                type: 'text',
                value: resolvedText,
              },
            ]
          } else if (resolvedStyle === 'github-link') {
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
                  class: 'magic-github-link',
                  href: resolvedLink,
                },
                children: [{ type: 'text', value: resolvedText }],
              },
            ]
          }
        }
        /* ::tweet */
      }
    })
  }
}

export default remarkDirectiveSugar
