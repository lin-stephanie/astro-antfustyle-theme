/**
 * Controls the fading animation of an element,
 * showing or hiding it based on visibility.
 *
 * @param {string} elementId
 *  The ID of the element to control.
 * @param {boolean} visible
 *  Whether the element should be visible or hidden.
 * @param {string} hiddenClass
 *  The CSS class to add to the element when it should be hidden.
 */
export function toggleFadeEffect(
  elementId: string,
  visible: boolean,
  hiddenClass: string
) {
  const element = document.getElementById(elementId)
  if (!element) return

  if (visible) {
    // console.log('open', element)
    element.classList.remove(hiddenClass)
    if (!window.matchMedia('(prefers-reduced-motion)').matches) {
      element.classList.add('fade-in')
    }
  } else {
    // console.log('close', element)
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
