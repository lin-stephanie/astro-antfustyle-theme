import { defineEcConfig, setLuminance, setAlpha } from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'

// https://expressive-code.com/reference/configuration/
export default defineEcConfig({
  /* Basics */
  defaultLocale: 'en-US',
  defaultProps: {
    wrap: false,
    preserveIndent: true,
    showLineNumbers: false,
    collapseStyle: 'collapsible-auto',
  },
  minSyntaxHighlightingColorContrast: 0,

  /* Plugins */
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],

  /* Styles */
  styleOverrides: {
    uiFontFamily: "'DM Mono', 'Input Mono', 'Fira Code', 'monospace'",
    uiFontSize: '1em',
    codeBackground: (context) =>
      context.theme.name === 'vitesse-dark' ? '#0e0e0e' : '#fafafa',
    codeFontFamily: "'DM Mono', 'Input Mono', 'Fira Code', 'monospace'",
    codeFontSize: '14.72px',
    codeLineHeight: '1.4',
    codePaddingBlock: '0.8571429em',
    codePaddingInline: '1.1428571em',

    /* Editor & Terminal Frames */
    frames: {
      frameBoxShadowCssValue: 'none',
      inlineButtonBackgroundActiveOpacity: '0.2',
      inlineButtonBackgroundHoverOrFocusOpacity: '0.1',
      terminalBackground: ({ theme }) =>
        theme.name === 'vitesse-dark' ? '#0e0e0e' : '#fafafa',
      tooltipSuccessBackground: ({ theme }) =>
        setLuminance(theme.colors['terminal.ansiGreen'] || '#0dbc79', 0.22),
    },

    /* Text & Line Markers */
    textMarkers: {
      backgroundOpacity: '0.25',
      borderOpacity: '0.5',
    },

    /* Collapsible Sections */
    collapsibleSections: {
      closedBackgroundColor: ({ theme }) =>
        setAlpha(theme.colors['editor.foldBackground'], 0.06) ||
        'rgb(84 174 255 / 20%)',
    },
  },

  /* Theme */
  themes: ['vitesse-dark', 'vitesse-light'],
  themeCssRoot: ':root',
  themeCssSelector: (theme) =>
    theme.name === 'vitesse-dark' ? ':root.dark' : ':root:not(.dark)',
  useDarkModeMediaQuery: false,
  useStyleReset: false,
})
