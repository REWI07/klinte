import { ref } from 'vue'

export const lang = ref('sv')

export function setLang(l) {
  lang.value = l
}

const translations = {
  sv: {
    // Nav
    nav_home:    'Hem',
    nav_menu:    'Meny',
    nav_bokabord:'Boka bord',
    nav_contact: 'Kontakt',

    // Hero
    hero_eyebrow:   'Klintehamn, Gotland',
    hero_title:     'Välkommen till',
    hero_subtitle:  'Handgjord pizza, krämig pasta och grill vid havet — ett stenkast från hamnen och båtarna till Karlsöarna.',
    hero_btn_menu:  'Se menyn',
    hero_btn_book:  'Boka bord',
    hero_scroll:    'Scrolla',

    // About
    about_label:  'Om oss',
    about_title:  'En smak av Italien <em>vid kusten</em>',
    about_text:   'Klinte Pizzeria ligger i hjärtat av Klintehamn, ett stenkast från hav, hamn och båtarna till Karlsöarna. Sedan starten har vi serverat handgjord pizza, krämig pasta och grillrätter med råvaror vi är stolta över.',
    about_text_2: 'Oavsett om du kommer för en snabb avhämtning eller vill slå dig ned för en längre middag — vi välkomnar dig med öppna armar och ett fullt bord.',
    about_btn:    'Se vår meny',

    // Services
    feat_pizza_title: 'Pizza & Pasta',
    feat_pizza_text:  'Över 50 pizzor handgjorda i pizzaugn. Klassisk pasta lagad från grunden varje dag.',
    feat_grill_title: 'Grill & Kebab',
    feat_grill_text:  'Grillspett, kycklingfilé och kebab — tillagat på riktigt vis med Medelhavskryddor.',
    feat_bar_title:   'Bar, Biljard & Dart',
    feat_bar_text:    'En trivsam bar med biljard och dart för den som vill stanna ett slag till efter maten.',

    // Immersive 1 — Pizza
    imm1_label: 'Avhämtning & Restaurang',
    imm1_title: 'Handgjord pizza <i>varje dag</i>',
    imm1_text:  'Över 50 pizzor från husets klassiker till specialpizzor med oxfilé och gorgonzola. Beställ för avhämtning eller njut på plats.',
    imm1_btn:   'Upptäck menyn',

    // Immersive 2 — Harbour
    imm2_title: 'Vid hav och <i>hamn</i>',
    imm2_text:  'Klintehamn är porten till Karlsöarna. Vi är det naturliga stoppet innan och efter båtresan.',

    // CTA
    cta_label: 'Välkommen',
    cta_title: 'Boka bord eller <i>ring oss</i>',
    cta_text:  'Öppet alla dagar 11–22. Ring för avhämtning, bordsbokning eller frågor om menyn.',
    cta_btn:   'Boka bord',

    // Meny page
    meny_tab_avhamtning:    'Avhämtning',
    meny_tab_alacarte:      'À la carte',
    meny_note_avhamtning:   'Serveringsavgift tillkommer vid bordsservering (+20 kr) · Glutenfri pizzabotten +30 kr',
    meny_note_alacarte:     'À la carte serveras vid bordet i restaurangen',

    // Contact
    contact_eyebrow:       'Kontakta oss',
    contact_title:         'Hör av dig',
    contact_h2:            'Hör av <i>dig</i>',
    contact_subtitle:      'Frågor om allergier, gruppmiddagar eller avhämtning? Tveka inte att höra av dig!',
    contact_name:          'Namn',
    contact_email:         'E-post',
    contact_email_label:   'E-post',
    contact_email_ph:      'din@epost.se',
    contact_message:       'Meddelande',
    contact_msg_ph:        'Skriv ditt meddelande...',
    contact_send:          'Skicka meddelande',
    contact_sending:       'Skickar...',
    contact_error:         'Något gick fel — ring oss direkt på',
    contact_success_title: 'Tack för ditt meddelande!',
    contact_success_text:  'Vi återkommer så snart vi kan.',
    contact_phone:         'Telefon',
    contact_address:       'Besöksadress',
    contact_hours:         'Öppettider',
    contact_hours_val:     '11:00 – 22:00, alla dagar',
    contact_social:        'Sociala medier',

    // Boka bord
    boka_eyebrow:         'Reservera ditt bord',
    boka_title:           'Boka bord',
    boka_subtitle:        'Fyll i formuläret så bekräftar vi din bokning via telefon eller e-post.',
    boka_name:            'Namn',
    boka_phone:           'Telefon',
    boka_email:           'E-post',
    boka_date:            'Datum',
    boka_time:            'Tid',
    boka_guests:          'Antal gäster',
    boka_notes:           'Önskemål / Noteringar',
    boka_notes_ph:        'Allergier, födelsedag, rullstolsanpassning...',
    boka_select_time:     'Välj tid',
    boka_select_guests:   'Välj antal',
    boka_guest_one:       ' gäst',
    boka_guest_many:      ' gäster',
    boka_guest_contact:   ' gäster (kontakta oss)',
    boka_send:            'Skicka bokningsförfrågan',
    boka_sending:         'Skickar...',
    boka_error:           'Något gick fel — ring oss på',
    boka_success_title:   'Bokningsförfrågan skickad!',
    boka_success_text:    'Vi bekräftar din bokning inom kort via telefon eller e-post.',
    boka_call_label:      'Föredrar du att ringa?',
    boka_call_note:       'Vi tar emot bokningar under öppettider',
    boka_addr_title:      'Adress',
    boka_addr_val:        'Donnersgatan 4\n623 77 Klintehamn, Gotland',
    boka_hours_title:     'Öppettider',
    boka_hours_val2:      '11:00 – 22:00',
    boka_hours_days:      'Alla dagar i veckan',
    boka_email_title:     'E-post',
    boka_cal_label:       'Onlinekalender',
    boka_cal_text:        'Direktbokning via kalender kommer snart. Använd formuläret eller ring oss tills vidare.',

    // Footer
    footer_desc:   'Handgjord pizza, pasta och grill i hjärtat av Klintehamn — ett stenkast från hav och hamn.',
    footer_rights: '© 2025 Klinte Pizzeria. Alla rättigheter förbehållna.',
  },

  en: {
    // Nav
    nav_home:    'Home',
    nav_menu:    'Menu',
    nav_bokabord:'Book a table',
    nav_contact: 'Contact',

    // Hero
    hero_eyebrow:   'Klintehamn, Gotland',
    hero_title:     'Welcome to',
    hero_subtitle:  'Handmade pizza, creamy pasta and grill by the sea — a stone\'s throw from the harbour and boats to Karlsöarna.',
    hero_btn_menu:  'See the menu',
    hero_btn_book:  'Book a table',
    hero_scroll:    'Scroll',

    // About
    about_label:  'About us',
    about_title:  'A taste of Italy <em>by the coast</em>',
    about_text:   'Klinte Pizzeria is located in the heart of Klintehamn, a stone\'s throw from the sea, harbour and boats to Karlsöarna. Since we opened, we\'ve served handmade pizza, creamy pasta and grilled dishes with ingredients we\'re proud of.',
    about_text_2: 'Whether you come for a quick takeaway or want to sit down for a longer dinner — we welcome you with open arms and a full table.',
    about_btn:    'View our menu',

    // Services
    feat_pizza_title: 'Pizza & Pasta',
    feat_pizza_text:  'Over 50 handmade pizzas fresh from the oven. Classic pasta made from scratch every day.',
    feat_grill_title: 'Grill & Kebab',
    feat_grill_text:  'Grill skewers, chicken and kebab — cooked the proper way with Mediterranean spices.',
    feat_bar_title:   'Bar, Billiards & Darts',
    feat_bar_text:    'A cosy bar with billiards and darts for those who want to stay a little longer after dinner.',

    // Immersive 1 — Pizza
    imm1_label: 'Takeaway & Restaurant',
    imm1_title: 'Handmade pizza <i>every day</i>',
    imm1_text:  'Over 50 pizzas from house classics to special pizzas with beef tenderloin and gorgonzola. Order for takeaway or enjoy on site.',
    imm1_btn:   'Discover the menu',

    // Immersive 2 — Harbour
    imm2_title: 'Sea and <i>harbour</i>',
    imm2_text:  'Klintehamn is the gateway to the Karlsö islands. We\'re the natural stop before and after the boat trip.',

    // CTA
    cta_label: 'Welcome',
    cta_title: 'Book a table or <i>call us</i>',
    cta_text:  'Open every day 11–22. Call for takeaway, table booking or questions about the menu.',
    cta_btn:   'Book a table',

    // Meny page
    meny_tab_avhamtning:    'Takeaway',
    meny_tab_alacarte:      'À la carte',
    meny_note_avhamtning:   'Table service charge applies (+20 kr) · Gluten-free pizza base +30 kr',
    meny_note_alacarte:     'À la carte is served at the table in the restaurant',

    // Contact
    contact_eyebrow:       'Contact us',
    contact_title:         'Get in touch',
    contact_h2:            'Get in <i>touch</i>',
    contact_subtitle:      'Questions about allergies, group dinners or takeaway? Don\'t hesitate to reach out!',
    contact_name:          'Name',
    contact_email:         'Email',
    contact_email_label:   'Email',
    contact_email_ph:      'your@email.com',
    contact_message:       'Message',
    contact_msg_ph:        'Write your message...',
    contact_send:          'Send message',
    contact_sending:       'Sending...',
    contact_error:         'Something went wrong — call us directly on',
    contact_success_title: 'Thank you for your message!',
    contact_success_text:  'We\'ll get back to you as soon as we can.',
    contact_phone:         'Phone',
    contact_address:       'Visit us',
    contact_hours:         'Opening hours',
    contact_hours_val:     '11:00 – 22:00, every day',
    contact_social:        'Social media',

    // Boka bord
    boka_eyebrow:         'Reserve your table',
    boka_title:           'Book a table',
    boka_subtitle:        'Fill in the form and we\'ll confirm your booking by phone or email.',
    boka_name:            'Name',
    boka_phone:           'Phone',
    boka_email:           'Email',
    boka_date:            'Date',
    boka_time:            'Time',
    boka_guests:          'Number of guests',
    boka_notes:           'Requests / Notes',
    boka_notes_ph:        'Allergies, birthday, wheelchair access...',
    boka_select_time:     'Select time',
    boka_select_guests:   'Select number',
    boka_guest_one:       ' guest',
    boka_guest_many:      ' guests',
    boka_guest_contact:   ' guests (contact us)',
    boka_send:            'Send booking request',
    boka_sending:         'Sending...',
    boka_error:           'Something went wrong — call us on',
    boka_success_title:   'Booking request sent!',
    boka_success_text:    'We will confirm your booking shortly by phone or email.',
    boka_call_label:      'Prefer to call?',
    boka_call_note:       'We take bookings during opening hours',
    boka_addr_title:      'Address',
    boka_addr_val:        'Donnersgatan 4\n623 77 Klintehamn, Gotland',
    boka_hours_title:     'Opening hours',
    boka_hours_val2:      '11:00 – 22:00',
    boka_hours_days:      'Every day of the week',
    boka_email_title:     'Email',
    boka_cal_label:       'Online calendar',
    boka_cal_text:        'Direct booking via calendar coming soon. Use the form or call us in the meantime.',

    // Footer
    footer_desc:   'Handmade pizza, pasta and grill in the heart of Klintehamn — a stone\'s throw from the sea and harbour.',
    footer_rights: '© 2025 Klinte Pizzeria. All rights reserved.',
  },
}

export const content = ref(translations)

export async function loadContent() {
  // Static translations, no remote fetch needed
}

export function t(key) {
  return content.value[lang.value]?.[key] ?? content.value.sv?.[key] ?? key
}
