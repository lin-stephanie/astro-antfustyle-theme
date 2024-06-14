import { defineCollection } from 'astro:content'
import { postSchema, projectsSchema } from './schema'

const post = defineCollection({
  type: 'content',
  schema: postSchema,
})

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema,
})

export const collections = { blog: post, projects: projects }
