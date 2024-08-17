import chalk from 'chalk'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import type { SatoriOptions } from 'satori'

import { basename, dirname, join } from 'node:path'
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'

import { getCurrentFormattedTime } from '../src/utils'
import { ogImageMarkup } from './og-template/markup'
import { PAGES, FEATURES } from '../src/config'
import type { BgType } from '../src/types'

const Inter = readFileSync('plugins/og-template/Inter-Regular-24pt.ttf')

const satoriOptions: SatoriOptions = {
  // debug: true,
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Inter',
      weight: 400,
      style: 'normal',
      data: Inter,
    },
  ],
}

export function checkFileExistsInDir(path: string, filename: string) {
  const fullPath = join(process.cwd(), path, filename)

  return existsSync(fullPath)
}

async function generateOgImage(
  source: string,
  title: string,
  bgType: BgType,
  output: string
) {
  await mkdir(dirname(output), { recursive: true })

  console.log(
    `${chalk.black(getCurrentFormattedTime())} ${chalk.green(`Generating ${output}...`)}`
  )

  try {
    const svg = await satori(
      ogImageMarkup(source, title, bgType),
      satoriOptions
    )
    const png = new Resvg(svg).render().asPng()
    writeFileSync(output, png)
  } catch (e) {
    console.error(
      `${chalk.black(getCurrentFormattedTime())} ${chalk.red(`[ERROR] Failed to generate og image for '${basename(output)}.'`)}`
    )
    console.error(e)
  }
}

/**
 * Used to generate {@link https://ogp.me/ Open Graph} images.
 *
 * @see https://github.com/vfile/vfile
 */
function remarkGenerateOgImage() {
  // get config
  const ogImage = FEATURES.ogImage
  if (!(Array.isArray(ogImage) && ogImage[0])) return

  const sourceConfig = ogImage[1].authorOrBrand
  const titleConfig = ogImage[1].fallbackTitle
  const bgTypeConfig = ogImage[1].fallbackBgType

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return async (_tree, file) => {
    // regenerate fallback
    if (!checkFileExistsInDir('public/og-images', 'og-image.png')) {
      await generateOgImage(
        sourceConfig,
        titleConfig,
        bgTypeConfig,
        'public/og-images/og-image.png'
      )
    }

    // check filename
    const filename = file.basename
    if (!filename || !(filename.endsWith('.md') || filename.endsWith('.mdx')))
      return

    // check draft & redirect
    const draft = file.data.astro.frontmatter.draft
    const redirect = file.data.astro.frontmatter.redirect
    if (draft || redirect) return

    // check if it has been generated
    const extname = file.extname
    const nameWithoutExt = basename(filename, extname)
    // 'public/og-images' is equivalent to './public/og-images' and relative to the cwd
    if (checkFileExistsInDir('public/og-images', `${nameWithoutExt}.png`))
      return

    // check if it has been assigned & actually exists
    const ogImage = file.data.astro.frontmatter.ogImage
    if (ogImage && checkFileExistsInDir('public/og-images', basename(ogImage)))
      return

    if (
      ogImage &&
      !checkFileExistsInDir('public/og-images', basename(ogImage))
    ) {
      console.warn(
        `${chalk.black(getCurrentFormattedTime())} ${chalk.yellow(`[WARN] The '${ogImage}' specified in '${filename}' was not found. No new og image will be generated for '${filename}'. Please verify.`)}\n  ${chalk.bold('Hint:')} See ${chalk.cyan.underline('https://docs.astro.build/en/getting-started/')} for more information on og image.`
      )
      /* console.warn(
        `\x1b[90m${getCurrentFormattedTime()}\x1b[0m \x1b[33m[WARN] The image specified by the 'ogImage' field in '${filename}' was not found in the 'public/og-image' directory. No new og image will be generated for '${filename}'. Please verify.\x1b[0m`
      ) */
      return
    }

    // get title
    const title = file.data.astro.frontmatter.title
    if (!title.trim().length) {
      console.warn(
        `${chalk.black(getCurrentFormattedTime())} ${chalk.yellow(`[WARN] The 'title' field in the '${filename}' frontmatter is an empty string.`)}`
      )
    }

    // get bgType
    const dirname = basename(file.dirname)
    const bgType = PAGES[dirname].bgType ?? bgTypeConfig

    // generate og images
    await generateOgImage(
      sourceConfig,
      title.trim(),
      bgType,
      `public/og-images/${nameWithoutExt}.png`
    )
  }
}

export default remarkGenerateOgImage
