---
title: Path Aliases
description: FAQ explaining TypeScript/Vite path alias configuration and limitations.
tags: [configuration]
pubDate: 2024-10-05
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

Path alias configuration:

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

Aliases work in files processed by Vite and TypeScript under `src/`, but not in files like `plugins/remark-generate-og-image.ts` or `unocss.config.ts` unless you use [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths).

**Example:**

```typescript title='src/components/MyComponent.tsx'
import { formatDate } from '~/utils/helpers';

function MyComponent() {
  return <div>{formatDate(new Date())}</div>;
}

export default MyComponent;
```
