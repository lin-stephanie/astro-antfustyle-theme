import { z } from 'astro:content'

/* posts */
export const postSchema = z
  .object({
    date: z.coerce.date(),
    title: z.string(),
    subtitle: z.string().default(''),
    description: z.string().default(''),
    redirect: z.string().url('Invalid url.').optional(),
    video: z.boolean().default(false),
    radio: z.boolean().default(false),
    platform: z.string().default(''),
    duration: z.string().default(''),
    draft: z.boolean().default(false),
    share: z.boolean().default(true),
    toc: z.boolean().default(true),
    ogImage: z
      .string()
      .regex(/^\/og-images\//, "ogImage must start with '/og-images/'.")
      .optional(),
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>

/* projects */
const projectSchema = z.object({
  name: z.string(),
  link: z.string().url({ message: 'Invalid url.' }),
  desc: z.string(),
  icon: z
    .string()
    .regex(
      /^i-[\w-]+(:[\w-]+)?$/,
      "Icon must be in the format 'i-<collection>-<icon>' or 'i-<collection>:<icon>' as per Unocss specifications."
    ),
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
