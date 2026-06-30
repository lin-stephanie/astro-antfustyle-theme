import { fontData } from 'astro:assets'

import darkThemeCss from '~/styles/giscus/dark.css?raw'
import lightThemeCss from '~/styles/giscus/light.css?raw'
import { SITE } from '~/config'

import type { APIRoute, GetStaticPaths } from 'astro'

const themeCss = {
  dark: darkThemeCss,
  light: lightThemeCss,
}

/**
 * Resolves the CSS for a Giscus font face based on the specified style.
 */
function resolveGiscusFontFace(style: string, requestUrl: URL) {
  const font = fontData['--font-sans']?.find((item) => item.style === style)
  const source = font?.src.find((item) => item.format === 'woff2')
  if (!source)
    throw new Error(`Unable to find Inter ${style} WOFF2 source for Giscus.`)

  const baseUrl = import.meta.env.PROD ? SITE.website : requestUrl
  const fontUrl = new URL(source.url, baseUrl).href

  return `@font-face {
    font-family: 'Inter';
    src: url('${fontUrl}') format('woff2');
    font-weight: 100 900;
    font-style: ${style};
    font-display: swap;
  }`
}

/**
 * Handles GET requests for Giscus theme CSS files.
 * The CSS response with resolved font faces and the theme-specific CSS.
 */
export const GET: APIRoute = ({ params, url }) => {
  const theme = params.theme
  const css = theme === 'dark' || theme === 'light' ? themeCss[theme] : null

  const fontFaces = resolveGiscusFontFace('normal', url)

  return new Response(`${fontFaces}\n\n${css}`, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Access-Control-Allow-Origin': 'https://giscus.app',
    },
  })
}

export const getStaticPaths: GetStaticPaths = () => {
  return Object.keys(themeCss).map((theme) => ({
    params: { theme },
  }))
}
