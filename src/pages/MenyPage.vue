<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import { avhamtning, alacarte } from '../data/menu.js'
import { lunchVecka } from '../data/lunch.js'
import { t, lang } from '../composables/useLanguage.js'
import SiteFooter from '../components/SiteFooter.vue'

const pageRef = ref(null)
useReveal(pageRef)

const activeTab = ref('avhamtning')

// Localise menu data based on active language
function localiseSection(section) {
  return {
    ...section,
    title: lang.value === 'en' ? (section.title_en || section.title) : section.title,
    note:  lang.value === 'en' ? (section.note_en  || section.note)  : section.note,
    items: section.items.map(item => ({
      ...item,
      name: lang.value === 'en' ? (item.name_en || item.name) : item.name,
      desc: lang.value === 'en' ? (item.desc_en !== undefined ? item.desc_en : item.desc) : item.desc,
    })),
  }
}

const avhamtningLocalized = computed(() => avhamtning.map(localiseSection))
const alacarteLocalized    = computed(() => alacarte.map(localiseSection))

// Avhämtning accordion — first section open by default
const openSections = ref(new Set())

function toggleSection(title) {
  const s = new Set(openSections.value)
  if (s.has(title)) {
    s.delete(title)
  } else {
    s.add(title)
  }
  openSections.value = s
}

// Tab switch — make new content visible immediately
watch(activeTab, () => {
  nextTick(() => {
    const els = pageRef.value?.querySelectorAll('.tab-content .reveal-once')
    els?.forEach(el => el.classList.add('visible'))
  })
})
</script>

<template>
  <div ref="pageRef">

    <!-- HERO -->
    <section class="meny-hero">
      <div class="meny-hero-media">
        <img src="/images/menyresim.webp" alt="Klinte Pizzeria Meny">
      </div>
      <div class="meny-hero-overlay"></div>
      <div class="meny-hero-content">
        <p class="meny-hero-label">Klinte Pizzeria</p>
        <h1 class="meny-hero-title">{{ lang === 'en' ? 'Our' : 'Vår' }} <i>{{ lang === 'en' ? 'Menu' : 'Meny' }}</i></h1>
      </div>
    </section>

    <!-- TABS -->
    <div class="meny-tabs">
      <div class="meny-tabs-inner">
        <button :class="{ active: activeTab === 'avhamtning' }" @click="activeTab = 'avhamtning'">
          {{ t('meny_tab_avhamtning') }}
        </button>
        <button :class="{ active: activeTab === 'alacarte' }" @click="activeTab = 'alacarte'">
          {{ t('meny_tab_alacarte') }}
        </button>
        <button :class="{ active: activeTab === 'lunch' }" @click="activeTab = 'lunch'">
          {{ lang === 'en' ? 'Weekly Lunch' : 'Veckans Lunch' }}
        </button>
      </div>
    </div>

    <!-- CONTENT -->
    <section class="ed-section" style="padding-top:clamp(40px,6vw,72px);">
      <div class="meny-wrapper">

        <div class="meny-note reveal">
          <template v-if="activeTab === 'avhamtning'">
            {{ t('meny_note_avhamtning') }}
          </template>
          <template v-else-if="activeTab === 'alacarte'">
            {{ t('meny_note_alacarte') }}
          </template>
          <template v-else>
            {{ lang === 'en'
              ? `Lunch buffet ${lunchVecka.pris_buffet} · Takeaway ${lunchVecka.pris_avhamtning} · ${lunchVecka.note}`
              : `Lunchbuffe ${lunchVecka.pris_buffet} · Avhämtning ${lunchVecka.pris_avhamtning} · ${lunchVecka.note}` }}
          </template>
        </div>

        <!-- Ornament top -->
        <div class="meny-ornament reveal">
          <span></span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L12 22M2 12L22 12"/></svg>
          <span></span>
        </div>

        <!-- ══════════ AVHÄMTNING — ACCORDION ══════════ -->
        <div v-if="activeTab === 'avhamtning'" class="tab-content meny-card">
          <div
            v-for="(section, si) in avhamtningLocalized"
            :key="section.title"
            class="acc-section"
          >
            <!-- Header — clickable -->
            <button
              class="acc-header"
              :class="{ open: openSections.has(avhamtning[si].title) }"
              @click="toggleSection(avhamtning[si].title)"
              :aria-expanded="openSections.has(avhamtning[si].title)"
            >
              <div class="acc-header-left">
                <span class="meny-section-num">{{ String(si + 1).padStart(2, '0') }}</span>
                <div>
                  <span class="meny-section-title">{{ section.title }}</span>
                  <span v-if="section.note" class="meny-section-sub">{{ section.note }}</span>
                </div>
              </div>
              <span class="acc-chevron">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </button>

            <!-- Items — accordion body -->
            <Transition name="acc">
              <div v-if="openSections.has(avhamtning[si].title)" class="acc-body">
                <div
                  v-for="item in section.items"
                  :key="item.num ?? item.name"
                  class="meny-item"
                >
                  <div class="meny-item-info">
                    <span class="meny-item-name">
                      <span v-if="item.num" class="meny-item-num">{{ item.num }}.</span>
                      {{ item.name }}
                    </span>
                    <span v-if="item.desc" class="meny-item-desc">{{ item.desc }}</span>
                  </div>
                  <span class="meny-item-dots"></span>
                  <span class="meny-item-price">{{ item.price }}</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- ══════════ À LA CARTE ══════════ -->
        <div v-else-if="activeTab === 'alacarte'" class="tab-content meny-card">
          <template v-for="(section, si) in alacarteLocalized" :key="section.title">
            <div class="meny-section">
              <div class="meny-section-header">
                <span class="meny-section-num">{{ String(si + 1).padStart(2, '0') }}</span>
                <div>
                  <h2 class="meny-section-title">{{ section.title }}</h2>
                  <p v-if="section.note" class="meny-section-sub">{{ section.note }}</p>
                </div>
              </div>
              <div
                v-for="item in section.items"
                :key="item.name"
                class="meny-item"
              >
                <div class="meny-item-info">
                  <span class="meny-item-name">{{ item.name }}</span>
                  <span v-if="item.desc" class="meny-item-desc">{{ item.desc }}</span>
                </div>
                <span class="meny-item-dots"></span>
                <span class="meny-item-price">{{ item.price }}</span>
              </div>
            </div>
            <div v-if="si < alacarteLocalized.length - 1" class="meny-divider"><span></span></div>
          </template>
        </div>

        <!-- ══════════ VECKANS LUNCH ══════════ -->
        <div v-if="activeTab === 'lunch'" class="tab-content meny-card lunch-card">
          <div class="lunch-header">
            <span class="lunch-week-label">{{ lang === 'en' ? 'Week' : 'Vecka' }}</span>
            <span class="lunch-week-num">{{ lunchVecka.vecka }}</span>
          </div>

          <div
            v-for="d in lunchVecka.days"
            :key="d.day"
            class="lunch-day"
          >
            <div class="lunch-day-name">{{ lang === 'en' ? d.day_en : d.day }}</div>
            <div class="lunch-day-dishes">
              <p v-for="(dish, i) in (lang === 'en' ? d.dishes_en : d.dishes)" :key="i">
                {{ dish }}
              </p>
            </div>
          </div>

          <div class="lunch-footer">
            <span>{{ lang === 'en' ? 'Soft drinks not included' : 'Läsk ingår ej' }}</span>
            <span class="lunch-welcome">{{ lang === 'en' ? 'Welcome!' : 'Välkomna!' }}</span>
          </div>
        </div>

        <!-- Ornament bottom -->
        <div class="meny-ornament reveal">
          <span></span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L12 22M2 12L22 12"/></svg>
          <span></span>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<style scoped>
