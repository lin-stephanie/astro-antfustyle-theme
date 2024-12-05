import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { feedLoader } from '@ascorbic/feed-loader'
import { githubReleasesLoader } from 'astro-loader-github-releases'
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
    loadMode: 'repoList',
    modeConfig: {
      repos: [
        'withastro/astro',
        'withastro/starlight',
        'delucis/astro-embed',
        'ascorbic/astro-loaders',
        'lin-stephanie/astro-loaders',
        'lin-stephanie/astro-antfustyle-theme',
      ],
      monthsBack: 3,
      entryReturnType: 'byRelease',
    },
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
}
