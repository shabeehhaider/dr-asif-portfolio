<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, CalendarDaysIcon } from '@heroicons/vue/24/solid'

const { el, isVisible } = useFadeIn()

const OLADOC_URL = 'https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719'

const locations = [
  {
    name: 'Saleem Memorial Hospital',
    address: 'Satluj Block, Green Forts 2, Lahore',
    fee: 'Rs. 4,000',
    timing: '6:00 PM – 8:00 PM',
    days: 'Tue, Thu, Fri, Sat',
    color: 'from-brand-500 to-brand-700',
    badgeColor: 'bg-brand-100 text-brand-700',
  },
  {
    name: 'Kanaan HealthCare',
    address: '2 Shahrah-e-Aiwan-e-Tijarat, near PC Hotel, Lahore',
    fee: 'Rs. 2,000',
    timing: 'By appointment',
    days: 'Available on request',
    color: 'from-teal-500 to-teal-700',
    badgeColor: 'bg-teal-100 text-teal-700',
  },
  {
    name: "Remedy's Medical Centre",
    address: 'Faisal Town, Lahore',
    fee: 'Rs. 2,000',
    timing: 'By appointment',
    days: 'Available on request',
    color: 'from-cyan-500 to-cyan-700',
    badgeColor: 'bg-cyan-100 text-cyan-700',
  },
  {
    name: 'Farooq Hospital',
    address: 'Asif Block, Allama Iqbal Town, Lahore',
    fee: 'Rs. 2,000',
    timing: 'By appointment',
    days: 'Available on request',
    color: 'from-sky-500 to-sky-700',
    badgeColor: 'bg-sky-100 text-sky-700',
  },
]
</script>

<template>
  <section
    id="locations"
    class="py-20 sm:py-24 lg:py-32 bg-slate-50"
    aria-labelledby="locations-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        ref="el"
        :class="['text-center mb-12 sm:mb-16 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
          Find the Doctor
        </span>
        <h2
          id="locations-heading"
          class="text-3xl sm:text-4xl font-extrabold text-slate-900"
        >
          Clinic Locations in Lahore
        </h2>
        <p class="text-slate-500 mt-3 max-w-xl mx-auto text-base sm:text-lg">
          Dr. Zaidi practices at four locations across Lahore — choose the most
          convenient one and book online.
        </p>
      </div>

      <!-- Cards grid: 1 → 2 → 4 cols -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <div
          v-for="(loc, index) in locations"
          :key="loc.name"
          :style="{ transitionDelay: `${index * 80}ms` }"
          :class="[
            'flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
        >
          <!-- Coloured header bar -->
          <div :class="['bg-gradient-to-r h-2 w-full', loc.color]"></div>

          <div class="flex flex-col flex-1 p-5">
            <!-- Location icon + name -->
            <div class="flex items-start gap-3 mb-4">
              <div :class="['mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', loc.badgeColor]">
                <MapPinIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 class="font-bold text-slate-900 text-sm sm:text-base leading-snug">{{ loc.name }}</h3>
            </div>

            <!-- Details -->
            <ul class="space-y-2.5 text-sm flex-1">
              <li class="flex items-start gap-2 text-slate-600">
                <MapPinIcon class="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" aria-hidden="true" />
                <span class="leading-snug">{{ loc.address }}</span>
              </li>
              <li class="flex items-center gap-2 text-slate-600">
                <CurrencyDollarIcon class="w-4 h-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                <span class="font-semibold text-emerald-700">{{ loc.fee }}</span>
              </li>
              <li class="flex items-start gap-2 text-slate-600">
                <CalendarDaysIcon class="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" aria-hidden="true" />
                <span class="leading-snug">{{ loc.days }}</span>
              </li>
              <li class="flex items-center gap-2 text-slate-600">
                <ClockIcon class="w-4 h-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
                <span>{{ loc.timing }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <a
              :href="OLADOC_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-sm transition-colors active:scale-95 border border-brand-100"
            >
              Book at This Location
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Helpline note -->
      <p class="mt-8 text-center text-slate-500 text-sm">
        For timing enquiries call
        <a href="tel:04238900939" class="text-brand-600 font-semibold hover:underline">042-38900939</a>.
      </p>
    </div>
  </section>
</template>
