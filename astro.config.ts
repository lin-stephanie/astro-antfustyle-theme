import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import astroExpressiveCode from 'astro-expressive-code'

import { remarkPlugins, rehypePlugins } from './plugins'
import config from './src/config'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: config.site.url,
  integrations: [
    UnoCSS({
      // https://unocss.dev/integrations/astro#style-reset
      injectReset: true,
    }),
    astroExpressiveCode(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },
  vite: {
    base: '/',
    plugins: [
      // ... other Vite plugins
    ],
    // ... other Vite options
  },
})
