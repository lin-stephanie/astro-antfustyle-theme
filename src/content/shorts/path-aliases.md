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

```ts title='tsconfig.json' {7-9}
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules", ".local"],
  "types": ["node"],
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

Aliases work in files processed by Astro, Vite, and TypeScript under the normal project pipeline. Config files (e.g., `vite.config.ts`, `unocss.config.ts` and `plugins.ts`) that run before Vite alias resolution may need relative imports instead.

Example:

```typescript title='src/components/MyComponent.tsx'
import { formatDate } from '~/utils/helpers';

function MyComponent() {
  return <div>{formatDate(new Date())}</div>;
}

export default MyComponent;
```
