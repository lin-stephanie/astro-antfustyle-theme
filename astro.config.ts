import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import unocss from 'unocss/astro'
import astroExpressiveCode from 'astro-expressive-code'

import { remarkPlugins, rehypePlugins } from './plugins'
import { SITE } from './src/config'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE.website,
  integrations: [
    unocss({
      // https://unocss.dev/integrations/astro#style-reset
      injectReset: true,
    }),
    astroExpressiveCode(),
    mdx(),
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
