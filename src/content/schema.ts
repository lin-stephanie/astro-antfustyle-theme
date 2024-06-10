import { z } from 'astro:content'

export const postsSchema = z
  .object({
    date: z.coerce.date(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    redirect: z.string().optional(),
    video: z.boolean().optional(),
    radio: z.boolean().optional(),
    duration: z.string().optional(),
    platform: z.string().optional(),
    draft: z.boolean().optional(),
  })
  .strict()

export type PostFrontmatter = z.infer<typeof postsSchema>
