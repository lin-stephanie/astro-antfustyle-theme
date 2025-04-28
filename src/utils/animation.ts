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
    if (!window.matchMedia('(prefers-reduced-motion)').matches) {
      element.classList.add('fade-in')
    }
  } else {
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.classList.add(hiddenClass)
      return
    }
    element.classList.add('fade-out')
    element.addEventListener(
      'animationend',
      () => {
        element.classList.remove('fade-in', 'fade-out')
        element.classList.add(hiddenClass)
      },
      { once: true }
    )
  }
}
