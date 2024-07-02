import { defineCollection } from 'astro:content'
import { postSchema, projectsSchema } from './schema'

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema,
})

export const collections = { blog: blog, projects: projects }
