/**
 * @description Register directive nodes in mdast.
 * @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#types
 */
/// <reference types="mdast-util-directive" />

import { visit } from 'unist-util-visit'
import type { Root, Paragraph, PhrasingContent } from 'mdast'

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
 * Used to convert `:::image-*` into container elements for images.
 *
 * @param Root tree - Tree.
 */
function remarkImageContainer() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return

      /* image-figure */
      if (node.name === 'image-figure') {
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
          throw new Error(
            'No figcaption text found for image-figure directive.'
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
      } else if (
        /* image-a */
        node.name === 'image-a'
      ) {
        if (!node.attributes || !node.attributes.href)
          throw new Error('No external links provided.')

        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}

        data.hName = 'a'
        const defaultAttrs = { target: '_blank' }
        data.hProperties = { ...defaultAttrs, ...attributes }
      } else {
        /* image-* */
        const regex = /^image-(.*)/
        const match = node.name.match(regex)
        if (match && VALID_TAGS_FOR_IMG.has(match[1])) {
          const data = node.data || (node.data = {})
          const attributes = node.attributes || {}

          data.hName = match[1]
          data.hProperties = attributes

          // node.children.splice(0, 1, node.children[0].children[0])
        } else {
          throw new Error(
            'The `image-*` directive failed to match a valid tag.'
          )
        }
      }
    })
  }
}

export default remarkImageContainer
