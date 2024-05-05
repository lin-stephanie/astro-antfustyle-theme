import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

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
      prefix: 'u:',
      prefixedOnly: true,
    }),
    presetIcons(),
    presetWebFonts(),
  ],

  /* provides a unified interface to transform source code in order to support conventions */
  transformers: [transformerDirectives(), transformerVariantGroup()],

  /* work around the limitation of dynamically constructed utilities */
  safelist: [],
})
