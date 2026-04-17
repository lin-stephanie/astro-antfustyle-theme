---
title: Clear Astro Cache
description: Troubleshooting note for stale dev behavior after updating plugins or content schemas.
tags: [troubleshooting]
pubDate: 2026-04-17
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

If you update `plugins/index.ts` or `src/content/schema.ts`, but `pnpm dev` does not reflect the changes, try deleting these cache directories first:

- `.astro/`
- `node_modules/.astro/`

Then run `pnpm dev` again.

This usually helps when Astro keeps stale transformed content, schema metadata, or plugin processing artifacts during local development.
