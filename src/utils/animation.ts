/**
 * Dispatches a 'toggle-backdrop' custom event to toggle backdrop visibility.
 */
export function dispatchToggleBackdrop(visible: boolean) {
  document.dispatchEvent(
    new CustomEvent('toggle-backdrop', {
      detail: { visible },
    })
  )
}

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
    element.classList.add('fade-in')
  } else {
    // console.log('close', element)
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
