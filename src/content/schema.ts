import { z } from 'astro:content'

/* Pages*/
export const pageSchema = z.object({
  title: z
    .string()
    .describe(
      'Set the page title to format with `SITE.title` as `<pageTitle> - <siteTitle>` for title, meta tags, and for automatically generating OG images. If set to an empty string, displays only `<siteTitle>`.'
    ),
  description: z
    .string()
    .optional()
    .describe(
      'Set the page description for meta tags. If not defined or set to an empty string, the `SITE.description` will be used directly.'
    ),
  subtitle: z
    .string()
    .optional()
    .describe(
      'Set the subtitle to display below the title if additional explanations are needed.'
    ),
  bgType: z
    .enum(['plum', 'dot', 'rose', 'particle'])
    .optional()
    .describe(
      'Set the page background. If not defined or set to an empty string, no background is added to the page.'
    ),
  ogImage: z
    .string()
    .regex(/^\/og-images\//, "ogImage must start with '/og-images/'.")
    .optional(),
  toc: z.boolean().default(false),
})

export type PageSchema = z.infer<typeof pageSchema>

/* Posts */
export const postSchema = z
  .object({
    title: z.string().max(60).describe('Set the title of the blog post'),
    subtitle: z.string().default(''),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    lastModDate: z.union([z.coerce.date(), z.literal('')]).optional(),
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
  projects: projectGroupsSchema,
})

export type ProjectSchema = z.infer<typeof projectSchema>
export type ProjectGroupsSchema = z.infer<typeof projectGroupsSchema>
export type ProjectsSchema = z.infer<typeof projectsSchema>

/* Stremas */
const streamSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  link: z.string().url('Invalid url.'),
  radio: z.boolean().default(false),
  video: z.boolean().default(false),
  platform: z.string().default(''),
})

const streamGroupsSchema = z.array(streamSchema)

export const streamsSchema = z.object({
  streams: streamGroupsSchema,
})

export type StreamGroupsSchema = z.infer<typeof streamGroupsSchema>
export type StreamsSchema = z.infer<typeof streamsSchema>
