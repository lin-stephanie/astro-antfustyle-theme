import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { remarkPlugins, rehypePlugins } from './plugins'

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321/',
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
