import { readFileSync } from 'node:fs'

import { decode } from 'html-entities'
import satori from 'satori'
import sharp from 'sharp'

import { resolveCwdPath } from '~/utils/server'
import { ogImageMarkup } from '~/utils/og-image/template/markup'

import type { SatoriOptions } from 'satori'
import type { html } from 'satori-html'
import type { BgType } from '~/types'

const satoriOptions: SatoriOptions = {
  // debug: true,
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Inter',
      weight: 400,
      style: 'normal',
      data: readFileSync(
        resolveCwdPath('src/utils/og-image/template/Inter-Regular-24pt.ttf')
      ),
    },
  ],
}

/**
 * Recursively unescapes HTML entities in a given virtual DOM node's children.
 *
 * Fix accidental HTML entity escaping in 'satori-html'.
 * @see https://github.com/natemoo-re/satori-html/issues/20#issuecomment-1999332693
 */
function unescapeHTML(node: ReturnType<typeof html>) {
  const children = node?.props?.children
  if (!children) {
    return
  } else if (Array.isArray(children)) {
    for (const n of children) {
      unescapeHTML(n)
    }
  } else if (typeof children === 'object') {
    unescapeHTML(children)
  } else if (typeof children === 'string') {
    node.props.children = decode(children)
  }
}

/**
 * Generates an Open Graph image as a PNG buffer.
 */
export async function generateOgImageBuffer(
  authorOrBrand: string,
  title: string,
  bgType: BgType
) {
  const node = ogImageMarkup(authorOrBrand, title, bgType)
  unescapeHTML(node)

  const svg = await satori(node, satoriOptions)

  return await sharp(Buffer.from(svg))
    .png({
      compressionLevel: 9,
      quality: 100,
    })
    .toBuffer()
}
