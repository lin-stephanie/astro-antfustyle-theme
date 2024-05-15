import { z } from 'astro:content'

export const postsSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    redirect: z.string().optional(),
    video: z.boolean().optional(),
    radio: z.boolean().optional(),
    date: z.coerce.date(),
    duration: z.string().optional(),
    platform: z.string().optional(),
    draft: z.boolean().optional(),
  })
  .strict()

export type PostFrontmatter = z.infer<typeof postsSchema>
