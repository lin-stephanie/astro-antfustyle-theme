---
title: Image Examples
duration: 3min
date: 2024-07-29
toc: false
share: true
---

## Markdown Image Syntax

<!-- The <img> tag is not supported for local images, and the <Image /> component is unavailable in .md files. -->
<!-- <figure>
  <img src="../../assets/mental-health-oss/oss-mental-iron-triangle.svg" />
  <figcaption text-center>The Iron Triangle of Velocity-Scope-Quality</figcaption>
</figure> -->

<!-- Local image stored in src/assets/ -->
<!-- Use a relative file path or import alias -->

![Velocity-Scope-Quality](../../assets/mental-health-oss/oss-mental-iron-triangle.svg)

<!-- Image stored in public/images/ -->
<!-- Use the file path relative to public/ -->

![Astro](/og-images/fallback.jpg)(class:no-zoom)

<!-- Remote image on another server -->
<!-- Use the full URL of the image -->
<!-- Remote images and images stored in the public/ folder are not optimized. -->

![lamps-light-lampshade-screen](https://images.pexels.com/photos/27255539/pexels-photo-27255539/free-photo-of-woman-in-white-dress-crouching-in-flowers.jpeg)(style:width:60%)

## `image-figure` Directive

:::image-figure[The Iron Triangle of Velocity-Scope-Quality]{style="text-align:center"}
![Velocity-Scope-Quality](../../assets/mental-health-oss/oss-mental-iron-triangle.svg)(width:500)
:::

:::image-figure[The Iron Triangle of Velocity-Scope-Quality]{style="text-align:center; color:pink"}
![Velocity-Scope-Quality](../../assets/mental-health-oss/oss-mental-iron-triangle.svg)
:::

:::image-figure[The Iron Triangle of Velocity-Scope-Quality]
![](../../assets/mental-health-oss/oss-mental-iron-triangle.svg)
:::

:::image-figure
![Velocity-Scope-Quality](../../assets/mental-health-oss/oss-mental-iron-triangle.svg)
:::

:::image-figure[We temporarily close this due to the lack of enough information. Please provide a minimal reproduction to reopen the issue. Thanks.]
![](../../assets/why-reproductions-are-required/issue-close-without-repro-light.png)(class:img-light no-zoom)

![](../../assets/why-reproductions-are-required/issue-close-without-repro-dark.png)(class:img-dark)
:::

<!-- No figcaption text found for image-figure directive -->
<!-- :::image-figure
![](../../assets/mental-health-oss/oss-mental-iron-triangle.svg)
::: -->

## `image-a` Directive

:::image-a{href="https://docs.astro.build/en/guides/images/#images-in-markdown-files"}
![Velocity-Scope-Quality](../../assets/why-not-prettier/prettier-print-width.png)
:::

:::image-a{href="https://docs.astro.build/en/guides/images/#images-in-markdown-files" style="display:block" .custom-class}
![Velocity-Scope-Quality](../../assets/why-not-prettier/prettier-print-width.png)(style: margin-bottom: -1rem; transform:scaleX(1.1) scaleY(1.1);, loading: eager)
:::

## Mix `image-a` & `image-figure` Directive

::::image-figure[The Iron Triangle of Velocity-Scope-Quality]{style="text-align:center"}
:::image-a{href="https://docs.astro.build/en/guides/images/#images-in-markdown-files" style="display:block" .custom-class}
![Velocity-Scope-Quality](../../assets/why-not-prettier/prettier-print-width.png)(style: margin-bottom: -1rem; transform:scaleX(1.1) scaleY(1.1);, loading: eager)
:::
::::

::::image-a{href="https://docs.astro.build/en/guides/images/#images-in-markdown-files" style="display:block" .custom-class}
:::image-figure[The Iron Triangle of Velocity-Scope-Quality]{style="text-align:center"}
![Velocity-Scope-Quality](../../assets/why-not-prettier/prettier-print-width.png)(style: margin-bottom: -1rem; transform:scaleX(1.1) scaleY(1.1);, loading: eager)
:::
::::

<!-- No external links provided. -->
<!-- :::image-a
![Velocity-Scope-Quality](../../assets/why-not-prettier/prettier-print-width.png)
::: -->

## Mix `image-*` Directive

:::image-div{style="border:1px solid #333"}
![](../../assets/why-reproductions-are-required/issue-close-without-repro-light.png)
:::

<!-- Can't handle the case where lable contains md syntax for now -->
