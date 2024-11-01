import { decode } from 'html-entities'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

import type { html } from 'satori-html'
import type { ProjectGroupsSchema } from '~/content/schema'
import type { NavBarLayout } from '~/types'

/**
 * Converts a given text into a URL-friendly slug.
 */
export function slug(text: string) {
  return text.toLowerCase().replace(/[\s\\/]+/g, '-')
}

/**
 * Extracts all icons from the project groups schema that start with the letter "i".
 */
export function extractIconsStartingWithI(data: ProjectGroupsSchema): string[] {
  const icons: string[] = []

  for (const key in data) {
    const projects = data[key]
    projects.forEach((project) => {
      if (project.icon && project.icon.startsWith('i')) {
        icons.push(project.icon)
      }
    })
  }

  return icons
}

/**
 * Constructs a URL by joining base URL with given path segments.
 * Multiple slashes are replaced with a single slash.
 */
export function getUrl(...paths: string[]): string {
  const baseUrl = import.meta.env.BASE_URL
  const fullPath = [baseUrl, ...paths].join('/').replace(/\/+/g, '/')

  return fullPath
}

/**
 * Ensures that a given pathname ends with a trailing slash.
 */
export function ensureTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : pathname + '/'
}

/**
 * Checks if a file exists in a specified directory.
 *
 * @param {string} path
 *  This path is relative to the current working directory.
 *  ('public/og-images' is equivalent to './public/og-images' and relative to the cwd)
 * @param {string} filename
 *  The name of the file to check for.
 */
export function checkFileExistsInDir(path: string, filename: string) {
  const fullPath = join(process.cwd(), path, filename)

  return existsSync(fullPath)
}

/**
 * Recursively unescapes HTML entities in a given virtual DOM node's children.
 *
 * {@link https://github.com/natemoo-re/satori-html/issues/20#issuecomment-1999332693 Fix accidental HTML entity escaping in 'satori-html' }
 */
export function unescapeHTML(node: ReturnType<typeof html>) {
  const children = node?.props?.children
  if (!children) {
    return
  } else if (Array.isArray(children)) {
    for (const n of children) {
      unescapeHTML(n)
    }
  } else if (typeof children === 'object') {
    unescapeHTML(children)
  } else if (typeof children === 'string') {
    node.props.children = decode(children)
  }
}

/**
 * Validates the navigation bar layout to ensure no duplicates between `left` and `right`.
 */
export function validateNavBarLayout(layout: NavBarLayout) {
  const leftSet = new Set(layout.left)
  const rightSet = new Set(layout.right)

  for (const item of leftSet) {
    if (rightSet.has(item)) {
      throw new Error(
        `Duplicate '${item}' found in both 'UI.navBarLayout.left' and 'UI.navBarLayout.right'.`
      )
    }
  }
}
