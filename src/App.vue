<script setup>
import { computed, onMounted, ref } from 'vue'
import { provideApp } from './composables/useApp.js'
import { loadContent } from './composables/useLanguage.js'
import { loadSettings } from './composables/useSettings.js'
import NavBar from './components/NavBar.vue'
import HemPage from './pages/HemPage.vue'
import MenyPage from './pages/MenyPage.vue'
import BokaBordPage from './pages/BokaBordPage.vue'
import KontaktPage from './pages/KontaktPage.vue'

const { currentPage } = provideApp()
const dataReady = ref(false)

onMounted(async () => {
  await Promise.all([
    loadContent(),
    loadSettings(),
  ])
  dataReady.value = true
})

const pages = {
  hem:      HemPage,
  meny:     MenyPage,
  bokabord: BokaBordPage,
  kontakt:  KontaktPage,
}

const currentComponent = computed(() => pages[currentPage.value] || HemPage)
</script>

<template>
  <div>
    <template v-if="dataReady">
      <NavBar />
      <component :is="currentComponent" :key="currentPage" />
    </template>
    <div v-else style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);">
      <div style="text-align:center;">
        <p class="loading-brand">Klinte Pizzeria</p>
        <p style="color:var(--text-dim);font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-top:8px;">Laddar...</p>
      </div>
    </div>
  </div>
</template>

<style>
.loading-brand {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
  color: var(--green);
}
</style>
