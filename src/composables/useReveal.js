import { onMounted, onUnmounted } from 'vue'

export function useReveal(containerRef) {
  let observer = null

  function init() {
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    const el = containerRef?.value || document
    const elements = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements.forEach(el => observer.observe(el))
  }

  onMounted(() => setTimeout(init, 80))
  onUnmounted(() => observer?.disconnect())
}
