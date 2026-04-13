import { ref, provide, inject } from 'vue'

const APP_KEY = Symbol('app')

export function provideApp() {
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'hem'
  const currentPage = ref(path)
  const scrolled = ref(false)

  window.addEventListener('popstate', () => {
    const p = window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'hem'
    currentPage.value = p
  })

  function navigate(page) {
    if (page === currentPage.value) return
    currentPage.value = page
    const url = page === 'hem' ? '/' : '/' + page
    window.history.pushState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 40
  }, { passive: true })

  provide(APP_KEY, { currentPage, scrolled, navigate })
  return { currentPage, scrolled, navigate }
}

export function useApp() {
  return inject(APP_KEY)
}
