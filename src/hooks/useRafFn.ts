export interface UseRafFnCallbackArguments {
  /**
   * Time elapsed between this and the last frame.
   */
  delta: number

  /**
   * Time elapsed since the creation of the web page.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
   */
  timestamp: DOMHighResTimeStamp
}

export interface UseRafFnOptions {
  /**
   * Start the requestAnimationFrame loop immediately on creation.
   *
   * @default true
   */
  immediate?: boolean
  /**
   * The maximum frame per second to execute the function.
   * Set to `undefined` to disable the limit.
   *
   * @default undefined
   */
  fpsLimit?: number
}

/**
 * Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
 *
 * @param fn
 * @param options
 *
 * @see Referenced from https://github.com/vueuse/vueuse/blob/main/packages/core/useRafFn/index.ts
 */
export function useRafFn(
  fn: (args: UseRafFnCallbackArguments) => void,
  options: UseRafFnOptions = {}
) {
  const { immediate = true, fpsLimit = undefined } = options
  const intervalLimit = fpsLimit ? 1000 / fpsLimit : null

  let isActive = false
  let previousFrameTimestamp = 0
  let rafId: null | number = null

  function loop(timestamp: DOMHighResTimeStamp) {
    console.log('loop')
    if (!isActive) return

    if (!previousFrameTimestamp) previousFrameTimestamp = timestamp

    const delta = timestamp - previousFrameTimestamp

    if (intervalLimit && delta < intervalLimit) {
      rafId = requestAnimationFrame(loop)
      return
    }

    previousFrameTimestamp = timestamp
    fn({ delta, timestamp })
    rafId = requestAnimationFrame(loop)
  }

  function resume() {
    if (!isActive) {
      isActive = true
      previousFrameTimestamp = 0
      rafId = requestAnimationFrame(loop)
      console.log('resume rafId', rafId)
    }
  }

  function pause() {
    console.log('pause')
    isActive = false
    if (rafId !== null) {
      console.log('pause rafId', rafId)
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  if (immediate) {
    resume()
  }

  return { pause, resume }
}
