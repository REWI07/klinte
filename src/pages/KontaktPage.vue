<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import { t } from '../composables/useLanguage.js'
import { settings } from '../composables/useSettings.js'
import SiteFooter from '../components/SiteFooter.vue'

const pageRef = ref(null)
useReveal(pageRef)

const form = ref({ namn: '', epost: '', meddelande: '' })
const sent = ref(false)
const sending = ref(false)
const error = ref(false)

async function submit() {
  if (!form.value.epost) return
  sending.value = true
  error.value = false
  try {
    if (!window.emailjs) throw new Error('EmailJS not loaded')
    await window.emailjs.send('DIN_SERVICE_ID', 'DIN_TEMPLATE_ID', {
      name:    form.value.namn,
      email:   form.value.epost,
      message: form.value.meddelande,
    })
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
        <p class="ed-label" style="display:flex;justify-content:center;">{{ t('contact_eyebrow') }}</p>
        <h2 class="ed-heading" v-html="t('contact_h2')"></h2>
        <p class="ed-text" style="margin:0 auto;text-align:center;max-width:460px;">{{ t('contact_subtitle') }}</p>
      </div>

      <div class="contact-layout reveal">

        <!-- FORM -->
        <div>
          <div v-if="sent" style="text-align:center;padding:60px 0;">
            <div style="font-size:32px;margin-bottom:16px;color:var(--green);">✓</div>
            <h3 style="font-family:var(--font-serif);font-size:28px;color:var(--text);margin-bottom:8px;">{{ t('contact_success_title') }}</h3>
            <p style="color:var(--text-muted);">{{ t('contact_success_text') }}</p>
          </div>

          <form v-else class="contact-form" @submit.prevent="submit">
            <div class="field">
              <label>{{ t('contact_name') }}</label>
              <input v-model="form.namn" type="text" :placeholder="t('contact_name')">
            </div>
            <div class="field">
              <label>{{ t('contact_email') }} *</label>
              <input v-model="form.epost" type="email" :placeholder="t('contact_email_ph')" required>
            </div>
            <div class="field">
              <label>{{ t('contact_message') }}</label>
              <textarea v-model="form.meddelande" :placeholder="t('contact_msg_ph')"></textarea>
            </div>
            <p v-if="error" style="color:var(--terra);font-size:14px;">{{ t('contact_error') }} {{ settings.phone_main }}.</p>
            <button type="submit" class="btn btn-green" :disabled="sending" style="align-self:flex-start;margin-top:8px;">
              {{ sending ? t('contact_sending') : t('contact_send') }}
            </button>
          </form>
        </div>

        <!-- INFO -->
        <div class="contact-details">
          <div class="contact-block">
            <h3>{{ t('contact_phone') }}</h3>
            <a :href="settings.phone_main_tel">{{ settings.phone_main }}</a>
          </div>
          <div class="contact-block">
            <h3>{{ t('contact_email_label') }}</h3>
            <a :href="'mailto:' + settings.email">{{ settings.email }}</a>
          </div>
          <div class="contact-block">
            <h3>{{ t('contact_address') }}</h3>
            <p>Donnersgatan 4<br>623 77 Klintehamn, Gotland</p>
          </div>
          <div class="contact-block">
            <h3>{{ t('contact_hours') }}</h3>
            <p>{{ t('contact_hours_val') }}</p>
          </div>
          <div class="contact-block">
            <h3>{{ t('contact_social') }}</h3>
            <a :href="settings.instagram_url" target="_blank" rel="noopener">Instagram</a>
            <span style="color:var(--text-dim);margin:0 8px;">·</span>
            <a :href="settings.facebook_url" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>

      </div>
    </section>

    <!-- MAP -->
    <div class="map-embed">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2207.0!2d18.19!3d57.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDonnersgatan+4%2C+Klintehamn!5e0!3m2!1ssv!2sse!4v1"
        width="100%"
        height="320"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Klinte Pizzeria"
      ></iframe>
    </div>

    <SiteFooter />
  </div>
</template>

<style scoped>
.map-embed {
  border-top: 1px solid var(--border);
  overflow: hidden;
}
</style>
