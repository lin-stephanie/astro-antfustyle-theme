---
title: Sync Updates
description: How to sync your project with the latest version of the Astro AntfuStyle Theme
pubDate: 2021-06-06
lastModDate: ''
toc: true
share: true
ogImage: true
---

Opening this post suggests that you may already be using the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) --- thank you for choosing it! 

This guide provides instructions on how to stay up-to-date with the latest theme versions and manage your project dependencies effectively. Let's dive into the steps!

## Updating to the Latest Theme Version

If you've made significant changes to your project, syncing may not be straightforward. 
You may consider checking the [theme's changelog](../../changelog/) and manually updating each file selectively (this is the only option if you're not using Git). Alternatively, for a more efficient approach, you can follow the steps below.

Before syncing, pay special attention  to directories or files you have customized or modified, such as: `src/content/`, `public/`, `src/config.ts`, `ec.config.mjs`, `src/pages/manifest.webmanifest.js`, and any new CSS files you've created for style modifications.

**Step 1: Add the Upstream Remote Repository**

Ensure your project has the original theme project as an upstream remote repository:

```bash
git remote add upstream https://github.com/lin-stephanie/astro-antfustyle-theme.git
```

Verify it with:

```bash
git remote -v
```

You should see output like this:

```
origin    https://github.com/your-username/your-repo-name.git (fetch)
origin    https://github.com/your-username/your-repo-name.git (push)
upstream  https://github.com/lin-stephanie/astro-antfustyle-theme (fetch)
upstream  https://github.com/lin-stephanie/astro-antfustyle-theme (push)
```

**Step 2: Fetch Updates from Upstream**

```bash
git fetch upstream
```

This will retrieve updates from the upstream repository without changing your local code.

**Step 3: Switch to a New Branch (Optional)**

To keep your main branch stable, consider creating a new branch before updating (If you're confident in your Git skills, you may skip this step):

```bash
git checkout -b update-theme
```

**Step 4: Merge Upstream Updates**

If you created your project by forking, you can typically merge directly (as the upstream project shares a common commit history with yours):

```bash
git merge upstream/main
```

If you started your project from a template and this is your first time syncing, you might encounter this error:

```bash
fatal: refusing to merge unrelated histories
```

This happens because the projects do not share a commit history. You need to include the `--allow-unrelated-histories` option in your merge command:

```bash
git merge upstream/main --allow-unrelated-histories
```

This is needed only once.

**Step 5: Resolve Merge Conflicts  (if Any)**

If conflicts arise during merging, resolve them manually. It's recommended to first learn about [resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts).

After resolving conflicts, thoroughly check that the project runs smoothly in your browser before proceeding to the next step.

**Step 6: Merge Updates to Main Branch (Optional)**

If you created a new branch in Step 3, merge updates back to your main branch:

```bash
git checkout main
git merge update-theme
```

**Step 7: Push Updates to the Remote Repository**

```bash
git push origin main
```

This pushes updates to your remote repository. Your project is now synced with the latest theme version. 🎉

In addition to syncing updates via Git, it's also recommended to use :link[actions-template-sync]{id=AndreasAugustin/actions-template-sync style=github}. This tool automates keeping your project up-to-date with the theme's latest version by sending pull requests when changes are available.

> [!warning]- Backup Before Syncing
>
> Ensure your local changes are committed, or merge on a new branch to avoid data loss.
>
> You can preview changes before merging:
>
> ```bash
>   git log HEAD..upstream/main
>   git diff HEAD..upstream/main
>   ```

## Updating Project Dependencies

To check and update project dependencies, `pnpm` commands can be used. If pnpm is the chosen package manager, the following steps can be followed:

```bash
# https://pnpm.io/cli/outdated
# Check for outdated dependencies
pnpm outdated

# https://pnpm.io/cli/update
# Update dependencies selectively to the latest stable versions
pnpm update -i -L
```

In most cases, patch updates do not significantly impact the project. Start by updating these dependencies and ensure the project functions correctly afterward.

Repeat the above commands to check for minor updates. Although minor updates usually do not disrupt the project, it is advisable to review the release notes for new features or changes.

Finally, if major updates are available, carefully review the release notes to avoid any breaking changes before proceeding with the update.

In addition to using `pnpm`, consider :link[Taze]{id=antfu-collective/taze style=github} (for monorepos) or :link[npm-check-updates]{id=raineorshine/npm-check-updates style=github}

## Wrapping Up

That's it! Keeping your project updated may seem like work initially, but it becomes easier over time. Plus, it's worth it to enjoy the new features and improvements with each update.

If you encounter any issues, find errors, or see opportunities for improvement as you explore the theme, feel free to join the [discussion](https://github.com/lin-stephanie/astro-antfustyle-theme/discussions), or submit an [issue](https://github.com/lin-stephanie/astro-antfustyle-theme/issues) or [pull request](https://github.com/lin-stephanie/astro-antfustyle-theme/pulls). Your feedback is highly appreciated! 

Happy coding, and may your projects continue to thrive! 🚀


