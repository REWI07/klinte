<script setup>
import { computed } from 'vue'
import { useApp } from '../composables/useApp.js'
import { useReveal } from '../composables/useReveal.js'
import { ref } from 'vue'
import { t, lang } from '../composables/useLanguage.js'
import { settings } from '../composables/useSettings.js'
import SiteFooter from '../components/SiteFooter.vue'

const { navigate } = useApp()
const pageRef = ref(null)
useReveal(pageRef)

const marqueeItems = computed(() =>
  lang.value === 'en'
    ? ['Handmade Pizza', 'Pasta', 'Grill & Kebab', 'Takeaway', 'À la Carte', 'Restaurant', 'Billiards & Darts', 'Bar',
       'Handmade Pizza', 'Pasta', 'Grill & Kebab', 'Takeaway', 'À la Carte', 'Restaurant', 'Billiards & Darts', 'Bar']
    : ['Handgjord pizza', 'Pasta', 'Grill & Kebab', 'Avhämtning', 'À la Carte', 'Restaurang', 'Biljard & Dart', 'Bar',
       'Handgjord pizza', 'Pasta', 'Grill & Kebab', 'Avhämtning', 'À la Carte', 'Restaurang', 'Biljard & Dart', 'Bar']
)
</script>

<template>
  <div ref="pageRef">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-media">
        <img src="/images/gun-batimi.webp" alt="Klinte Pizzeria">
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-inner">
        <p class="hero-label">{{ t('hero_eyebrow') }}</p>
        <h1>{{ t('hero_title') }}<br><i>Klinte Pizzeria</i></h1>
        <p class="hero-desc">{{ t('hero_subtitle') }}</p>
        <div class="hero-btns">
          <button class="btn btn-green" @click="navigate('meny')">{{ t('hero_btn_menu') }}</button>
          <button class="btn btn-ghost" @click="navigate('bokabord')">{{ t('hero_btn_book') }}</button>
        </div>
      </div>
      <div class="hero-scroll-hint">
        <span>{{ t('hero_scroll') }}</span>
        <div class="hero-scroll-line"></div>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="marquee-band">
      <div class="marquee-track">
        <span v-for="(item, i) in marqueeItems" :key="i" class="marquee-item">
          <span class="marquee-dot"></span>
          {{ item }}
        </span>
      </div>
    </div>

    <!-- ABOUT -->
    <section class="ed-section about-section">
      <div class="asym asym-sticky reveal">
        <div class="asym-img">
          <img src="/images/kontakt-hero.jpg" alt="Klinte Pizzeria interiör">
        </div>
        <div class="asym-body">
          <p class="ed-label">{{ t('about_label') }}</p>
          <h2 class="ed-heading" v-html="t('about_title')"></h2>
          <hr class="ed-hr">
          <p class="ed-text" style="margin-bottom:16px;">{{ t('about_text') }}</p>
          <p class="ed-text" style="margin-bottom:28px;">{{ t('about_text_2') }}</p>
          <button class="btn btn-ghost-dark" @click="navigate('meny')">{{ t('about_btn') }}</button>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <div class="services-row">
      <div class="svc-card svc-card-bg" style="--svc-bg: url('/images/pizza3.webp')">
        <div class="svc-card-overlay"></div>
        <div class="svc-card-content">
          <div class="svc-num">01</div>
          <h3 class="svc-title">{{ t('feat_pizza_title') }}</h3>
          <p class="svc-text">{{ t('feat_pizza_text') }}</p>
          <div class="svc-line"></div>
        </div>
      </div>
      <div class="svc-card svc-card-bg" style="--svc-bg: url('/images/kebab2.webp')">
        <div class="svc-card-overlay"></div>
        <div class="svc-card-content">
          <div class="svc-num">02</div>
          <h3 class="svc-title">{{ t('feat_grill_title') }}</h3>
          <p class="svc-text">{{ t('feat_grill_text') }}</p>
          <div class="svc-line"></div>
        </div>
      </div>
      <div class="svc-card svc-card-bg" style="--svc-bg: url('/images/bilardo.webp')">
        <div class="svc-card-overlay"></div>
        <div class="svc-card-content">
          <div class="svc-num">03</div>
          <h3 class="svc-title">{{ t('feat_bar_title') }}</h3>
          <p class="svc-text">{{ t('feat_bar_text') }}</p>
          <div class="svc-line"></div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <section class="ed-section" style="text-align:center;">
      <div>
        <p class="ed-label" style="justify-content:center;display:flex;">{{ t('cta_label') }}</p>
        <h2 class="ed-heading" style="max-width:700px;margin:0 auto 24px;" v-html="t('cta_title')"></h2>
        <p class="ed-text" style="max-width:480px;margin:0 auto 40px;text-align:center;">{{ t('cta_text') }}</p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-green" @click="navigate('bokabord')">{{ t('cta_btn') }}</button>
          <a :href="settings.phone_main_tel" class="btn btn-ghost-dark">{{ settings.phone_main }}</a>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>
