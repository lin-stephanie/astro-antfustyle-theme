import { mkdirSync, readFileSync, writeFileSync } from 'fs'

import { shorthash } from 'astro/runtime/server/shorthash.js'
import sharp from 'sharp'

const CACHE_PATH = './node_modules/.astro/placeholders/'

interface RemoteImageSuccess {
  isImage: true
  data: Uint8Array
  width: number
  height: number
}

interface RemoteImageFail {
  isImage: false
  data: null
  width: null
  height: null
}

/**
 * Calculates appropriate dimensions for the placeholder
 * based on original image size and quality.
 */
function getBitmapDimensions(
  imgWidth: number,
  imgHeight: number,
  pixelTarget: number
) {
  // h * r * h = ~P
  const ratioWH = imgWidth / imgHeight
  let bitmapHeight = pixelTarget / ratioWH
  bitmapHeight = Math.sqrt(bitmapHeight)
  const bitmapWidth = pixelTarget / bitmapHeight

  return { width: Math.round(bitmapWidth), height: Math.round(bitmapHeight) }
}

/**
 * Generates a placeholder image from running in dev mode.
 */
export async function generatePlaceholder(
  id: string,
  devSrc: string,
  width: number,
  height: number,
  quality = 100
) {
  // console.log('devSrc', devSrc)
  // /_image?href=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1612476177007-a36dc9e6d7a3&w=720&h=1080&f=webp

  // create a unique hash for caching
  const hash = shorthash(id + width + height + quality)

  // try to load from cache first
  try {
    return readFileSync(CACHE_PATH + hash, 'utf-8')
  } catch (_) {
    /* ignore cache miss */
  }

  // fetch from astro internal endpoint `/_image` when running in dev mode
  const origin = process.env.ASTRO_DEV_ORIGIN ?? 'http://localhost:4321'
  const res = await fetch(new URL(devSrc, origin))
  if (!res.ok)
    console.error(
      `[photos.${hash}.json.ts] fetch ${devSrc} failed: ${res.status}`
    )
  const buffer = Buffer.from(await res.arrayBuffer())

  // calculate appropriate dimensions for the placeholder
  const dims = getBitmapDimensions(width, height, quality)

  // process the image buffer to create a low-quality placeholder
  const placeholder = await sharp(buffer)
    .resize(dims.width, dims.height, { fit: 'inside' })
    .toFormat('webp', { quality: 1 })
    .modulate({ brightness: 1, saturation: 1.2 })
    .blur()
    .toBuffer({ resolveWithObject: true }) // apply blur effect for smoother appearance

  // convert the processed image to a base64 data URL for embedding in HTML
  const dataUrl = `data:image/${placeholder.info.format};base64,${placeholder.data.toString('base64')}`

  // save the generated placeholder to cache for future use
  mkdirSync(CACHE_PATH, { recursive: true })
  writeFileSync(CACHE_PATH + hash, dataUrl)

  return dataUrl
}

/**
 * Creates an `AbortSignal` that aborts after a specified timeout.
 */
function makeTimeout(ms: number): AbortSignal {
  const ctrl = new AbortController()
  setTimeout(() => ctrl.abort(), ms).unref()

  return ctrl.signal
}

/**
 * Combines `Uint8Array[]` into a single `Uint8Array`.
 */
function concat(chunks: Uint8Array[], size: number): Uint8Array {
  const out = new Uint8Array(size)
  let offset = 0

  for (const c of chunks) {
    out.set(c, offset)
    offset += c.length
  }

  return out
}

/**
 * Downloads a remote resource and determines if it's a valid image.
 */
export async function fetchRemoteImageWithSharp(
  urlStr: string,
  opts: { timeoutMs?: number; maxBytes?: number } = {}
): Promise<RemoteImageSuccess | RemoteImageFail> {
  const { timeoutMs = 10_000, maxBytes = 10_000_000 } = opts

  // 0. URL & protocol validation
  let url: URL
  try {
    url = new URL(urlStr)
    if (!/^https?:$/.test(url.protocol)) {
      console.warn(`[fetchRemoteImageWithSharp] Not HTTP/HTTPS: ${urlStr}`)
      return { isImage: false, data: null, width: null, height: null }
    }
  } catch {
    console.warn(`[fetchRemoteImageWithSharp] Invalid URL: ${urlStr}`)
    return { isImage: false, data: null, width: null, height: null }
  }

  // 1. HEAD pre-check (saves a large download)
  try {
    const head = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: makeTimeout(timeoutMs),
    })
    const ctype = head.headers.get('content-type') ?? ''

    // reject if content-length is too large
    const len = Number(head.headers.get('content-length') ?? 0)
    if (len && len > maxBytes) {
      console.warn(
        `[fetchRemoteImageWithSharp] File too large (${len}B): ${urlStr}`
      )
      return { isImage: false, data: null, width: null, height: null }
    }

    if (head.ok && !ctype.startsWith('image/')) {
      // may still be an image (server misconfiguration), continue with GET; but warn first
      console.warn(
        `[fetchRemoteImageWithSharp] Content-Type not image/* (${ctype}), continuing with deep inspection`
      )
    }
  } catch {
    // some cdns don't support HEAD: ignore and continue with GET
  }

  // 2. GET + download & metadata
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal: makeTimeout(timeoutMs),
  })

  if (!res.ok || !res.body) {
    console.warn(
      `[fetchRemoteImageWithSharp] Download failed: HTTP ${res.status}`
    )
    return { isImage: false, data: null, width: null, height: null }
  }

  // cache bytes and monitor size
  const chunks: Uint8Array[] = []
  let total = 0

  // stream reading to monitor size
  const reader = res.body.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > maxBytes) {
      console.warn(
        `[fetchRemoteImageWithSharp] Exceeded size limit ${maxBytes}B`
      )
      return { isImage: false, data: null, width: null, height: null }
    }
    chunks.push(value)
  }

  const buffer = concat(chunks, total)

  // 3. use sharp to validate + get dimensions
  try {
    const { width, height } = await sharp(buffer).metadata()

    if (!width || !height) {
      console.warn(`[fetchRemoteImageWithSharp] Missing width/height`)
      return { isImage: false, data: null, width: null, height: null }
    }

    return { isImage: true, data: buffer, width, height }
  } catch (err) {
    console.warn(
      `[fetchRemoteImageWithSharp] Not an image or parsing failed: ${(err as Error).message}`
    )
    return { isImage: false, data: null, width: null, height: null }
  }
}
