import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { UI } from './src/config'
import { extractIconsStartingWithI } from './src/utils/common'
import projecstData from './src/content/projects/data.json'
import { VERSION_COLOR } from './src/utils/github'

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

const projectIcons = extractIconsStartingWithI(projecstData.projects)

const versionClass = Object.values(VERSION_COLOR).flatMap((colorString) =>
  colorString.split(' ')
)

const subLogoIcons = githubView.subLogoMatches.map((item) => item[1])

export default defineConfig({
  // will be deep-merged to the default theme
  extendTheme: (theme) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        lgp: '1128px',
      },
    }
  },

  // define utility classes and the resulting CSS
  rules: [
    [
      /^bg-radial-gradient-(\d+)$/,
      ([, n]) => {
        return {
          'background-image': `radial-gradient(ellipse at bottom left, #ffffff 0%, #fefefe 70%, #88888855 ${n}%)`,
        }
      },
    ],
  ],

  // combine multiple rules as utility classes
  shortcuts: [
    ['op-transition', 'transition-opacity duration-300 ease-in-out'],
    [
      'shadow-c',
      'shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(255,255,255,0.4)]',
    ],
    [
      /^btn-(\w+)$/,
      ([_, color]) =>
        `px-2.5 py-1 border border-[#8884]! rounded op-50 transition-all duration-200 ease-out no-underline! hover:(op-100 text-${color} bg-${color}/10)`,
    ],
  ],

  // presets are partial configurations
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
        condensed: 'Roboto Condensed',
      },
    }),
  ],

  // provides a unified interface to transform source code in order to support conventions
  transformers: [transformerDirectives(), transformerVariantGroup()],

  // work around the limitation of dynamically constructed utilities
  // https://unocss.dev/guide/extracting#limitations
  safelist: [
    ...navIcons,
    ...socialIcons,
    ...projectIcons,

    /* remark-directive-sugar */
    'i-carbon-logo-github',

    /* BaseLayout */
    'focus:not-sr-only',
    'focus:fixed',
    'focus:start-1',
    'focus:top-1.5',
    'focus:op-20',

    /* GithubItem */
    ...versionClass,
    ...subLogoIcons,

    /* Toc */
    'i-ri-menu-2-fill',
    'i-ri-menu-3-fill',
  ],
})