/* ── Hero ── */
.meny-hero {
  position: relative;
  height: 50vh;
  min-height: 360px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.meny-hero-media {
  position: absolute;
  inset: 0;
}

.meny-hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  filter: brightness(0.45) saturate(0.85);
}

.meny-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(14,31,9,0.2) 0%, rgba(14,31,9,0.75) 80%, var(--bg) 100%);
}

.meny-hero-content {
  position: relative;
  z-index: 2;
  padding: 0 var(--pad) clamp(40px, 6vw, 80px);
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.meny-hero-label {
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold-light);
  margin-bottom: 16px;
  font-weight: 500;
}

.meny-hero-title {
  font-family: var(--font-serif);
  font-size: clamp(48px, 8vw, 88px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.meny-hero-title i {
  color: var(--gold-light);
  font-style: italic;
}

/* ── Tabs ── */
.meny-tabs {
  position: sticky;
  top: calc(80px + var(--bar-h));
  z-index: 50;
  background: rgba(248,247,244,0.97);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.meny-tabs-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--pad);
  display: flex;
}

.meny-tabs-inner button {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 18px 24px;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
}

.meny-tabs-inner button:hover { color: var(--text); }

.meny-tabs-inner button.active {
  color: var(--green);
  border-bottom-color: var(--green);
  font-weight: 500;
}

/* ── Wrapper ── */
.meny-wrapper {
  max-width: 820px;
  margin: 0 auto;
}

.meny-note {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  background: var(--green-muted);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 12px 16px;
  margin-bottom: 32px;
  line-height: 1.6;
  text-align: center;
}

/* ── Ornament ── */
.meny-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 0;
  color: var(--green-dim);
}

