<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import { StarIcon } from '@heroicons/vue/24/solid'

const { el, isVisible } = useFadeIn()

const reviews = [
  {
    name: 'Ahmed K.',
    location: 'Lahore',
    rating: 5,
    text: 'Dr. Zaidi diagnosed my chronic acid reflux quickly and put me on the right treatment. Within two weeks I felt dramatically better. Very thorough and explains everything clearly.',
    condition: 'GERD',
    date: '2024',
  },
  {
    name: 'Sadia M.',
    location: 'Lahore',
    rating: 5,
    text: 'I had been suffering from Hepatitis C for years. After consulting Dr. Asif Raza Zaidi, I went through a complete treatment course and am now fully cured. Extremely knowledgeable doctor.',
    condition: 'Hepatitis C',
    date: '2024',
  },
  {
    name: 'Tariq R.',
    location: 'Lahore',
    rating: 5,
    text: 'Brilliant doctor. His YouTube videos helped me understand my fatty liver condition before the appointment. The endoscopy procedure was smooth and he kept me calm throughout.',
    condition: 'Fatty Liver',
    date: '2023',
  },
  {
    name: 'Nadia F.',
    location: 'Lahore',
    rating: 5,
    text: 'Highly professional and caring. Diagnosed H. Pylori through a simple breath test, prescribed treatment, and followed up to confirm eradication. My gastric pain is completely gone.',
    condition: 'H. Pylori',
    date: '2024',
  },
  {
    name: 'Imran S.',
    location: 'Lahore',
    rating: 5,
    text: 'Dr. Zaidi is the best gastroenterologist I have visited. He listened patiently and did not rush the consultation. My colonoscopy was handled professionally and the results were explained in detail.',
    condition: 'Colonoscopy',
    date: '2023',
  },
]
</script>

<template>
  <section
    id="reviews"
    class="py-20 sm:py-24 lg:py-32 bg-white overflow-hidden"
    aria-labelledby="reviews-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        ref="el"
        :class="['text-center mb-12 sm:mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
          Patient Testimonials
        </span>
        <h2
          id="reviews-heading"
          class="text-3xl sm:text-4xl font-extrabold text-slate-900"
        >
          What Patients Say
        </h2>

        <!-- Satisfaction badge -->
        <div class="inline-flex items-center gap-3 mt-5 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-3">
          <div class="flex gap-0.5">
            <StarIcon v-for="i in 5" :key="i" class="w-5 h-5 text-amber-400" aria-hidden="true" />
          </div>
          <span class="font-bold text-emerald-800 text-sm">100% Patient Satisfaction</span>
          <span class="text-emerald-600 text-sm">(oladoc Verified)</span>
        </div>
      </div>

      <!-- Cards: horizontal scroll on mobile, grid on sm+ -->
      <div class="flex gap-5 overflow-x-auto pb-4 sm:pb-0 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          v-for="review in reviews"
          :key="review.name"
          class="flex-shrink-0 w-[85vw] sm:w-auto snap-center rounded-3xl bg-slate-50 border border-slate-100 p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <!-- Stars -->
          <div class="flex gap-0.5">
            <StarIcon v-for="i in review.rating" :key="i" class="w-4 h-4 text-amber-400" aria-hidden="true" />
          </div>

          <!-- Review text -->
          <blockquote class="text-slate-700 text-sm leading-relaxed flex-1">
            "{{ review.text }}"
          </blockquote>

          <!-- Patient info -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center">
                <span class="text-brand-700 font-bold text-sm">{{ review.name[0] }}</span>
              </div>
              <div>
                <p class="font-semibold text-slate-900 text-sm">{{ review.name }}</p>
                <p class="text-slate-400 text-xs">{{ review.location }}</p>
              </div>
            </div>
            <span class="text-xs font-medium bg-brand-50 text-brand-600 rounded-full px-2.5 py-1 border border-brand-100">
              {{ review.condition }}
            </span>
          </div>
        </div>
      </div>

      <!-- oladoc link -->
      <div class="mt-10 text-center">
        <a
          href="https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-sm hover:underline underline-offset-2 transition-colors"
        >
          Read all verified reviews on oladoc
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
