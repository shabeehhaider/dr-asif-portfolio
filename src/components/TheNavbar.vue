<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 64)
const isMenuOpen = ref(false)
const activeSection = ref('home')

const navLinks = [
  { label: 'About',     href: '#about',     id: 'about' },
  { label: 'Services',  href: '#services',  id: 'services' },
  { label: 'Videos',    href: '#videos',    id: 'videos' },
  { label: 'Locations', href: '#locations', id: 'locations' },
  { label: 'Reviews',   href: '#reviews',   id: 'reviews' },
  { label: 'Contact',   href: '#contact',   id: 'contact' },
]

const WHATSAPP_BOOKING_URL = 'https://wa.me/923033551115?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20Dr.%20Zaidi.'

// Track the active section as the user scrolls.
// rootMargin '-15% 0px -75% 0px' → 10% trigger window sitting just above
// the viewport midpoint. 15+75=90, leaving 10% active zone (15%–25% from top).
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
  )

  const ids = ['home', ...navLinks.map((l) => l.id)]
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => observer?.disconnect())

function smoothScroll(href) {
  isMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
        : 'bg-transparent',
    ]"
  >
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
      aria-label="Main navigation"
    >
      <!-- Logo -->
      <a
        href="#"
        @click.prevent="smoothScroll('#home')"
        :class="[
          'flex items-center gap-2.5 font-bold text-lg leading-tight transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-lg',
          isScrolled ? 'text-brand-700' : 'text-white',
        ]"
        aria-label="Dr. Syed Asif Raza Zaidi – back to top"
      >
        <span
          :class="[
            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
            isScrolled ? 'bg-brand-600' : 'bg-white/20 backdrop-blur-sm',
          ]"
          aria-hidden="true"
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 3a1 1 0 012 0v4h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H5a1 1 0 010-2h4V3z"/>
          </svg>
        </span>
        <span>Dr. Syed Asif Raza Zaidi</span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden lg:flex items-center gap-1" role="list">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            @click.prevent="smoothScroll(link.href)"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeSection === link.id
                ? isScrolled
                  ? 'text-brand-600 bg-brand-50 font-semibold'
                  : 'text-white bg-white/20 font-semibold'
                : isScrolled
                  ? 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                  : 'text-white/75 hover:text-white hover:bg-white/10',
            ]"
            :aria-current="activeSection === link.id ? 'true' : undefined"
          >
            {{ link.label }}
            <!-- Active dot — always in DOM to prevent height jitter; visibility via opacity -->
            <span
              :class="[
                'block mx-auto mt-0.5 w-1 h-1 rounded-full transition-opacity duration-200',
                activeSection === link.id ? 'opacity-100' : 'opacity-0',
                isScrolled ? 'bg-brand-600' : 'bg-white',
              ]"
              aria-hidden="true"
            ></span>
          </a>
        </li>
      </ul>

      <!-- Book Appointment CTA (desktop) -->
      <a
        :href="WHATSAPP_BOOKING_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all shadow hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Book Appointment
      </a>

      <!-- Mobile hamburger -->
      <button
        :class="[
          'lg:hidden p-2 rounded-xl transition-colors',
          isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10',
        ]"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen.toString()"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <XMarkIcon v-if="isMenuOpen" class="w-6 h-6" aria-hidden="true" />
        <Bars3Icon v-else class="w-6 h-6" aria-hidden="true" />
      </button>
    </nav>

    <!-- Mobile menu drawer -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="lg:hidden bg-white border-t border-slate-100 shadow-xl"
      >
        <ul class="px-4 pt-3 pb-2 flex flex-col gap-1" role="list">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              @click.prevent="smoothScroll(link.href)"
              :class="[
                'flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-colors',
                activeSection === link.id
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-slate-700 hover:bg-brand-50 hover:text-brand-600',
              ]"
              :aria-current="activeSection === link.id ? 'true' : undefined"
            >
              {{ link.label }}
              <span
                v-if="activeSection === link.id"
                class="w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0"
                aria-hidden="true"
              ></span>
            </a>
          </li>
        </ul>
        <div class="px-4 pb-4">
          <a
            :href="WHATSAPP_BOOKING_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-full px-5 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all active:scale-95 shadow"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
