import { z } from 'astro:content'

/* Pages*/
export const pageSchema = z.object({
  title: z
    .string()
    .default('')
    .describe(
      'Sets the page title, formatted with `SITE.title` as `<pageTitle> - <siteTitle>` for metadata and automatic OG image generation. If undefined or empty, only `<siteTitle>` is displayed, and OG image generation is skipped.'
    ),
  subtitle: z
    .string()
    .default('')
    .describe(
      'Provides a page subtitle. If provided, it will be displayed below the title. If not needed, leave the field as an empty string or delete it.'
    ),
  description: z
    .string()
    .default('')
    .describe(
      'Provides a brief description, used in meta tags for SEO and sharing purposes. If not needed, leave the field as an empty string or delete it, and the `SITE.description` will be used directly.'
    ),
  bgType: z
    .union([z.literal(false), z.enum(['plum', 'dot', 'rose', 'particle'])])
    .default(false)
    .describe(
      'Specifies whether to apply a background on this page and select its type. If not needed, delete the field or set to `false`.'
    ),
  toc: z
    .boolean()
    .default(false)
    .describe(
      'Controls whether the table of contents (TOC) is generated for the page.'
    ),
  ogImage: z
    .union([z.string(), z.boolean()])
    .default(true)
    .describe(
      'Specifies the Open Graph (OG) image for social media sharing. To auto-generate OG image, delete the field or set to `true`. To disable it, set the field to `false`. To use a custom image, provide the full filename from `/public/og-images/`.'
    ),
})

export type PageSchema = z.infer<typeof pageSchema>

/* Posts */
export const postSchema = z.object({
  title: z
    .string()
    .max(60)
    .describe(
      "**Required**. Sets the post title, limited to **60 characters**. This follows Moz's recommendation, ensuring approximately 90% of titles display correctly in SERPs and preventing truncation on smaller screens or social platforms. [Learn more](https://moz.com/learn/seo/title-tag)."
    ),
  subtitle: z
    .string()
    .default('')
    .describe(
      'Provides a post subtitle. If provided, it will be displayed below the title. If not needed, leave the field as an empty string or delete it.'
    ),
  description: z
    .string()
    .default('')
    .describe(
      'Provides a brief description, used in meta tags for SEO and sharing purposes. If not needed, leave the field as an empty string or delete it, and the `SITE.description` will be used directly.'
    ),
  pubDate: z.coerce
    .date()
    .describe(
      '**Required**. Specifies the publication date. See supported formats [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples).'
    ),
  lastModDate: z
    .union([z.coerce.date(), z.literal('')])
    .optional()
    .describe(
      'Tracks the last modified date. If not needed, leave the field as an empty string or delete it.'
    ),
  minutesRead: z
    .number()
    .optional()
    .describe(
      'Provides an estimated reading time in minutes. To auto-generate, delete the field; to hide it on the page, enter 0'
    ),
  radio: z
    .boolean()
    .default(false)
    .describe(
      'Indicates if the post includes audio content or links to an external audio source. If `true`, an icon will be added to the post item in the list.'
    ),
  video: z
    .boolean()
    .default(false)
    .describe(
      'Indicates if the post includes video content or links to an external video source. If `true`, an icon will be added to the post item in the list.'
    ),
  platform: z
    .string()
    .default('')
    .describe(
      'Specifies the platform where the audio or video content is published. If provided, the platform name will be displayed. If not needed, leave the field as an empty string or delete it.'
    ),
  toc: z
    .boolean()
    .default(true)
    .describe(
      'Controls whether the table of contents (TOC) is generated for the post.'
    ),
  share: z
    .boolean()
    .default(true)
    .describe(
      'Controls whether social sharing options are available for the post.'
    ),
  ogImage: z
    .union([z.string(), z.boolean()])
    .default(true)
    .describe(
      'Specifies the Open Graph (OG) image for social media sharing. To auto-generate OG image, delete the field or set to `true`. To disable it, set the field to `false`. To use a custom image, provide the full filename from `/public/og-images/`.'
    ),
  redirect: z
    .string()
    .url('Invalid url.')
    .optional()
    .describe('Defines a URL to redirect the post.'),
  draft: z
    .boolean()
    .default(false)
    .describe(
      'Marks the post as a draft. If `true`, it is only visible in development and excluded from production builds.'
    ),
})

export type PostSchema = z.infer<typeof postSchema>

/* Projects */
const projectSchema = z.object({
  name: z
    .string()
    .describe('**Required**. Name of the project to be displayed.'),
  link: z
    .string()
    .url('Invalid url.')
    .describe('**Required**. URL linking to the project page or repository.'),
  desc: z
    .string()
    .describe('**Required**. A brief description summarizing the project.'),
  icon: z
    .string()
    .regex(
      /^i-[\w-]+(:[\w-]+)?$/,
      'Icon must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>` as per [UnoCSS](https://unocss.dev/presets/icons) specs.'
    )
    .describe(
      '**Required**. Icon representing the project. It must be in the format `i-<collection>-<icon>` or `i-<collection>:<icon>` as per [UnoCSS](https://unocss.dev/presets/icons) specs. [Check all available icons here](https://icones.js.org/).'
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
  title: z.string().describe('**Required**. Sets the stream title.'),
  pubDate: z.coerce
    .date()
    .describe(
      '**Required**. Specifies the publication date. See supported formats [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#examples).'
    ),
  link: z
    .string()
    .url('Invalid url.')
    .describe('**Required**. Specifies the URL link to the stream.'),
  radio: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the stream is a radio broadcast. If `true`, an icon will be added to the stream item in the list.'
    ),
  video: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the stream is a video broadcast. If `true`, an icon will be added to the stream item in the list.'
    ),
  platform: z
    .string()
    .default('')
    .describe('Specifies the platform where the stream is published.'),
})

const streamGroupsSchema = z.array(streamSchema)

export const streamsSchema = z.object({
  streams: streamGroupsSchema,
})

export type StreamGroupsSchema = z.infer<typeof streamGroupsSchema>
export type StreamsSchema = z.infer<typeof streamsSchema>
