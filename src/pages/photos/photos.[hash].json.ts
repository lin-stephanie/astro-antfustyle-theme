import crypto from 'node:crypto'
import { getCollection } from 'astro:content'
import { getImage } from 'astro:assets'

import { generatePlaceholder } from '~/utils/image'

import type { APIRoute } from 'astro'

export interface PhotoItem {
  uuid: string
  src: string
  desc: string
  thumbnail: string
  placeholder: string
  aspectRatio: number
}

const VERSION = 1
const photos = (await getCollection('photos')).map((p) => ({
  id: p.data.id,
  desc: p.data.desc,
}))

export const hash = crypto
  .createHash('sha256')
  .update(`${VERSION}-${JSON.stringify(photos)}`)
  .digest('hex')
  .slice(0, 8)

const data: PhotoItem[] = []
const localImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/photos/**/*.{jpg,jpeg,png,webp}'
)
const localImageKeys = Object.keys(localImages)
// console.log(localImageKeys)

for (const photo of photos) {
  const { id, desc } = photo
  const uuid = crypto.createHash('sha256').update(id).digest('hex').slice(0, 12)
  const isRemote = id.startsWith('http://') || id.startsWith('https://')

  let result
  if (isRemote) {
    // set unified width to 720 to balance high pixel density and file size
    result = await getImage({
      src: id,
      inferSize: true,
      widths: [720],
    })
  } else {
    const localImagePath = localImageKeys.find((path) => path.includes(id))
    if (!localImagePath) {
      console.warn(`[photos.${hash}.json.ts] Skipping invalid image: ${id}`)
      continue
    }
    const localImage = (await localImages[localImagePath]()).default

    result = await getImage({
      src: localImage,
      widths: [720],
    })
  }

  // console.log('result', result)
  // console.log('result.srcSet', result.srcSet)

  const placeholder = await generatePlaceholder(
    id,
    result.srcSet.values[0].url,
    result.attributes.width,
    result.attributes.height
  )

  data.push({
    uuid,
    src: result.src,
    desc,
    placeholder,
    aspectRatio: result.attributes.width / result.attributes.height,
    thumbnail: result.srcSet.values[0].url,
  })
}

export const GET: APIRoute = ({ params }) => {
  return new Response(JSON.stringify([params.hash, data]), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable',
      // 'public, max-age=0, stale-while-revalidate=31536000, stale-if-error=31536000',
    },
  })
}

export async function getStaticPaths() {
  return [{ params: { hash: hash } }]
}
