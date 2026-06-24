import { getImage } from 'astro:assets'
import sharp from 'sharp'
import { getErrorMessage } from '~/utils/server'

import type { SharpInput } from 'sharp'

interface RemoteImageSuccess {
  ok: true
  data: Uint8Array
  width: number
  height: number
}

interface RemoteImageFail {
  ok: false
  data: null
  width: null
  height: null
  reason: string
}

const TIMEOUT_MS = 30_000 // 30 seconds
const MAX_BYTES = 10_000_000 // 10MB

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
 * Generates a placeholder image for the given image buffer.
 */
export async function generatePlaceholder(
  buffer: SharpInput,
  width: number,
  height: number,
  pixelTarget: number
) {
  // calculate appropriate dimensions for the placeholder
  const dims = getBitmapDimensions(width, height, pixelTarget)

  // process the image buffer to create a low-quality placeholder
  const placeholder = await sharp(buffer)
    .resize(dims.width, dims.height, { fit: 'inside' })
    .toFormat('webp', { quality: 1 })
    .modulate({ brightness: 1, saturation: 1.2 })
    .blur()
    .toBuffer({ resolveWithObject: true })

  // convert the processed image to a base64 data URL for embedding in HTML
  const dataUrl = `data:image/${placeholder.info.format};base64,${placeholder.data.toString('base64')}`

  return dataUrl
}

/**
 * Builds a typed failure result without logging; callers decide how to report it.
 */
function fail(reason: string): RemoteImageFail {
  return { ok: false, data: null, width: null, height: null, reason }
}

/**
 * Creates an `AbortSignal` that aborts after a specified timeout.
 */
function makeTimeout(ms: number): { signal: AbortSignal; clear: () => void } {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  timer.unref?.()

  return {
    signal: ctrl.signal,
    clear: () => clearTimeout(timer),
  }
}

/**
 * Formats bytes to a human-readable string.
 */
function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`

  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
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
export async function fetchRemoteImage(
  urlStr: string,
  opts: {
    timeoutMs?: number
    maxBytes?: number
  } = {}
): Promise<RemoteImageSuccess | RemoteImageFail> {
  const { timeoutMs = TIMEOUT_MS, maxBytes = MAX_BYTES } = opts

  // 0. URL & protocol validation
  let url: URL
  try {
    url = new URL(urlStr)
    if (!/^https?:$/.test(url.protocol)) {
      return fail('Not HTTP/HTTPS')
    }
  } catch (err) {
    return fail(getErrorMessage(err))
  }

  // 1. HEAD pre-check (saves a large download)
  const headTimeout = makeTimeout(timeoutMs)
  try {
    const head = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: headTimeout.signal,
    })

    // reject if content-length is too large
    const len = Number(head.headers.get('content-length') ?? 0)
    if (len && len > maxBytes) {
      return fail(
        `File too large (${formatBytes(len)} > ${formatBytes(maxBytes)} limit; increase \`MAX_BYTES\` if needed)`
      )
    }
  } catch {
    // some cdns don't support HEAD: ignore and continue with GET
  } finally {
    headTimeout.clear()
  }

  // 2. GET + download & metadata
  let buffer: Uint8Array
  const getTimeout = makeTimeout(timeoutMs)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: getTimeout.signal,
    })

    if (!res.ok || !res.body) {
      return fail(`Download failed: HTTP ${res.status}`)
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
        await reader.cancel().catch(() => undefined)
        return fail(
          `File too large (${formatBytes(total)} > ${formatBytes(maxBytes)} limit; increase MAX_BYTES if needed)`
        )
      }
      chunks.push(value)
    }

    buffer = concat(chunks, total)
  } catch (err) {
    return fail(getErrorMessage(err))
  } finally {
    getTimeout.clear()
  }

  // 3. use sharp to validate + get dimensions
  try {
    const { width, height } = await sharp(buffer).metadata()

    if (!width || !height) {
      return fail('Missing width/height')
    }

    return { ok: true, data: buffer, width, height }
  } catch (err) {
    return fail(getErrorMessage(err))
  }
}

/**
 * Generates a thumbnail for the given image.
 */
export async function getThumbnail(
  src: string | ImageMetadata,
  width: number,
  ratio: number
): Promise<string> {
  const result = await getImage({
    src,
    width,
    height: width / ratio,
    widths: [width],
  })

  return result.src
}
