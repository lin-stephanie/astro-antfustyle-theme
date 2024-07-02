import { z } from 'astro:content'

/* posts */
export const postSchema = z
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
    share: z.boolean().optional().default(true),
    toc: z.boolean().optional().default(true),
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>

/* projects */
const projectSchema = z.object({
  name: z.string(),
  link: z.string().url({ message: 'Invalid url.' }),
  desc: z.string(),
  icon: z.string().regex(/^i-[\w-]+(:[\w-]+)?$/, {
    message:
      "Icon must be in the format 'i-<collection>-<icon>' or 'i-<collection>:<icon>' as per Unocss specifications.",
  }),
})

const groupSchema = z.record(z.array(projectSchema))

export const projectsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  projects: groupSchema,
  toc: z.boolean().optional().default(true),
})

export type ProjectSchema = z.infer<typeof projectSchema>
export type GrouptSchema = z.infer<typeof groupSchema>
export type ProjectsSchema = z.infer<typeof projectsSchema>
