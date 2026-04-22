import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Returns a { el, isVisible } pair.
 * Bind `el` to a template ref; `isVisible` flips to true once the element
 * enters the viewport and stays true (stops observing afterwards).
 */
export function useFadeIn(threshold = 0.15) {
  const el = ref(null)
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    el,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold },
  )

  return { el, isVisible }
}
