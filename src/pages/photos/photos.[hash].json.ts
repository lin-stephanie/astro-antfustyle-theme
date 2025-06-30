import crypto from 'node:crypto'
import { readFileSync } from 'node:fs'
import { getCollection } from 'astro:content'
import { getImage } from 'astro:assets'

import { fetchRemoteImageWithSharp, generatePlaceholder } from '~/utils/image'

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
// if (import.meta.env.DEV) console.log(localImageKeys)

for (const photo of photos) {
  const { id, desc } = photo
  const uuid = crypto.createHash('sha256').update(id).digest('hex').slice(0, 12)

  if (id.startsWith('http://') || id.startsWith('https://')) {
    const remoteImage = await fetchRemoteImageWithSharp(id)

    if (!remoteImage.isImage) {
      console.warn(`[photos.${hash}.json.ts] Skipping invalid image: ${id}`)
      continue
    }

    const placeholder = await generatePlaceholder(
      id,
      remoteImage.data,
      remoteImage.width,
      remoteImage.height
    )

    const radio = remoteImage.width / remoteImage.height
    // set unified width to 720 to balance high pixel density and file size
    const result = await getImage({
      src: id,
      width: 720,
      height: 720 / radio,
      widths: [720],
    })

    data.push({
      uuid,
      src: id,
      desc,
      thumbnail: result.src,
      placeholder,
      aspectRatio: radio,
    })

    continue
  }

  const localImagePath = localImageKeys.find((path) => path.includes(id))
  if (!localImagePath) {
    console.warn(`[photos.${hash}.json.ts] Skipping invalid image: ${id}`)
    continue
  }

  const localImage = (await localImages[localImagePath]()).default
  const localImageBuffer = readFileSync(
    (
      localImage as ImageMetadata & {
        fsPath: string
      }
    ).fsPath
  )

  const placeholder = await generatePlaceholder(
    id,
    localImageBuffer,
    localImage.width,
    localImage.height
  )

  const radio = localImage.width / localImage.height
  const result = await getImage({
    src: localImage,
    width: 720,
    height: 720 / radio,
    widths: [720],
  })

  data.push({
    uuid,
    src: localImage.src,
    desc,
    thumbnail: result.src,
    placeholder,
    aspectRatio: radio,
  })

  if (!localImage) {
    console.warn(`[photos.${hash}.json.ts] Skipping invalid image: ${id}`)
    continue
  }
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
