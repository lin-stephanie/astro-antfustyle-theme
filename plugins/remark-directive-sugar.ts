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

/**
 * Used to convert `::video` directives to enable consistent video embedding in Markdown/MDX.
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
        // const children = node.children

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
      }
    })
  }
}

export default remarkDirectiveSugar
