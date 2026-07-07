---
title: Revert from `pnpm` to `npm` or `yarn`
description: FAQ on switching your package manager from pnpm to npm or yarn.
tags: [prerequisites]
pubDate: 2024-10-05
lastModDate: ''
ogImage: false
toc: false
share: true
giscus: true
search: true
---

- Delete the `node_modules` directory, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` from the project root.
- Replace `pnpm` with `npm/yarn` in `package.json` (this step isn't needed for this project).
- Run `npm install` or `yarn install`.
