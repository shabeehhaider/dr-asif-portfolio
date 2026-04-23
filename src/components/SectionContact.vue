<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import { PhoneIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'

const { el, isVisible } = useFadeIn()

const OLADOC_URL   = 'https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719'
const WHATSAPP_URL = 'https://wa.me/923033551115?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20Dr.%20Zaidi.'

const actions = [
  {
    icon: CalendarDaysIcon,
    label: 'Book on oladoc',
    sub: 'Instant online booking',
    href: OLADOC_URL,
    external: true,
    class: 'bg-brand-600 hover:bg-brand-700 text-white shadow-xl hover:shadow-brand-200/60 hover:shadow-2xl',
    iconClass: 'bg-white/20 text-white',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    label: 'WhatsApp Appointment',
    sub: 'Mr. Kamran · 030-33551115',
    href: WHATSAPP_URL,
    external: true,
    class: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-emerald-200/60 hover:shadow-2xl',
    iconClass: 'bg-white/20 text-white',
  },
  {
    icon: PhoneIcon,
    label: 'Call 030-33551115',
    sub: 'Mr. Kamran · Appointments',
    href: 'tel:03033551115',
    external: false,
    class: 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-brand-300 shadow hover:shadow-lg',
    iconClass: 'bg-brand-100 text-brand-600',
  },
]

const socials = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@drsyedasifrazazaidiofficial',
    color: 'hover:bg-red-600',
    icon: `<path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>`,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/178hTofn4v/',
    color: 'hover:bg-blue-600',
    icon: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dr.asifrazazaidi',
    color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400',
    icon: `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>`,
  },
]
</script>

<template>
  <section
    id="contact"
    class="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-brand-950 via-brand-900 to-teal-800 overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <!-- Ambient blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl"></div>
    </div>

    <div
      ref="el"
      :class="['relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
    >
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
        <span class="text-white/80 text-sm font-medium">Currently Accepting Patients</span>
      </div>

      <h2
        id="contact-heading"
        class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight"
      >
        Ready to Prioritise
        <span class="text-teal-300">Your Gut Health?</span>
      </h2>
      <p class="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-10">
        Book an appointment at Dr. Asif Raza Zaidi's clinics in Lahore, reach out via
        WhatsApp to Mr. Kamran, or call directly — getting started is easy.
      </p>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          v-for="action in actions"
          :key="action.label"
          :href="action.href"
          :target="action.external ? '_blank' : undefined"
          :rel="action.external ? 'noopener noreferrer' : undefined"
          :class="[
            'flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-2xl font-bold text-base transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900',
            action.class,
          ]"
        >
          <span :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', action.iconClass]">
            <component :is="action.icon" class="w-5 h-5" aria-hidden="true" />
          </span>
          <div class="text-left">
            <p class="leading-none text-sm sm:text-base">{{ action.label }}</p>
            <p class="text-xs font-normal opacity-70 mt-0.5">{{ action.sub }}</p>
          </div>
        </a>
      </div>

      <!-- Social media follow row -->
      <div class="mt-12 pt-8 border-t border-white/10">
        <p class="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">Follow for Health Tips</p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :class="['flex items-center gap-2.5 bg-white/10 border border-white/15 hover:border-white/30 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-95', s.color]"
            :aria-label="s.label"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" v-html="s.icon"></svg>
            {{ s.label }}
          </a>
        </div>
      </div>

      <!-- Fees note -->
      <p class="mt-8 text-white/40 text-xs sm:text-sm">
        Consultation fee: Rs. 4,000
      </p>
    </div>
  </section>
</template>
