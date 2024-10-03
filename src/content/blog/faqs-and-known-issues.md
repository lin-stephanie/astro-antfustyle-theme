---
title: FAQs and Known Issues
description: FAQs and known issues in Astro AntfuStyle Theme
pubDate: 2021-10-01
lastModDate: ''
toc: true
share: true
ogImage: true
---

## FAQs

### Revert from `pnpm` to `npm` or `yarn`

- 删除项目根目录下的整个 `node_modules` 目录（如果有的话）
- 删除项目根目录下的 `pnpm_lock.yaml` 
- Replace all `pnpm` calls to `npm/yarn` in `package.json`（该项目不需要处理这一步）
- Now you can run `npm install` or `yarn install`

### 关于 Lighthouse 得分

以使用 `'plum'` 背景下的 `/projects` 页面为例，在构建输出的预览中按照默认参数测试，得到如下 Lighthouse 报告：

（截图）

其中，无障碍评分未能满分的原因是 "Background and foreground colors do not have a sufficient contrast ratio"，这是受到主题风格的影响，文本颜色和背景色的对比度未达到无障碍的标准，如果你不在意这个小瑕疵的话，该主题对于 Lighthouse 测试是近乎完美的。后续会考虑针对这个问题出一个高对比度的版本。

另外，你也可以查看主题 Live Demo 在 PageSpeed Insights 上的性能情况。

==（补充链接）== https://pagespeed.web.dev/

### 关于路径别名

该项目路径别名配置如下：

```ts title='tsconfig.json' {6}
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}

```

**路径别名的可用范围**：在被 Vite 和 TypeScript 处理的文件中有效，位于 `src` 目录下的文件，包括 `.md`、`.mdx`、 `.ts`、`.tsx`、`.js`、`.jsx`、`.astro` 等。

**路径别名不可用的情况**：位于项目根目录或 `src` 目录之外、直接由 Node.js 执行的文件（如 `plugins/remark-generate-og-image.ts`、`unocss.config.ts`），默认情况下不支持路径别名，因为 Node.js 不认识 Vite 和 TypeScript 的路径映射配置，需要改为使用相对于当前文件的相对路径来导入模块，或者使用工具如 [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)。

**使用路径别名的简单示例**

:::details
::summary[在组件中导入工具函数]


```typescript title='src/components/MyComponent.tsx'
// 假设有一个组件位于 `src/components/MyComponent.tsx`，需要导入位于 `src/utils/helpers.ts` 的工具函数

import { formatDate } from '~/utils/helpers';

function MyComponent() {
  const date = new Date();
  const formattedDate = formatDate(date);

  return <div>{formattedDate}</div>;
}

export default MyComponent;
```

:::

###  RSS 的可订阅范围

目前主题对于 RSS 的配置（见 `src/pages/rss.xml.js`）只支持访问者订阅 `src/content/blog/` 下的 posts。

如果你想要进一步自定义配置网站哪些内容可以被访问者订阅，请参考主题集成的 [@astrojs/rss](https://www.npmjs.com/package/@astrojs/rss) 文档和 [Astro 官方教程](https://docs.astro.build/en/guides/rss/)。

如果官方集成不能满足你的需求，你也可以考虑改用 [jpmonette/feed](https://github.com/jpmonette/feed)。另外，你还以参阅社区提供的 [RSS Recipes](https://docs.astro.build/en/community-resources/content/#rss)。

### 关于页面背景

除 `src/components/backgrounds/Rose.astro` 外，其他背景都是通过自定义元素实现，并在该元素卸载时停止动画，避免内存泄漏，所以性能上目前看应该是没有问题的，如果你发现有性能问题请随时打开 Issues 告诉我。

当前不支持对 `/blog/[slug]` 路径上的页面设置背景，如果你想，你可以对 `src/pages/blog/[slug].astro` 文件进行修改：

```astro title='src/pages/blog/[slug].astro' ins={11}
---
...
---

<BaseLayout
  title={frontmatter.title}
  description={frontmatter.description}
  ogImage={frontmatter.ogImage}
  {pubDate}
  {lastModDate}
  bgType='plum'  // 'dot', 'rose', 'particle'  
>
  ...
</BaseLayout>
```


### 配置 Post 中显示的日期格式

Post 中日期默认以 `MMM D, YYYY` 格式显示（由 `src/utills/index.ts` 中 `formatDate` 方法处理），你可以根据 day.js 库支持的 [List of all available formats](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 来调整你想要的显示日期格式。

### Language-specific Build

目前主题还未实现构建时自动进行语言本地化处理（马上将支持常见的语言版本），如果你现在需要将网站进行本地化，你可以先手动修改来实现（这是很容易的）。

### 关于搜索功能

主题使用 :link[Pagefind]{id=CloudCannon/pagefind} 支持该功能，默认搜索结果仅包含博客 post，如果你想要了解如何配置网站内容可以被包括在检索访问内，请查阅 [Configuring what content is indexed](https://pagefind.app/docs/indexing/) ，你可以通过在编辑器中执行 `data-pagefind-` 搜索，来查看当前主题配置情况。

另外，Pagefind 仅在站点构建完成后工作，你需要调用 `pnpm build && pnpm preview` 在 Astro 构建站点后测试该功能的效果。

### 关于图片放大

主题使用 :link[medium-zoom]{id=francoischalifour/medium-zoom} 支持该功能，默认对符合 `.prose img:not(.no-zoom):not(a img)` CSS 选择器的`img` 元素实现缩放。

如果你在编写 post 时，不想要缩放某个单独的图片时，你可以通过向 img 元素添加 `no-zoom` 类。

如果你想要配置该功能可以在 `src/layouts/BaseLayout.astro` 中进行。


## Known Issues

以下是主题开发过程中发现的一些没有办法做到位的问题，如果你能够解决它，欢迎随时提 PR，十分感谢！

- 在 MDX 中编写组件传参没有提示和错误警告。
- 在 MDX 中编写指令语法会报错 "Could not parse expression with acorn ([MDX micromark-extension-mdx-expression:acorn](https://github.com/micromark/micromark-extension-mdx-expression/tree/main/packages/micromark-extension-mdx-expression#could-not-parse-expression-with-acorn))"，这是因为 remark-directive 本身是用于扩展 Markdown 语法的插件，而 Astro 本身支持 MDX 同样被 remark 插件处理，而 remark-directive 支持的 `{ }` 语法好像和 MDX 本身插入表达式的语法冲突。
- 即使你未配置 `bgType` 为 `'dot'` 或 `'particle'`，也会在 Astro 构建时被打包输出对应组件的 JS 代码以及 p5.js 代码，不过如果页面并未使用，则不会被浏览器加载，所以通常来说不影响。（尝试修改为直接从 CDN 获取 p5.js 的外部脚本而不直接作为模块导入，但会导致背景代码在生产环境下总是报错："p5 is not defined"）。
- 自动生成的 OG Images 目前不支持渲染 Emoji，另外有观察到标题文本可能会溢出生成的图片边界导致不可见的情况（即使生成 OG Images 的模版中已经设置了内外边距）。

