---
title: Markdown/MDX Extended Features
description: The special syntax available in Astro AntfuStyle Theme to extend Markdown/MDX features
pubDate: 2023-10-01
lastModDate: ''
toc: true
share: true
ogImage: true
---

This post introduces some handy tricks for using special syntax in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) to enhance your Markdown/Mdx content. These shortcuts let the theme’s built-in integrations or plugins handle the heavy lifting, automatically converting everything into HTML --- no need to write complex code yourself! 🎨

## Callouts (Alerts / Admonitions)

Supported by :link[rehype-callouts]{id=lin-stephanie/rehype-callouts}, you can modify [the plugin's configuration](https://github.com/lin-stephanie/rehype-callouts?tab=readme-ov-file#options-useroptions) in `plugins/index.ts`. 

If you change the `theme` configuration (default: `theme: 'vitepress'`), you will also need to update the imported CSS file in `src/styles/markdown.css` (`@import 'rehype-callouts/theme/yourconfig'`).

```md wrap

<!-- Callout type names are case-insensitive: 'Note', 'NOTE', and 'note' are equivalent. -->

<!-- With 'vitepress' theme, you can use the following callout types: -->

> [!note]
> This is the content!

> [!TIP] You can customize the title！ 
> This is the content!

> [!Important] This is a _non-collapsible_ callout
> This is the content!

> [!Warning]- This is a ==collapsible== and **nested** callout
>
> This is the content!
> 
> > [!caution]
> > 
> > This is the content!
```

> [!note]
> This is the content!

> [!TIP] You can customize the title！
> This is the content!

> [!Important] This is a _non-collapsible_ callout
> This is the content!

> [!Warning]- This is a ==collapsible== and **nested** callout
>
> This is the content!
>
> > [!caution]
> > This is a non-existent callout type!

## Fully-featured Code Blocks

Supported by :link[astro-expressive-code]{link=https://github.com/expressive-code/expressive-code/tree/main/packages/astro-expressive-code imageUrl='https://avatars.githubusercontent.com/u/124694388?s=48&v=4'} with :link[plugin-collapsible-sections]{id=@expressive-code/plugin-collapsible-sections} and :link[plugin-line-numbers]{id=@expressive-code/plugin-line-numbers} plugins to add styling and extra functionality for code blocks. 

To customize code block themes or functionality, modify the `ec.config.mjs` file at the project root after reviewing the [Expressive Code documentation](https://expressive-code.com/reference/configuration/), such as [change themes](https://expressive-code.com/guides/themes/#using-bundled-themes), [enable word wrap](https://expressive-code.com/key-features/word-wrap/#wrap), or [toggle line numbers](https://expressive-code.com/plugins/line-numbers/#showlinenumbers).



## Image Caption & Link 

Build on :link[remark-directive]{id=remark/remark-directive} with a custom `remark-image-container` plugin (located in `plugins/remark-image-container.ts`) to quickly add image captions and links.

### `:::image-figure`


### `:::image-a`


### Mix `:::image-a` & `:::image-figure`



### `:::image-*`

When inserting images using the `!()[]` syntax in Markdown/MDX, if you want to modify the attributes of the generated `img` element (such as adjusting the display size of a particular image), you can use the syntax provided by :link[remark-imgattr]{id=OliverSpeir/remark-imgattr} as follows:



**Note**: To modify styles, you need to write directly in the `style` attribute or use a `class`. UnoCSS utility classes will not work.




==（黑白切换直接用网站黑白截图后使用）==

==（调整图片大小）==

如果你在编写 post 时，不想要缩放某个单独的图片时你可以：


```md
// markdowm 中可以借助 remark-imgattr 插件实现

![](../../assets/why-reproductions-are-required/issue-close-without-repro-light.png)(class:img-light no-zoom)
```




## Video Embedding（`::video`）

Similarly, this theme includes predefined directives through a custom `remark-image-container` plugin (located in `plugins/remark-image-container.ts`), enabling quick implementation of features like video embedding, styled GitHub links, badge-like markers and details dropdown as described below.





## Styled GitHub Link（`:link`）






## Badge-Like Markers（`:badge`）




## Details Dropdown



## Wrapping Up

With the features above, the theme streamlines your Markdown/MDX content creation without requiring you to dive into complex HTML or CSS. Just focus on your ideas and let the theme handle the rest!

If you're feeling adventurous, consider defining your own custom "directive syntax sugar" to tailor the experience even further! Contributions are always welcome --- feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme) or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls).

Thanks for checking out the theme. Have fun and enjoy creating! ✨
