---
title: Managing Image Assets
description: How to organize and use images in the Astro AntfuStyle Theme
pubDate: 2020-01-03
lastModDate: ''
toc: true
share: true
ogImage: true
---


This post provides a brief guide on how to organize and use images in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme).

## Supported Cases for Image Processing

Astro supports processing images during the build phase via the [Image Service API](https://docs.astro.build/en/reference/image-service-reference/) (:link{id=lovell/sharp style=github} is the [default service](https://docs.astro.build/en/guides/images/#default-image-service)), allowing actions like converting to webp, compressing, adding attributes, inferring dimensions to prevent CLS, lazy loading, and async decoding. However, this only applies in the following cases:

- [Images stored in `src/`](https://docs.astro.build/en/guides/images/#where-to-store-images) (Images in the `public/` folder won’t be processed)
- [Authorized remote images](https://docs.astro.build/en/guides/images/#authorizing-remote-images) (Note: external images referenced in Markdown using `![]()` will not be processed)

## Images in Markdown Files

It is recommended to store the local images used in the post under the `src/assets/` directory, and create a subdirectory based on the post’s filename (e.g., images for `src/content/blog/your-post-file-name.md` stored in `src/assets/your-post-file-name/`), which will allow them to be optimized during Astro’s build process and make it easier to organize and maintain (this strategy can also apply to other static resources).


```md title='src/content/blog/post-name.md' wrap
# Markdown Post

<!-- Local image stored in `src/assets/post-name/`, it wiil be processed and optimized by Astro, resulting in hashed filenames and output to the `_astro/` directory within `dist` -->

<!-- ✅ Use a relative file path -->
![Local image](../../assets/post-name/local-image.png)

<!-- ✅ Use import alias -->
![Local image](～/assets/post-name/local-image.png)

---

<!-- Image stored in `public/og-images/`, it wiil not be processed and optimized by Astro -->
<!-- ✅ Use the file path relative to public/ -->
![OG image](/public/og-images/og-image.png)

---

<!-- Remote image on another server, it wiil not be processed by Astro -->
<!-- ✅ Use the full URL of the image -->
![Remote image](https://example.com/images/remote-image.png)

---

<!-- ❌ Using <img> tag won't work -->
<img src="../../assets/post-name/local-image.png" alt="Local image" />

---

<!-- ❌ Using <Image /> component won't work -->
<Image src="../../assets/post-name/local-image.png" alt="Local image" />

```

> [!tip]- Adjusting Image Attributes in Markdown/MDX
>
> To modify attributes of an `img` element (like size) in Markdown/MDX, use the :link[remark-imgattr]{id=OliverSpeir/remark-imgattr style=github} syntax.
> 
> **Note**: Styles must be written directly in the `style` attribute or by applying a `class`. UnoCSS utility classes won't apply.


## Images in MDX Files

In addition to supporting the standard Markdown `![alt](src)` syntax as demonstrated above, you can also use Astro’s `<Image />` component and JSX `<img />` tags in your `.mdx` files by importing both the component and your image.

```mdx title='src/content/blog/post-name.mdx'
# MDX Post

---
title: My Page title
---

import { Image } from 'astro:assets';
import rocket from '../assets/rocket.png';

// Local image stored in the the same folder
![Houston in the wild](houston.png)

// Local image stored in src/assets/
<Image src={rocket} alt="A rocketship in space." />
<img src={rocket.src} alt="A rocketship in space." />
![A rocketship in space](../assets/rocket.png)

// Image stored in public/images/
<Image src="/images/stars.png" alt="A starry night sky." />
<img src="/images/stars.png" alt="A starry night sky." />
![A starry night sky.](/images/stars.png)

// Remote image on another server
<Image src="https://example.com/images/remote-image.png" />
<img src="https://example.com/images/remote-image.png" />
![Astro](https://example.com/images/remote-image.png)
```

## Image Compression

As mentioned, Astro can compress images from the `src/` folder. However, for images in blog posts, especially those in `public`, it’s recommended to manually compress them to avoid performance issues. Useful tools include [Tinify](https://tinify.com/web), [Squoosh](https://squoosh.app/), and [SVGO](https://svgo.dev/).

## Wrapping Up

I hope this post helps clarify image usage in Markdown/MDX within this theme. For anything not covered here, check out the [Astro Images Docs](https://docs.astro.build/en/guides/images/) . 📖
