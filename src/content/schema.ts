import { z } from 'astro:content'

/* posts */
export const postSchema = z
  .object({
    title: z.string(),
    subtitle: z.string().default(''),
    description: z.string().default(''),
    created: z.coerce.date(),
    lastModified: z.coerce.date().optional(),
    minutesRead: z.number().optional(),
    radio: z.boolean().default(false),
    video: z.boolean().default(false),
    platform: z.string().default(''),
    toc: z.boolean().default(true),
    share: z.boolean().default(true),
    ogImage: z
      .string()
      .regex(/^\/og-images\//, "ogImage must start with '/og-images/'.")
      .optional(),
    redirect: z.string().url('Invalid url.').optional(),
    draft: z.boolean().default(false),
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>

/* projects */
const projectSchema = z.object({
  name: z.string(),
  desc: z.string(),
  link: z.string().url('Invalid url.'),
  icon: z
    .string()
    .regex(
      /^i-[\w-]+(:[\w-]+)?$/,
      "Icon must be in the format 'i-<collection>-<icon>' or 'i-<collection>:<icon>' as per Unocss specifications."
    ),
})

const projectGroupsSchema = z.record(z.array(projectSchema))

export const projectsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  projects: projectGroupsSchema,
  toc: z.boolean().optional().default(true),
})

export type ProjectSchema = z.infer<typeof projectSchema>
export type ProjectGroupsSchema = z.infer<typeof projectGroupsSchema>
export type ProjectsSchema = z.infer<typeof projectsSchema>
