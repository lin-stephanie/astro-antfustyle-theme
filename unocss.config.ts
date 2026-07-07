import {
  defineConfig,
  presetWind3,
  presetAttributify,
  presetIcons,
  transformerVariantGroup,
} from 'unocss'

import { UI } from './src/config'
import projecstData from './src/content/projects/data.json'

import type { PresetWind3Theme } from 'unocss'
import type {
  IconNavItem,
  ResponsiveNavItem,
  IconSocialItem,
  ResponsiveSocialItem,
} from './src/types'

const { internalNavs, socialLinks, githubView } = UI

const navIcons = internalNavs
  .filter(
    (item) =>
      item.displayMode !== 'alwaysText' &&
      item.displayMode !== 'textHiddenOnMobile'
  )
  .map((item) => (item as IconNavItem | ResponsiveNavItem).icon)
const socialIcons = socialLinks
  .filter(
    (item) =>
      item.displayMode !== 'alwaysText' &&
      item.displayMode !== 'textHiddenOnMobile'
  )
  .map((item) => (item as IconSocialItem | ResponsiveSocialItem).icon)

const projectIcons = projecstData.map((item) => item.icon)

const githubVersionColor: Record<string, string> = {
  major: 'bg-rose/15 text-rose-700 dark:text-rose-300',
  minor: 'bg-purple/15 text-purple-700 dark:text-purple-300',
  patch: 'bg-green/15 text-green-700 dark:text-green-300',
  pre: 'bg-teal/15 text-teal-700 dark:text-teal-300',
}
const githubVersionClass = Object.keys(githubVersionColor).map(
  (k) => `github-${k}`
)
const githubSubLogos = githubView.subLogoMatches.map((item) => item[1])

export default defineConfig<PresetWind3Theme>({
  content: {
    // From 66.6.5, custom `filesystem` overrides default
    // `'./src/components/**/*'` instead of merging it
    filesystem: [
      './src/content/**/*.{md,mdx}',
      './src/pages/**/*.{astro,md,mdx}',
      './src/{layouts,components}/**/*.astro',
    ],
  },
  extendTheme: (theme) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        lgp: '1128px',
      },
      fontFamily: {
        ...theme.fontFamily,
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
        condensed: 'var(--font-condensed)',
      },
    }
  },
  rules: [],
  shortcuts: [
    [
      /^(\w+)-transition(?:-(\d+))?$/,
      (match) =>
        `transition-${match[1] === 'op' ? 'opacity' : match[1]} duration-${match[2] ? match[2] : '300'} ease-in-out`,
    ],
    [
      /^shadow-custom_(-?\d+)_(-?\d+)_(-?\d+)_(-?\d+)$/,
      ([_, x, y, blur, spread]) =>
        `shadow-[${x}px_${y}px_${blur}px_${spread}px_rgba(0,0,0,0.2)] dark:shadow-[${x}px_${y}px_${blur}px_${spread}px_rgba(255,255,255,0.25)]`,
    ],
    [
      /^btn-(\w+)$/,
      ([_, color]) =>
        `px-2.5 py-1 border border-[#8884]! rounded op-50 transition-all duration-200 ease-out no-underline! hover:(op-100 text-${color} bg-${color}/10)`,
    ],
    [
      /^github-(major|minor|patch|pre)$/,
      ([, version]) => `rounded ${githubVersionColor[version]}`,
    ],
  ],
  presets: [
    presetWind3(),
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
  ],
  transformers: [transformerVariantGroup()],
  safelist: [
    ...navIcons,
    ...socialIcons,
    ...projectIcons,
    ...githubVersionClass,
    ...githubSubLogos,
  ],
})
