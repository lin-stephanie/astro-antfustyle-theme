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
  rules: [],

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
    presetWebFonts(),
  ],

  /* provides a unified interface to transform source code in order to support conventions */
  transformers: [transformerDirectives(), transformerVariantGroup()],

  /* work around the limitation of dynamically constructed utilities */
  safelist: [...navIcons, ...socialIcons],
})
