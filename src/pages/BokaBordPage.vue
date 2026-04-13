<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import { t, lang } from '../composables/useLanguage.js'
import { settings } from '../composables/useSettings.js'
import SiteFooter from '../components/SiteFooter.vue'

const pageRef = ref(null)
useReveal(pageRef)

const form = ref({
  name: '', phone: '', email: '',
  date: '', time: '', guests: '', notes: '',
})
const sent = ref(false)
const sending = ref(false)
const error = ref(false)

// Date picker state
const dateDay   = ref('')
const dateMonth = ref('')
const dateYear  = ref('')

const monthNamesSv = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
const monthNamesEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const monthNames = computed(() => lang.value === 'en' ? monthNamesEn : monthNamesSv)

const dayOptions  = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
const now         = new Date()
const yearOptions = Array.from({ length: 3 },  (_, i) => String(now.getFullYear() + i))

watch([dateDay, dateMonth, dateYear], ([d, m, y]) => {
  if (d && m && y) form.value.date = `${y}-${m}-${d}`
  else form.value.date = ''
})

const timeOptions = []
for (let h = 11; h <= 21; h++) {
  timeOptions.push(`${String(h).padStart(2,'0')}:00`)
  timeOptions.push(`${String(h).padStart(2,'0')}:30`)
}

const guestOptions = ['1','2','3','4','5','6','7','8','9','10','11+']

onMounted(() => {
  if (!document.querySelector('script[src*="emailjs"]')) {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
    s.onload = () => window.emailjs?.init({ publicKey: 'DIN_PUBLIC_KEY' })
    document.head.appendChild(s)
  }
})

async function submit() {
  if (!form.value.name || !form.value.date || !form.value.guests) return
  sending.value = true
  error.value = false
  try {
    if (!window.emailjs) throw new Error('EmailJS not loaded')
    await window.emailjs.send('DIN_SERVICE_ID', 'DIN_TEMPLATE_ID', { ...form.value })
    sent.value = true
  } catch (e) {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div ref="pageRef" style="padding-top:calc(100px + var(--bar-h));">
    <section class="ed-section">

      <div class="reveal" style="text-align:center;margin-bottom:64px;">
        <p class="ed-label" style="display:flex;justify-content:center;">{{ t('boka_eyebrow') }}</p>
        <h2 class="ed-heading">{{ t('boka_title').split(' ')[0] }} <i>{{ t('boka_title').split(' ').slice(1).join(' ') }}</i></h2>
        <p class="ed-text" style="margin:0 auto;text-align:center;max-width:460px;">{{ t('boka_subtitle') }}</p>
      </div>

      <div class="boka-layout reveal">

        <!-- FORM -->
        <div class="boka-form-side">

          <div v-if="sent" style="text-align:center;padding:60px 0;">
            <div style="font-size:40px;margin-bottom:20px;color:var(--green);">✓</div>
            <h3 style="font-family:var(--font-serif);font-size:28px;color:var(--text);margin-bottom:8px;">{{ t('boka_success_title') }}</h3>
            <p style="color:var(--text-muted);">{{ t('boka_success_text') }}</p>
          </div>

          <form v-else class="contact-form" @submit.prevent="submit">
            <div class="boka-row">
              <div class="field">
                <label>{{ t('boka_name') }} *</label>
                <input v-model="form.name" type="text" :placeholder="t('boka_name')" required>
              </div>
              <div class="field">
                <label>{{ t('boka_phone') }}</label>
                <input v-model="form.phone" type="tel" placeholder="07X XXX XX XX">
              </div>
            </div>

            <div class="field">
              <label>{{ t('boka_email') }}</label>
              <input v-model="form.email" type="email" placeholder="din@epost.se">
            </div>

            <div class="field">
              <label>{{ t('boka_date') }} *</label>
              <!-- Month tiles -->
              <div class="tile-grid tile-grid-months">
                <button
                  v-for="(mo, mi) in monthNames" :key="mi" type="button"
                  class="tile tile-month"
                  :class="{ selected: dateMonth === String(mi + 1).padStart(2, '0') }"
                  @click="dateMonth = String(mi + 1).padStart(2, '0')"
                >{{ mo }}</button>
              </div>
              <!-- Day + Year row -->
              <div class="date-selects">
                <div class="date-seg-wrap">
                  <select v-model="dateDay" class="date-seg-select">
                    <option value="" disabled>{{ lang === 'en' ? 'Day' : 'Dag' }}</option>
                    <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="date-seg-wrap">
                  <select v-model="dateYear" class="date-seg-select">
                    <option value="" disabled>{{ lang === 'en' ? 'Year' : 'År' }}</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>

            <div class="field">
              <label>{{ t('boka_time') }}</label>
              <div class="tile-grid">
                <button
                  v-for="ti in timeOptions" :key="ti" type="button"
                  class="tile" :class="{ selected: form.time === ti }"
                  @click="form.time = ti"
                >{{ ti }}</button>
              </div>
            </div>

            <div class="field">
              <label>{{ t('boka_guests') }} *</label>
              <div class="tile-grid tile-grid-guests">
                <button
                  v-for="g in guestOptions" :key="g" type="button"
                  class="tile tile-guest" :class="{ selected: form.guests === g }"
                  @click="form.guests = g"
                >{{ g }}</button>
              </div>
            </div>

            <div class="field">
              <label>{{ t('boka_notes') }}</label>
              <textarea v-model="form.notes" :placeholder="t('boka_notes_ph')"></textarea>
            </div>

            <p v-if="error" style="color:var(--terra);font-size:14px;">{{ t('boka_error') }} {{ settings.phone_main }}.</p>

            <button type="submit" class="btn btn-green" :disabled="sending" style="align-self:flex-start;margin-top:8px;">
              {{ sending ? t('boka_sending') : t('boka_send') }}
            </button>
          </form>
        </div>

        <!-- INFO SIDE -->
        <div class="boka-info-side">
          <div class="boka-call-card">
            <p class="boka-call-label">{{ t('boka_call_label') }}</p>
            <a :href="settings.phone_main_tel" class="boka-call-phone">{{ settings.phone_main }}</a>
            <p class="boka-call-note">{{ t('boka_call_note') }}</p>
          </div>

          <div class="contact-details">
            <div class="contact-block">
              <h3>{{ t('boka_addr_title') }}</h3>
              <p>Donnersgatan 4<br>623 77 Klintehamn, Gotland</p>
            </div>
            <div class="contact-block">
              <h3>{{ t('boka_hours_title') }}</h3>
              <p>{{ t('boka_hours_val2') }}<br>{{ t('boka_hours_days') }}</p>
            </div>
            <div class="contact-block">
              <h3>{{ t('boka_email_title') }}</h3>
              <a :href="'mailto:' + settings.email">{{ settings.email }}</a>
            </div>
          </div>

        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<style scoped>
.boka-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(40px, 6vw, 100px);
  align-items: start;
}

.boka-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.boka-select {
  width: 100%;
  padding: 16px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-strong);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 300;
  outline: none;
  transition: border-color 0.3s;
  cursor: pointer;
  appearance: none;
}

