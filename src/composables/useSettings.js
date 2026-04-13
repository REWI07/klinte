import { ref } from 'vue'

export const settings = ref({
  phone_main: '073-560 85 23',
  phone_main_tel: 'tel:073-56085 23',
  email: 'klintepizzeria@gmail.com',
  facebook_url: '#',
  instagram_url: '#',
})

let loaded = false
export async function loadSettings() {
  if (loaded) return
  try {
    const res = await fetch('/api/settings.php')
    const data = await res.json()
    if (data) {
      settings.value = { ...settings.value, ...data }
      loaded = true
    }
  } catch (e) {}
}
