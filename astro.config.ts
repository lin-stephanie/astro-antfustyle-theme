import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { remarkPlugins, rehypePlugins } from './plugins'
import config from './src/config'

// https://astro.build/config
export default defineConfig({
  site: config.site.url,
  integrations: [
    UnoCSS({
      injectReset: true, // or a path to the reset file
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    remarkPlugins,
    rehypePlugins,
  },
  vite: {
    plugins: [
      // ... other Vite plugins
    ],
    // ... other Vite options
  },
})
