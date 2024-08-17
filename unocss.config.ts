import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import projecstData from './src/content/projects/data.json'
import { extractIconsStartingWithI } from './src/utils'
import { SITE, SOCIALS } from './src/config'
import type { IconNavItem, ResponsiveNavItem } from './src/types'

const navIcons = SITE.navBar
  .filter((item) => item.type !== 'text')
  .map((item) => (item as IconNavItem | ResponsiveNavItem).icon)
const socialIcons = SOCIALS.map((item) => item.icon)
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
    [
      /^bg-radial-gradient-(\d+)$/,
      ([, n]) => {
        return {
          'background-image': `radial-gradient(ellipse at bottom left, #ffffff 0%, #fefefe 70%, #88888855 ${n}%)`,
        }
      },
    ],
  ],

  /* combine multiple rules */
  shortcuts: [
    [
      'shadow-c',
      'shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
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
