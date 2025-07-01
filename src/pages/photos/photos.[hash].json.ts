import crypto from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

import { getCollection } from 'astro:content'
import { shorthash } from 'astro/runtime/server/shorthash.js'

import {
  fetchRemoteImageWithSharp,
  generatePlaceholder,
  getThumbnail,
} from '~/utils/image'

import type { APIRoute } from 'astro'

const CACHE_PATH = './node_modules/.astro/photos/'
const PLACEHOLDER_PIXEL_TARGET = 100
// balance high pixel density and file size
const THUMBNAIL_WIDTH = 720

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
  '/src/content/photos/**/*.{jpg,jpeg,png,webp,avif}'
)
const localImageKeys = Object.keys(localImages)
// if (import.meta.env.DEV) console.log(localImageKeys)

for (const photo of photos) {
  const { id, desc } = photo

  // remote image
  if (id.startsWith('http://') || id.startsWith('https://')) {
    // try to load from cache first
    const uuid = shorthash(id + PLACEHOLDER_PIXEL_TARGET)
    try {
      const cache = JSON.parse(readFileSync(CACHE_PATH + uuid, 'utf-8'))
      const thumbnail = await getThumbnail(
        id,
        THUMBNAIL_WIDTH,
        cache.aspectRatio
      )
      data.push({
        uuid,
        src: id,
        desc,
        thumbnail,
        placeholder: cache.placeholder,
        aspectRatio: cache.aspectRatio,
      })
      continue
    } catch (_) {
      // ignore cache miss
    }

    // get placeholder
    const remoteImage = await fetchRemoteImageWithSharp(id)
    if (!remoteImage.isImage) {
      console.warn(`[photos.${hash}.json.ts] Skipping invalid image: ${id}`)
      continue
    }
    const placeholder = await generatePlaceholder(
      remoteImage.data,
      remoteImage.width,
      remoteImage.height,
      PLACEHOLDER_PIXEL_TARGET
    )

    // get thumbnail
    const aspectRatio = remoteImage.width / remoteImage.height
    const thumbnail = await getThumbnail(id, THUMBNAIL_WIDTH, aspectRatio)

    data.push({
      uuid,
      src: id,
      desc,
      thumbnail,
      placeholder,
      aspectRatio,
    })

    // save to cache
    mkdirSync(CACHE_PATH, { recursive: true })
    writeFileSync(
      CACHE_PATH + uuid,
      JSON.stringify({ placeholder, aspectRatio })
    )

    continue
  }

  // local image
  // match id with local image path
  const localImagePath = localImageKeys.find((path) => path.includes(id))
  if (!localImagePath) {
    console.warn(`[photos.${hash}.json.ts] Skipping invalid image: ${id}`)
    continue
  }

  // try to load from cache first
  const localImage = (await localImages[localImagePath]()).default
  const uuid = shorthash(
    id + PLACEHOLDER_PIXEL_TARGET + localImage.width + localImage.height
  )
  try {
    const cache = JSON.parse(readFileSync(CACHE_PATH + uuid, 'utf-8'))
    const thumbnail = await getThumbnail(
      localImage,
      THUMBNAIL_WIDTH,
      cache.aspectRatio
    )
    data.push({
      uuid,
      src: localImage.src,
      desc,
      thumbnail,
      placeholder: cache.placeholder,
      aspectRatio: cache.aspectRatio,
    })
    continue
  } catch (_) {
    // ignore cache miss
  }

  // get placeholder
  const localImageBuffer = readFileSync(
    (
      localImage as ImageMetadata & {
        fsPath: string
      }
    ).fsPath
  )
  const placeholder = await generatePlaceholder(
    localImageBuffer,
    localImage.width,
    localImage.height,
    PLACEHOLDER_PIXEL_TARGET
  )

  // get thumbnail
  const aspectRatio = localImage.width / localImage.height
  const thumbnail = await getThumbnail(localImage, THUMBNAIL_WIDTH, aspectRatio)

  data.push({
    uuid,
    src: localImage.src,
    desc,
    thumbnail,
    placeholder,
    aspectRatio,
  })

  // save to cache
  mkdirSync(CACHE_PATH, { recursive: true })
  writeFileSync(CACHE_PATH + uuid, JSON.stringify({ placeholder, aspectRatio }))
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
  return [{ params: { hash } }]
}
