<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, CalendarDaysIcon, PhoneIcon } from '@heroicons/vue/24/solid'

const { el, isVisible } = useFadeIn()

const WHATSAPP_URL = 'https://wa.me/923033551115?text=Appointment%20required%20at%20Zaidi%20Gastro%20%26%20Liver%20Clinic'
const OLADOC_URL   = 'https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719'

const details = [
  {
    icon: MapPinIcon,
    label: 'Address',
    value: '2nd Basement, Room 35, Farooq Hospital, Allama Iqbal Town, Lahore',
    color: 'text-brand-500',
  },
  {
    icon: CurrencyDollarIcon,
    label: 'Consultation Fee',
    value: 'Rs. 4,000',
    color: 'text-emerald-500',
    highlight: true,
  },
  {
    icon: CalendarDaysIcon,
    label: 'Days',
    value: 'Daily',
    color: 'text-teal-500',
  },
  {
    icon: ClockIcon,
    label: 'Timing',
    value: '7:00 PM – 10:00 PM',
    color: 'text-teal-500',
  },
  {
    icon: PhoneIcon,
    label: 'Appointments',
    value: 'Mr. Muhammad Kamran — 030-33551115',
    color: 'text-brand-500',
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
        :class="['text-center mb-12 sm:mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
          Visit the Doctor
        </span>
        <h2
          id="locations-heading"
          class="text-3xl sm:text-4xl font-extrabold text-slate-900"
        >
          Clinic Location
        </h2>
        <p class="text-slate-500 mt-3 max-w-xl mx-auto text-base sm:text-lg">
          Dr. Asif Raza Zaidi sees patients every evening at his dedicated gastroenterology clinic.
        </p>
      </div>

      <!-- Single featured clinic card -->
      <div
        :class="['max-w-3xl mx-auto transition-all duration-700 delay-100', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      >
        <div class="rounded-3xl overflow-hidden bg-white border border-brand-100 shadow-xl ring-2 ring-brand-400/20">

          <!-- Gradient header band -->
          <div class="bg-gradient-to-r from-brand-600 to-teal-500 px-6 py-5 sm:px-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/30">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    Primary Clinic
                  </span>
                </div>
                <h3 class="text-white font-extrabold text-xl sm:text-2xl leading-tight">
                  Zaidi Gastro &amp; Liver Clinic
                </h3>
                <p class="text-white/75 text-sm mt-0.5">Farooq Hospital, Allama Iqbal Town, Lahore</p>
              </div>
              <!-- Fee pill -->
              <div class="flex-shrink-0 bg-white rounded-2xl px-5 py-3 text-center shadow-sm self-start sm:self-center">
                <p class="text-brand-600 font-black text-2xl leading-none">Rs. 4,000</p>
                <p class="text-slate-400 text-xs font-medium mt-0.5">Consultation Fee</p>
              </div>
            </div>
          </div>

          <!-- Details grid -->
          <div class="p-6 sm:p-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="detail in details"
                :key="detail.label"
                :class="['flex items-start gap-3 p-4 rounded-2xl', detail.highlight ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-100']"
              >
                <div :class="['w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0', detail.color]">
                  <component :is="detail.icon" class="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p class="text-slate-400 text-xs font-medium mb-0.5">{{ detail.label }}</p>
                  <p :class="['font-semibold text-sm leading-snug', detail.highlight ? 'text-emerald-700' : 'text-slate-800']">
                    {{ detail.value }}
                  </p>
                </div>
              </div>
            </div>

            <!-- WhatsApp-only basement alert -->
            <div class="mt-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <p class="text-amber-800 text-sm leading-snug">
                <span class="font-semibold">No mobile signal in basement.</span>
                During clinic hours please contact via WhatsApp only —
                <a href="tel:03033551115" class="font-bold hover:underline">030-33551115</a> (Mr. Kamran).
              </p>
            </div>

            <!-- CTA buttons -->
            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                :href="WHATSAPP_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow hover:shadow-md active:scale-95"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp for Appointment
              </a>
              <a
                :href="OLADOC_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-brand-200 text-brand-700 hover:bg-brand-50 hover:border-brand-300 font-bold text-sm transition-all active:scale-95"
              >
                Book on oladoc
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
