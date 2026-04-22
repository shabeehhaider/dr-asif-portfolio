<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import { PhoneIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'

const { el, isVisible } = useFadeIn()

const OLADOC_URL = 'https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719'
const WHATSAPP_URL = 'https://wa.me/923213551115?text=Hello%20Dr.%20Zaidi%2C%20I%20would%20like%20to%20book%20an%20appointment.'

const actions = [
  {
    icon: CalendarDaysIcon,
    label: 'Book on oladoc',
    sub: 'Instant online booking',
    href: OLADOC_URL,
    external: true,
    class: 'bg-brand-600 hover:bg-brand-700 text-white shadow-xl hover:shadow-brand-200/60 hover:shadow-2xl',
    iconClass: 'bg-white/20',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    label: 'WhatsApp',
    sub: 'Chat for quick queries',
    href: WHATSAPP_URL,
    external: true,
    class: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-emerald-200/60 hover:shadow-2xl',
    iconClass: 'bg-white/20',
  },
  {
    icon: PhoneIcon,
    label: 'Call 042-38900939',
    sub: 'Mon – Sat, 9 AM – 8 PM',
    href: 'tel:04238900939',
    external: false,
    class: 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-brand-300 shadow hover:shadow-lg',
    iconClass: 'bg-brand-100 text-brand-600',
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
      <p class="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-12">
        Book an appointment at any of Dr. Zaidi's four clinics in Lahore,
        reach out via WhatsApp, or call the helpline — getting started is easy.
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

      <!-- Consultation fees note -->
      <p class="mt-10 text-white/40 text-xs sm:text-sm">
        Consultation fee: Rs. 2,000 – Rs. 4,000 depending on clinic location.
      </p>
    </div>
  </section>
</template>
