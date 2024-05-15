/* import { z, defineCollection } from 'astro:content'

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.string(),
    lang: z.string(),
    date: z.date(),
  }),
})

export const collections = {
  posts: postsCollection,
} */

import { defineCollection } from 'astro:content'
import { postsSchema } from './schema'

const postsCollection = defineCollection({
  type: 'content',
  schema: postsSchema,
})

export const collections = { blog: postsCollection }
