<script setup>
import { settings } from '../composables/useSettings.js'
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <span class="footer-brand">Klinte Pizzeria</span>
      <span class="footer-center">
        Designed by <a href="https://saryonstudio.se" target="_blank" rel="noopener">Saryon Studio</a>
      </span>
      <span class="footer-copy">© 2026 Klinte Pizzeria. Klintehamn, Gotland.</span>
      <div class="footer-right">
        <a :href="settings.facebook_url" target="_blank" rel="noopener" class="footer-social" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>
