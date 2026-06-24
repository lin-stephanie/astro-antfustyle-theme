import crypto from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

import { getCollection } from 'astro:content'
import { shorthash } from 'astro/runtime/server/shorthash.js'

import {
  fetchRemoteImage,
  generatePlaceholder,
  getThumbnail,
} from '~/utils/image'
import { silentLogger, formatLogMessage, getErrorMessage } from '~/utils/server'

import type { APIRoute } from 'astro'
import type { Logger } from '~/utils/server'

export interface PhotoItem {
  uuid: string
  src: string
  desc: string
  thumbnail: string
  placeholder: string
  aspectRatio: number
}

const VERSION = 1
const CACHE_PATH = './node_modules/.astro/photos/'
const PLACEHOLDER_PIXEL_TARGET = 100
const THUMBNAIL_WIDTH = 720 // balance high pixel density and file size

// keep Astro collection order aligned with the source JSON fil
const photoConfig = JSON.parse(
  readFileSync('src/content/photos/data.json', 'utf-8')
) as {
  id: string
  desc?: string
}[]
const photoOrder = new Map(photoConfig.map((photo, index) => [photo.id, index]))
const photos = (await getCollection('photos'))
  .map((p) => ({
    id: p.data.id,
    desc: p.data.desc,
  }))
  .sort(
    (a, b) =>
      (photoOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
      (photoOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER)
  )

// `PhotoView` imports this hash to fetch a content-addressed JSON endpoint
export const hash = crypto
  .createHash('sha256')
  .update(`${VERSION}-${JSON.stringify(photos)}`)
  .digest('hex')
  .slice(0, 8)

// build photo data with caching
async function buildPhotoData(logger: Logger): Promise<{
  data: PhotoItem[]
  skippedCount: number
}> {
  const data: PhotoItem[] = []
  let skippedCount = 0

  for (const photo of photos) {
    const { id, desc } = photo

    // remote image
    if (id.startsWith('http://') || id.startsWith('https://')) {
      const uuid = shorthash(id + PLACEHOLDER_PIXEL_TARGET)

      // try to load from cache first
      let cache: { placeholder: string; aspectRatio: number } | null = null
      try {
        cache = JSON.parse(readFileSync(CACHE_PATH + uuid, 'utf-8'))
      } catch {
        // ignore cache miss
      }
      if (cache) {
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
      }

      // fetch remote image
      const remoteImage = await fetchRemoteImage(id)
      if (!remoteImage.ok) {
        skippedCount++
        logger.warn(
          formatLogMessage(`Skipping photo: ${id}`, remoteImage.reason)
        )
        continue
      }

      try {
        // get placeholder
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
      } catch (err) {
        skippedCount++
        logger.warn(
          formatLogMessage(`Skipping photo: ${id}`, getErrorMessage(err))
        )
      }
      continue
    }

    // local image
    // Keep imports lazy; only the matched local images are loaded
    const localImages = import.meta.glob<{ default: ImageMetadata }>(
      '/src/content/photos/**/*.{jpg,jpeg,png,webp,avif}'
    )
    // match id with local image path
    const localImagePath = Object.keys(localImages).find((path) =>
      path.includes(id)
    )
    if (!localImagePath) {
      skippedCount++
      logger.warn(
        formatLogMessage(`Skipping photo: ${id}`, 'Local image not found')
      )
      continue
    }

    // try to load from cache first
    let localImage: ImageMetadata
    try {
      localImage = (await localImages[localImagePath]()).default
    } catch (err) {
      skippedCount++
      logger.warn(
        formatLogMessage(`Skipping photo: ${id}`, getErrorMessage(err))
      )
      continue
    }

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

    try {
      // read local image buffer
      const localImageBuffer = readFileSync(
        (
          localImage as ImageMetadata & {
            fsPath: string
          }
        ).fsPath
      )

      // get placeholder
      const placeholder = await generatePlaceholder(
        localImageBuffer,
        localImage.width,
        localImage.height,
        PLACEHOLDER_PIXEL_TARGET
      )

      // get thumbnail
      const aspectRatio = localImage.width / localImage.height
      const thumbnail = await getThumbnail(
        localImage,
        THUMBNAIL_WIDTH,
        aspectRatio
      )

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
      writeFileSync(
        CACHE_PATH + uuid,
        JSON.stringify({ placeholder, aspectRatio })
      )
    } catch (err) {
      skippedCount++
      logger.warn(
        formatLogMessage(`Skipping photo: ${id}`, getErrorMessage(err))
      )
    }
  }

  return { data, skippedCount }
}

// cache only complete builds so skipped photos can be retried in later requests
let photoData: PhotoItem[] | undefined
async function getPhotoData(logger: Logger) {
  if (photoData) {
    logger.info(
      `[photos] Photo data ready: ${photoData.length} photos, 0 skipped`
    )

    return photoData
  }

  const { data, skippedCount } = await buildPhotoData(logger)
  if (skippedCount === 0) {
    photoData = data
  }

  logger.info(
    `[photos] Photo data ready: ${
      data.length + skippedCount
    } photos, ${skippedCount} skipped`
  )

  return data
}

export const GET: APIRoute = async ({ params, logger }) => {
  const data = await getPhotoData(logger ?? silentLogger)

  return new Response(JSON.stringify([params.hash, data]), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': import.meta.env.DEV
        ? 'no-store'
        : 'public, max-age=31536000, immutable',
    },
  })
}

export async function getStaticPaths() {
  return [{ params: { hash } }]
}
