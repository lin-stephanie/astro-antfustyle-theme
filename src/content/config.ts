import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import { feedLoader } from '@ascorbic/feed-loader'
import { githubReleasesLoader } from 'astro-loader-github-releases'
import { githubPrsLoader } from 'astro-loader-github-prs'
import { blueskyPostsLoader } from 'astro-loader-bluesky-posts'

import { pageSchema, postSchema, projectsSchema, streamsSchema } from './schema'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema,
})

const changelog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const streams = defineCollection({
  type: 'data',
  schema: streamsSchema,
})

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})

const releases = defineCollection({
  loader: githubReleasesLoader({
    mode: 'repoList',
    repos: [
      'withastro/astro',
      'withastro/starlight',
      'lin-stephanie/astro-loaders',
      'lin-stephanie/astro-antfustyle-theme',
    ],
    monthsBack: 3,
    entryReturnType: 'byRelease',
    clearStore: true,
  }),
})

const prs = defineCollection({
  loader: githubPrsLoader({
    search:
      'repo:withastro/astro repo:withastro/starlight repo:lin-stephanie/astro-antfustyle-theme',
    monthsBack: 2,
    clearStore: true,
  }),
})

const highlights = defineCollection({
  loader: blueskyPostsLoader({
    uris: [
      'at://astro.build/app.bsky.feed.post/3lifesehhok27',
      'at://sarah11918.rainsberger.ca/app.bsky.feed.post/3lh3aonbqes2y',
      'at://astro.build/app.bsky.feed.post/3lfwu3pka2c2j',
      'at://astro.build/app.bsky.feed.post/3lfsayyhu4c2j',
      'at://astro.build/app.bsky.feed.post/3lf3iyptedc2e',
      'at://astro.build/app.bsky.feed.post/3lcv2yftszs2z',
      'at://astro.build/app.bsky.feed.post/3lcl5ndm52c2s',
      'at://astro.build/app.bsky.feed.post/3lcdimk36e226',
      'at://astro.build/app.bsky.feed.post/3lbkb6hizhk2f',
      'at://jay.bsky.team/app.bsky.feed.post/3lbd2eaura22r',
      'at://jay.bsky.team/app.bsky.feed.post/3lbayyemhzs2v',
      'at://bsky.app/app.bsky.feed.post/3larljiyi7s2v',
    ],
    newlineHandling: 'paragraph',
    fetchThread: true,
    threadDepth: 4,
    fetchOnlyAuthorReplies: true,
  }),
})

export const collections = {
  pages,
  blog,
  projects,
  changelog,
  streams,
  feeds,
  releases,
  prs,
  highlights,
}
