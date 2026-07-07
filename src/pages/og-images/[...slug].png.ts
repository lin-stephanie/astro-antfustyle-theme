import { getOgImageManifest } from '~/utils/og-image/manifest'
import { generateOgImageBuffer } from '~/utils/og-image/generator'
import { silentLogger, formatLoggerInfoMessage } from '~/utils/server'

import type { APIRoute } from 'astro'
import type { OgImageManifestItem } from '~/utils/og-image/manifest'

/**
 * Generates an Open Graph image (PNG format) for a given path slug.
 */
export const GET: APIRoute = async ({ props, url, logger = silentLogger }) => {
  const { target } = props as { target: OgImageManifestItem }

  logger.info(
    formatLoggerInfoMessage(
      'og-images',
      `Generating OG image for ${target.slug}.png...`
    )
  )

  const pngBuffer = await generateOgImageBuffer(
    target.authorOrBrand,
    target.title,
    target.bgType,
    url
  )

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}

export async function getStaticPaths() {
  const manifest = await getOgImageManifest()

  return manifest.map((target) => ({
    params: { slug: target.slug },
    props: { target },
  }))
}
