import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
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
  ],
  markdown: {
    // https://docs.astro.build/en/guides/markdown-content/#shiki-configuration
    shikiConfig: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      wrap: false,
    },
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
