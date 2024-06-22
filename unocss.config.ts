import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { extractIconsStartingWithI } from './src/utils'
import projecstData from './src/content/projects/data.json'
import config from './src/config'

const { socials, navBar } = config.site

const navIcons = navBar
  .filter((item) => item.type !== 'text')
  // @ts-expect-error (for Property 'icon' does not exist on type 'TextNavItem'.ts(2339))
  .map((item) => item.icon)
const socialIcons = socials.map((item) => item.icon)
const projectIcons = extractIconsStartingWithI(projecstData.projects)

export default defineConfig({
  /* define utility classes and the resulting CSS */
  rules: [
    [
      /^slide-enter-(\d+)$/,
      ([_, n]) => ({
        '--enter-stage': n,
      }),
    ],
  ],

  /* combine multiple rules */
  shortcuts: [
    [
      'shadow-c',
      'shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    ],
  ],

  /* presets are partial configurations */
  presets: [
    presetUno(),
    presetAttributify({
      strict: true,
      prefix: 'u-',
      prefixedOnly: false,
    }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
  ],

  /* provides a unified interface to transform source code in order to support conventions */
  transformers: [transformerDirectives(), transformerVariantGroup()],

  /* work around the limitation of dynamically constructed utilities */
  safelist: [...navIcons, ...socialIcons, ...projectIcons],
})
