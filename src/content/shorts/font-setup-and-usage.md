---
title: Font Setup & Usage
description: Explain the theme font families, usage locations, and the migration from UnoCSS web fonts to Astro Fonts.
tags: [configuration, font]
pubDate: 2026-07-07
lastModDate: ''
ogImage: false
toc: true
share: true
giscus: true
search: true
---

The theme manages fonts through [Astro Fonts](https://docs.astro.build/en/guides/fonts/) in `astro.config.ts`. Main site fonts use Astro's Fontsource provider, while the Open Graph image font uses Astro's Google provider for a Satori-compatible WOFF file. Generated font files are served from the site build output instead of being loaded from providers at runtime.

## Font Configuration

The table below summarizes the `fonts` entries configured in `astro.config.ts`. Each row defines a CSS variable, the font provider Astro uses to resolve the font file, and the fallback stack used when the primary font cannot be loaded, aligned with the default theme in [Tailwind CSS 4](https://tailwindcss.com/docs/theme#default-theme-variable-reference).

| CSS variable | Provider | Font | Weight and style | Format | Fallbacks |
| --- | --- | --- | --- | --- | --- |
| `--font-sans` | Fontsource | Inter | variable `100 900`, normal, latin | `woff2` | `ui-sans-serif`, `system-ui`, emoji fonts, `sans-serif` |
| `--font-mono` | Fontsource | DM Mono | `400`, normal, latin | `woff2` | `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `Liberation Mono`, `Courier New`, `monospace` |
| `--font-condensed` | Fontsource | Roboto Condensed | `400`, normal, latin | `woff2` | `ui-sans-serif`, `system-ui`, emoji fonts, `sans-serif` |
| `--font-og-sans` | Google | Inter | `400`, normal, latin, optical size `24` | `woff` | `ui-sans-serif`, `system-ui`, emoji fonts, `sans-serif` |

Astro turns the first three entries into CSS variables through the `<Font />` component in `src/components/base/Head.astro`. The generated font family names include a hash.

```css
:root {
  --font-sans:
    Inter-<hash>,
    "Inter-<hash> fallback: Arial",
    ui-sans-serif,
    system-ui,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
    sans-serif;

  --font-mono:
    "DM Mono-<hash>",
    "DM Mono-<hash> fallback: Courier New",
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    "Liberation Mono",
    "Courier New",
    monospace;

  --font-condensed:
    "Roboto Condensed-<hash>", 
    "Roboto Condensed-<hash> fallback: Arial",
    ui-sans-serif,
    system-ui,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
    sans-serif;
}
```

> [!note]- Why generated names include hashes and fallback names
>
> Astro Fonts rewrites the family name to include a generated hash so each resolved font file can be uniquely identified and cached. It also creates a metrics-adjusted [fallback face](https://docs.astro.build/en/guides/fonts/#customizing-font-fallbacks), such as `"Inter-<hash> fallback: Arial"`, so text layout stays closer to the loaded font while the real web font is still loading or unavailable.

> [!important]- About `--font-og-sans`
>
> `--font-og-sans` is different from the theme’s regular font variables: it is not emitted into the page CSS.
>
> It is used only in `src/utils/og-image/generator.ts`, where Astro’s [`fontData` and `experimental_getFontFileURL()`](https://docs.astro.build/en/guides/fonts/#accessing-font-data-programmatically) resolve a Google-provider WOFF file. That binary font data is then passed to Satori, which requires WOFF or TTF rather than the Fontsource WOFF2 files used by the normal site.
>
> Because `<Font />` does not render this variable, `font-family: var(--font-og-sans)` will not work in regular CSS by default.
>
> To make it available globally, add:
>
> ```astro title='src/components/base/Head.astro'
> <Font cssVariable="--font-og-sans" />
> ```
>
> Then map it in UnoCSS:
>
> ```ts title='unocss.config.ts'
> fontFamily: {
>   ...theme.fontFamily,
>   og: 'var(--font-og-sans)',
> }
> ```
>
> After that, use `font-og` as a utility class or reference `var(--font-og-sans)` directly in CSS.

## UnoCSS Font Utilities

This project uses UnoCSS with the [Wind3 preset](https://unocss.dev/presets/wind3) inherits from [Mini preset](https://unocss.dev/presets/mini), which already provides the [`font-sans`, `font-serif`, and `font-mono`](https://github.com/unocss/unocss/blob/main/packages-presets/preset-mini/src/_theme/font.ts) utilities.

The theme overrides `font-sans` and `font-mono`, and adds `font-condensed`, in `unocss.config.ts`:

```ts title='unocss.config.ts'
fontFamily: {
  ...theme.fontFamily,
  sans: 'var(--font-sans)',
  mono: 'var(--font-mono)',
  condensed: 'var(--font-condensed)',
}
```

That means these utilities resolve to:

```css
.font-sans {
  font-family: var(--font-sans);
}

.font-mono {
  font-family: var(--font-mono);
}

.font-condensed {
  font-family: var(--font-condensed);
}
```

`font-serif` is still provided by the Wind3 preset and is not changed by this theme. Note that there is no corresponding `--font-serif` CSS variable available.

```css
.font-serif {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
```

## Where Fonts Are Used

| Location | Configuration | Effect |
| --- | --- | --- |
| `Head.astro` | `<Font />` | Emits the `@font-face` rules and page CSS variables for the main site fonts. Inter is [preloaded](https://docs.astro.build/en/guides/fonts/#preloading-fonts) because it is the body font. |
| `BaseLayout.astro` | `font-sans` | Makes Inter the default font for most UI and prose content. |
| `ec.config.mjs` | `var(--font-mono)` | Makes Expressive Code frame UI and code content use DM Mono. |
| `BackLink.astro` | `font-mono` | Styles the terminal-like `> cd ..` back link. |
| `ShareLink.astro` | `font-mono` on the leading prompt | Styles the terminal-like sharing prompt. |
| `GithubItem.astro` | `font-mono` | Styles highlighted release or PR version text. |
| `markdown.css` | `var(--font-condensed)` | Uses Roboto Condensed for compact Markdown directive link chips. |
| `markdown.css` | `var(--font-mono)` | Uses DM Mono for GitHub repo and npm package directive links. |
| `markdown.css` (`.prose em`) | `font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif` | Uses a local serif stack for emphasized prose text. |
| `[theme].css.ts` | Reads `fontData['--font-sans']` and emits `@font-face { font-family: 'Inter'; ... }` | Lets the Giscus iframe load the same self-hosted Inter file through the theme CSS endpoint. |
| `generator.ts` | Reads `fontData['--font-og-sans']`, resolves a WOFF file, and passes it to Satori as `name: 'Inter'` | Gives generated OG images a Satori-compatible Inter font without emitting `--font-og-sans` into page CSS. |

> [!warning]- Why `.prose em` hard-codes its font family
>
> The `.prose em` rule in `src/styles/markdown.css` is the only font configuration written directly as a `font-family` declaration. Its serif stack intentionally matches the [`font-serif`](https://github.com/tailwindlabs/tailwindcss/blob/v3/stubs/config.full.js#L312C15-L312C86) utility provided by the Wind3 preset.
>
> Normally, the rule could reuse that utility through [`@apply font-serif`](https://unocss.dev/transformers/directives). However, Astro development mode has an issue where styles generated by UnoCSS's Directives transformer may stop loading after client-side navigation when `@apply` or `--at-apply` is used. See [withastro/astro#16373](https://github.com/withastro/astro/issues/16373).
>
> To avoid relying on behavior that is not stable during development, this theme disables the Directives transformer. Because `font-serif` therefore cannot be applied reliably inside CSS files, the equivalent font stack is written directly in this rule.

## Historical Note

This font setup was introduced in a previous refactor [commit](https://github.com/lin-stephanie/astro-antfustyle-theme/pull/77/commits/a99c6346d0a61bacf1f2051e8056bc149e116a75).

Before that refactor, UnoCSS `presetWebFonts` fetched Inter, DM Mono, and Roboto Condensed from Google Fonts based on the `fonts` section in `unocss.config.ts`.

The current setup makes `astro.config.ts` the source of truth. Astro resolves the configured Fontsource and Google provider files, outputs page `@font-face` rules through the [`<Font />`](https://docs.astro.build/en/guides/fonts/#applying-custom-fonts) component, and exposes font metadata to Open Graph and Giscus helpers through `fontData`.

The font declarations not managed by Astro Fonts are limited to system-font stacks that do not require external font files. These include the hard-coded serif stack used by `.prose em` in `src/styles/markdown.css` and standalone assets outside the main site CSS pipeline, such as the RSS XSL stylesheet.
