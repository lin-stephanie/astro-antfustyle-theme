import sharp from 'sharp'
import chalk from 'chalk'
import { mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { getCurrentFormattedTime } from '../src/utils'

const svgTemplate = readFileSync('plugins/templates/og-plum.svg', 'utf-8')

function checkFileExistsInDir(path: string, filename: string) {
  const fullPath = join(process.cwd(), path, filename)

  return existsSync(fullPath)
}

async function generateOgImage(title: string, output: string) {
  await mkdir(dirname(output), { recursive: true })

  const lines = title.split(/(.{0,35})(?:\s|$)/g).filter(Boolean)
  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2],
  }

  const svg = svgTemplate.replace(
    /\{\{([^}]+)}}/g,
    (_, name) => data[name] || ''
  )

  console.log(
    `${chalk.black(getCurrentFormattedTime())} ${chalk.green(`Generating ${output}...`)}`
  )

  try {
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(output)
  } catch (e) {
    console.error(`Failed to generate og image for '${basename(output)}'`, e)
  }
}

/**
 * Used to generate {@link https://ogp.me/ Open Graph} images.
 *
 * @see https://github.com/vfile/vfile
 */
function remarkGenerateOgImage() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return async (_tree, file) => {
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
    // const match = filename.match(/^(.+?)\.(md|mdx)$/)
    // const nameWithoutExt = match[1]
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
      /* console.log(
        `\x1b[90m${getCurrentFormattedTime()}\x1b[0m \x1b[33m[WARN] The image specified by the 'ogImage' field in '${filename}' was not found in the 'public/og-image' directory. No new og image will be generated for '${filename}'. Please verify.\x1b[0m`
      ) */
      console.log(
        `${chalk.black(getCurrentFormattedTime())} ${chalk.yellow(`[WARN] The '${ogImage}' specified in '${filename}' was not found. No new og image will be generated for '${filename}'. Please verify.`)}\n  ${chalk.bold('Hint:')} See ${chalk.cyan.underline('https://docs.astro.build/en/getting-started/')} for more information on og image.`
      )
      return
    }

    // get frontmatter title
    const title = file.data.astro.frontmatter.title
    if (!title.trim().length) {
      console.log(
        `${chalk.black(getCurrentFormattedTime())} ${chalk.yellow(`[WARN] The 'title' field in the '${filename}' frontmatter is an empty string.`)}`
      )
    }

    // generate og images
    await generateOgImage(
      title.trim(),
      `public/og-images/${nameWithoutExt}.png`
    )

    // add frontmatter
    file.data.astro.frontmatter.ogImage = `/og-images/${nameWithoutExt}.png`
  }
}

export default remarkGenerateOgImage