.boka-select:focus {
  border-color: var(--green);
}

.boka-info-side {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.boka-call-card {
  padding: 32px 28px;
  background: var(--bg-deep);
  border-radius: 3px;
}

.boka-call-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 10px;
  font-weight: 500;
}

.boka-call-phone {
  display: block;
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
  color: var(--gold-light);
  text-decoration: none;
  margin-bottom: 8px;
  transition: opacity 0.2s;
}

.boka-call-phone:hover { opacity: 0.8; }

.boka-call-note {
  font-size: 13px;
  font-weight: 300;
  color: rgba(255,255,255,0.35);
}

.cal-placeholder {
  padding: 28px;
  border: 1px dashed var(--border-strong);
  border-radius: 3px;
  background: var(--green-muted);
}

.cal-label {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 500;
  font-style: italic;
  color: var(--green);
  margin-bottom: 10px;
}

.cal-text {
  font-size: 13px;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.7;
}

/* ── Month tile grid ── */
.tile-grid-months {
  margin-top: 12px;
  gap: 6px;
}

.tile-month {
  min-width: 52px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.5px;
  padding: 8px 6px;
}

/* ── Day + Year selects ── */
.date-selects {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.date-seg-wrap {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.date-seg-select {
  width: 100%;
  padding: 11px 32px 11px 14px;
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: 2px;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 300;
  outline: none;
  transition: border-color 0.25s;
  cursor: pointer;
  appearance: none;
}

.date-seg-select:focus {
  border-color: var(--green);
}

.date-seg-wrap svg {
  position: absolute;
  right: 10px;
  color: var(--text-dim);
  pointer-events: none;
}

/* ── Tile grid — time & guests ── */
.tile-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 0 4px;
}

.tile {
  padding: 7px 14px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
  line-height: 1;
}

.tile:hover {
  background: var(--green-muted);
  color: var(--green);
  border-color: var(--green-dim);
}

.tile.selected {
  background: var(--green);
  color: #fff;
  border-color: var(--green);
}

.tile-grid-guests .tile-guest {
  min-width: 48px;
  text-align: center;
  font-size: 15px;
  padding: 9px 10px;
}

@media (max-width: 900px) {
  .boka-layout { grid-template-columns: 1fr; }
  .boka-row { grid-template-columns: 1fr; gap: 0; }
}
</style>
