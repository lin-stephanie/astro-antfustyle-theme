/**
 * Locks the scroll position of the document.
 */
export function lockScroll() {
  const bodyEl = document.body

  const scrollbarWidth = window.innerWidth - bodyEl.clientWidth
  const hasRose = document.getElementById('bg-rose')
  if (scrollbarWidth > 0 && !hasRose)
    bodyEl.style.paddingRight = `${scrollbarWidth}px`
  bodyEl.style.overflow = 'hidden'
}

/**
 * Unlocks the scroll position of the document.
 */
export function unlockScroll() {
  const bodyEl = document.body

  bodyEl.style.removeProperty('overflow')
  bodyEl.style.removeProperty('padding-right')
}

/**
 * Controls the fading animation of an element,
 * showing or hiding it based on visibility.
 */
export function toggleFadeEffect(
  elementId: string,
  visible: boolean,
  hiddenClass: string
) {
  const element = document.getElementById(elementId)
  if (!element) return

  if (visible) {
    element.classList.remove(hiddenClass)
    if (elementId === 'backdrop') lockScroll()
    if (window.matchMedia('(prefers-reduced-motion)').matches) return
    element.classList.add('fade-in')
  } else {
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.classList.add(hiddenClass)
      if (elementId === 'backdrop') unlockScroll()
      return
    }
    element.classList.add('fade-out')
    element.addEventListener(
      'animationend',
      () => {
        element.classList.remove('fade-in', 'fade-out')
        element.classList.add(hiddenClass)
        if (elementId === 'backdrop') unlockScroll()
      },
      { once: true }
    )
  }
}

/**
 * Resolves a browser URL with Astro's configured base path.
 *
 * base: "/base" + trailingSlash: "ignore" -> BASE_URL: "/base"
 * base: "/base/" + trailingSlash: "ignore" -> BASE_URL: "/base/"
 */
export function withClientBasePath(path: string): string {
  const resolvedPath = `/${import.meta.env.BASE_URL}/${path}`.replace(
    /\/+/,
    '/'
  )

  return new URL(resolvedPath, location.origin).href
}
