import { z } from 'astro:content'

/* Pages*/
export const pageSchema = z.object({
  title: z.string().describe('Set the title of the blog post'),
  description: z.string().default(''),
  bgType: z
    .enum(['plum', 'dot', 'rose', 'particle'])
    .describe(
      'Set the page background. If not defined or set to an empty string, no background is added to the page.'
    )
    .optional(),
  ogImage: z
    .string()
    .regex(/^\/og-images\//, "ogImage must start with '/og-images/'.")
    .optional(),
})

export type PageSchema = z.infer<typeof pageSchema>

/* Posts */
export const postSchema = z
  .object({
    title: z.string().max(60).describe('Set the title of the blog post'),
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

/* Projects */
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
