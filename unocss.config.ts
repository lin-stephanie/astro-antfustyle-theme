import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { navBar, socials } from './src/blog-config.json'

const navIcons = navBar.map((item) => `i-${item.icon}`)
const socialIcons = socials.map((item) => `i-${item.icon}`)

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
  shortcuts: [],

  /* presets are partial configurations */
  presets: [
    presetUno(),
    presetAttributify({
      strict: true,
      prefix: 'u-',
      prefixedOnly: true,
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
  safelist: [...navIcons, ...socialIcons],
})
