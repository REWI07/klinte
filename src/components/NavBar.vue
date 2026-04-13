<script setup>
import { ref, computed } from 'vue'
import { useApp } from '../composables/useApp.js'
import { t, lang, setLang } from '../composables/useLanguage.js'
import { settings } from '../composables/useSettings.js'

const { currentPage, scrolled, navigate } = useApp()
const menuOpen = ref(false)

// Sayfalar hero olmadığında nav her zaman scrolled (koyu) görünmeli
const pagesWithHero = ['hem', 'meny']
const navScrolled = computed(() => scrolled.value || !pagesWithHero.includes(currentPage.value))

const links = [
  { key: 'nav_home',    page: 'hem' },
  { key: 'nav_menu',    page: 'meny' },
  { key: 'nav_bokabord',page: 'bokabord' },
  { key: 'nav_contact', page: 'kontakt' },
]

function goTo(page) {
  navigate(page)
  menuOpen.value = false
}
</script>

<template>
  <!-- Announcement bar -->
  <div class="announce-bar">
    <span>
      {{ lang === 'en' ? 'For online orders we recommend' : 'För online beställning föredrar vi' }}
      <a href="https://www.smakland.se" target="_blank" rel="noopener" class="announce-link">SMAKLAND</a>
    </span>
  </div>

  <nav :class="['nav', { scrolled: navScrolled }]">
    <a href="#" class="nav-logo" @click.prevent="goTo('hem')">
      <img src="/images/Klinte-logo.png" alt="Klinte Pizzeria" class="nav-logo-img">
      <span class="nav-logo-text">Klinte<em>Pizzeria</em></span>
    </a>

    <div class="nav-right">
      <ul class="nav-links">
        <li v-for="link in links" :key="link.page">
          <a
            href="#"
            :class="{ active: currentPage === link.page }"
            @click.prevent="goTo(link.page)"
          >
            {{ t(link.key) }}
          </a>
        </li>
      </ul>

      <div class="nav-lang">
        <button :class="{ active: lang === 'sv' }" @click="setLang('sv')">SV</button>
        <span class="nav-lang-sep"></span>
        <button :class="{ active: lang === 'en' }" @click="setLang('en')">EN</button>
      </div>

      <a href="https://order.smakland.se/klinte-pizzeria" target="_blank" rel="noopener" class="nav-order-btn">
        {{ lang === 'en' ? 'Order takeaway' : 'Beställ takeaway' }}
      </a>

      <a :href="settings.phone_main_tel" class="nav-phone">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        {{ settings.phone_main }}
      </a>

      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Meny">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile drawer -->
  <div :class="['mobile-drawer', { open: menuOpen }]">
    <a
      v-for="link in links"
      :key="link.page"
      href="#"
      @click.prevent="goTo(link.page)"
    >
      {{ t(link.key) }}
    </a>
    <a href="https://order.smakland.se/klinte-pizzeria" target="_blank" rel="noopener" class="mobile-order-btn">
      {{ lang === 'en' ? 'Order takeaway' : 'Beställ takeaway' }}
    </a>
    <div class="mobile-lang">
      <button :class="{ active: lang === 'sv' }" @click="setLang('sv')">Svenska</button>
      <button :class="{ active: lang === 'en' }" @click="setLang('en')">English</button>
    </div>
  </div>
</template>

<style scoped>
.nav-order-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: var(--green-dark);
  color: #fff;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  white-space: nowrap;
  transition: background 0.2s, opacity 0.2s;
}

.nav-order-btn:hover {
  background: var(--green);
}

@media (max-width: 900px) {
  .nav-order-btn { display: none; }
}

.announce-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--bar-h);
  z-index: 101;
  background: var(--bg-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.55);
}

.announce-link {
  color: var(--gold-light);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 2px;
  margin-left: 4px;
  transition: opacity 0.2s;
}

.announce-link:hover {
  opacity: 0.75;
}
</style>