.meny-ornament span {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

/* ── Card wrapper ── */
.meny-card {
  border: 1px solid var(--border-strong);
  background: var(--bg-card);
  overflow: hidden;
}

/* ══════════════════════════════════
   ACCORDION — Avhämtning
══════════════════════════════════ */
.acc-section {
  border-bottom: 1px solid var(--border);
}

.acc-section:last-child {
  border-bottom: none;
}

.acc-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: clamp(18px, 3vw, 26px) clamp(24px, 4vw, 48px);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.25s;
}

.acc-header:hover {
  background: var(--green-muted);
}

.acc-header.open {
  background: var(--green-muted);
}

.acc-header-left {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.5vw, 24px);
}

.acc-chevron {
  color: var(--text-dim);
  flex-shrink: 0;
  transition: transform 0.3s var(--ease), color 0.25s;
  display: flex;
}

.acc-header.open .acc-chevron {
  transform: rotate(180deg);
  color: var(--green);
}

.acc-body {
  padding: 0 clamp(24px, 4vw, 48px) clamp(16px, 2.5vw, 28px);
}

/* ── Accordion transition ── */
.acc-enter-active,
.acc-leave-active {
  transition: opacity 0.3s ease, max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  max-height: 2000px;
}

.acc-enter-from,
.acc-leave-to {
  opacity: 0;
  max-height: 0;
}

/* ══════════════════════════════════
   À LA CARTE — standard sections
══════════════════════════════════ */
.meny-section {
  padding: clamp(24px, 4vw, 48px);
}

.meny-section-header {
  display: flex;
  align-items: flex-start;
  gap: clamp(16px, 3vw, 24px);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.meny-section-num {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 300;
  color: var(--text-dim);
  line-height: 1;
  min-width: 40px;
  flex-shrink: 0;
}

.meny-section-title {
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 500;
  font-style: italic;
  color: var(--green-dark);
  display: block;
  margin-bottom: 4px;
  line-height: 1.2;
}

.meny-section-sub {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 300;
  line-height: 1.5;
  display: block;
}

/* ── Menu items (shared) ── */
.meny-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid rgba(45,90,34,0.06);
  transition: padding 0.25s var(--ease);
}

.meny-item:last-child { border-bottom: none; }
.meny-item:hover { padding-left: 6px; }

.meny-item-info { flex-shrink: 1; min-width: 0; }

.meny-item-num {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  color: var(--green-dark);
  margin-right: 6px;
  letter-spacing: 0.02em;
  line-height: 1;
}

.meny-item-name {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 500;
  color: var(--text);
  display: block;
  line-height: 1.3;
}

.meny-item-desc {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 300;
  margin-top: 3px;
  display: block;
  line-height: 1.5;
}

.meny-item-dots {
  flex: 1;
  border-bottom: 1px dotted var(--border-strong);
  min-width: 20px;
  margin-bottom: 5px;
}

.meny-item-price {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 500;
  color: var(--green);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Divider ── */
.meny-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 48px;
}

.meny-divider span {
  width: 100%;
  height: 1px;
  background: var(--border);
}

/* ══════════════════════════════════
   VECKANS LUNCH
══════════════════════════════════ */
.lunch-card {
  overflow: hidden;
}

.lunch-header {
  padding: clamp(28px, 4vw, 48px) clamp(24px, 4vw, 48px) 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.lunch-week-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}

.lunch-week-num {
  font-family: var(--font-serif);
  font-size: 52px;
  font-weight: 300;
  color: var(--green-dim);
  line-height: 1;
}

.lunch-header-sub {
  font-size: 13px;
  font-weight: 300;
  color: var(--text-muted);
  width: 100%;
  margin-top: 4px;
}

.lunch-header-sub strong {
  font-weight: 500;
  color: var(--green);
}

.lunch-day {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  padding: 18px clamp(24px, 4vw, 48px);
  border-bottom: 1px solid var(--border);
  align-items: start;
  transition: padding-left 0.25s var(--ease);
}

.lunch-day:hover {
  padding-left: calc(clamp(24px, 4vw, 48px) + 6px);
}

.lunch-day:last-of-type {
  border-bottom: none;
}

.lunch-day-name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
  color: var(--green-dark);
  padding-top: 2px;
}

.lunch-day-dishes p {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-soft);
  line-height: 1.7;
}

.lunch-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px clamp(24px, 4vw, 48px);
  border-top: 1px solid var(--border);
  background: var(--green-muted);
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 300;
}

.lunch-welcome {
  font-family: var(--font-serif);
  font-size: 22px;
  font-style: italic;
  color: var(--green);
  font-weight: 500;
}

@media (max-width: 600px) {
  .acc-header-left { gap: 12px; }
  .meny-section-header { flex-direction: column; gap: 8px; }
  .meny-item { flex-wrap: wrap; }
  .meny-item-dots { display: none; }
  .meny-item-price { margin-top: 4px; }
  .lunch-day { grid-template-columns: 1fr; gap: 6px; }
  .lunch-footer { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
