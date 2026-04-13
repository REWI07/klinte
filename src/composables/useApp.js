import { ref, provide, inject, nextTick } from 'vue'

const APP_KEY = Symbol('app')

export function provideApp() {
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'hem'
  const currentPage = ref(path)
  const scrolled = ref(false)
  const veilState = ref('idle')

  window.addEventListener('popstate', () => {
    const p = window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'hem'
    currentPage.value = p
  })

  let navigating = false
  let idleTimer = null

  async function navigate(page) {
    if (page === currentPage.value) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (navigating) return
    navigating = true

    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }

    veilState.value = 'idle'
    await nextTick()

    veilState.value = 'entering'
    setTimeout(() => {
      currentPage.value = page
      const url = page === 'hem' ? '/' : '/' + page
      window.history.pushState({}, '', url)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      veilState.value = 'leaving'
      navigating = false
      idleTimer = setTimeout(() => {
        veilState.value = 'idle'
        idleTimer = null
      }, 1100)
    }, 1000)
  }

  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 40
  }, { passive: true })

  provide(APP_KEY, { currentPage, scrolled, veilState, navigate })
  return { currentPage, scrolled, veilState, navigate }
}

export function useApp() {
  return inject(APP_KEY)
}
