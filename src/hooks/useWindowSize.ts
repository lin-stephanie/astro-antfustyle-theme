export interface UseWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number

  // /**
  //  * Listen to window `orientationchange` event.
  //  *
  //  * @default true
  //  */
  // listenOrientation?: boolean

  /**
   * Whether the scrollbar should be included in the width and height.
   *
   * @default true
   */
  includeScrollbar?: boolean
}

/**
 * Reactive window size.
 *
 * @param options
 *
 * @see Referenced from https://github.com/vueuse/vueuse/blob/main/packages/core/useWindowSize/index.ts
 */
export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    // listenOrientation = true,
    includeScrollbar = true,
  } = options

  let width = initialWidth
  let height = initialHeight

  const update = () => {
    if (includeScrollbar) {
      width = window.innerWidth
      height = window.innerHeight
    } else {
      width = window.document.documentElement.clientWidth
      height = window.document.documentElement.clientHeight
    }
  }

  update()

  window.addEventListener('resize', update, { passive: true })

  // if (listenOrientation) {
  //   const matches = useMediaQuery('(orientation: portrait)')
  //   watch(matches, () => update())
  // }

  const cleanup = () => {
    window.removeEventListener('resize', update)
  }

  return { width, height, cleanup }
}

// export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>
