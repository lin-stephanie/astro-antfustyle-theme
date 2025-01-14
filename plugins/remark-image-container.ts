/**
 * @description Register directive nodes in mdast.
 * @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#types
 */
/// <reference types="mdast-util-directive" />

import { visit } from 'unist-util-visit'

import type { Root, Paragraph, PhrasingContent } from 'mdast'
import type { MarkdownVFile } from '@astrojs/markdown-remark'

const IMAGE_DIR_REGEXP = /^image-(.*)/
const VALID_TAGS_FOR_IMG = new Set<string>([
  'div',
  'span',
  'section',
  'article',
  'main',
  'aside',
  'header',
  'footer',
  'nav',
  'fieldset',
  'form',
])

/**
 * Convert `:::image-*` into container elements for images.
 */
function remarkImageContainer() {
  return (tree: Root, file: MarkdownVFile) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return

      if (node.name === 'image-figure') {
        /* image-figure */
        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}
        const children = node.children

        // add figure node
        data.hName = 'figure'

        // handle figcaption text
        // priority: content inside [] of `:::image-figure[]{}`、`![]()`
        let content: PhrasingContent[]
        if (
          children[0].type === 'paragraph' &&
          children[0].data?.directiveLabel &&
          children[0].children[0].type === 'text'
        ) {
          content = children[0].children
          children.shift()
        } else if (
          children[0].type === 'paragraph' &&
          children[0].children[0].type === 'image' &&
          children[0].children[0].alt
        ) {
          content = [{ type: 'text', value: children[0].children[0].alt }]
        } else {
          file.fail(
            'The figcaption text is missing in the `image-figure` directive. Specify it in the `[]` of `:::image-figure[]{}` or `![]()`.',
            node
          )
        }

        // add figcaption node
        const figcaptionNode: Paragraph = {
          type: 'paragraph',
          data: {
            hName: 'figcaption',
            hProperties: attributes,
          },
          children: content,
        }

        children.push(figcaptionNode)
      } else if (node.name === 'image-a') {
        /* image-a */
        if (!node.attributes || !node.attributes.href)
          file.fail(
            'Unexpectedly missing `href` in the `image-a` directive.',
            node
          )

        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}

        data.hName = 'a'
        data.hProperties = attributes
      } else if (node.name.match(IMAGE_DIR_REGEXP)) {
        /* image-* */
        const match = node.name.match(IMAGE_DIR_REGEXP)
        if (match && VALID_TAGS_FOR_IMG.has(match[1])) {
          const data = node.data || (node.data = {})
          const attributes = node.attributes || {}

          data.hName = match[1]
          data.hProperties = attributes

          // node.children.splice(0, 1, node.children[0].children[0])
        } else {
          file.fail(
            'The `image-*` directive failed to match a valid tag.',
            node
          )
        }
      }
    })
  }
}

export default remarkImageContainer
