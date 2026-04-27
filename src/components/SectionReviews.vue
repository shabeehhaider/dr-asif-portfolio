<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useFadeIn } from '@/composables/useFadeIn'
import { useReviews } from '@/composables/useReviews'
import { StarIcon } from '@heroicons/vue/24/solid'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import ReviewForm from './ReviewForm.vue'

const { el, isVisible } = useFadeIn()
const {
  reviews, loading, error, submitting, submitted,
  hasFirebase, fetchReviews, submitReview, removeReview,
} = useReviews()

const formRef    = ref(null)
const showForm   = ref(false)
const adminMode  = ref(false)

// ── Admin toggle — Ctrl+Shift+A ──────────────────────────────────────────────
function onKey(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') adminMode.value = !adminMode.value
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  if (hasFirebase) fetchReviews(false)
})
onUnmounted(() => window.removeEventListener('keydown', onKey))

// When admin mode toggles, re-fetch so hidden/low-rated reviews appear
watch(adminMode, (val) => { if (hasFirebase) fetchReviews(val) })

// ── Submit ───────────────────────────────────────────────────────────────────
async function handleSubmit(data) {
  const ok = await submitReview(data)
  if (ok) {
    // After 3s close the form and refresh the list
    setTimeout(() => {
      showForm.value = false
      formRef.value?.reset()
      fetchReviews(adminMode.value)
    }, 3000)
  }
}

// ── Delete ───────────────────────────────────────────────────────────────────
async function handleDelete(id) {
  if (!confirm('Permanently remove this review? This cannot be undone.')) return
  await removeReview(id)
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })
}

// ── Static featured testimonials (pinned) ────────────────────────────────────
const featured = [
  {
    name: 'Ahmed K.', location: 'Lahore', rating: 5, condition: 'GERD', date: '2024',
    text: 'Dr. Asif Raza Zaidi diagnosed my chronic acid reflux quickly and put me on the right treatment. Within two weeks I felt dramatically better. Very thorough and explains everything clearly.',
  },
  {
    name: 'Sadia M.', location: 'Lahore', rating: 5, condition: 'Hepatitis C', date: '2024',
    text: 'I had been suffering from Hepatitis C for years. After consulting Dr. Asif Raza Zaidi, I went through a complete treatment course and am now fully cured. Extremely knowledgeable doctor.',
  },
  {
    name: 'Tariq R.', location: 'Lahore', rating: 5, condition: 'Fatty Liver', date: '2023',
    text: 'Brilliant doctor. His YouTube videos helped me understand my fatty liver condition before the appointment. The endoscopy procedure was smooth and he kept me calm throughout.',
  },
  {
    name: 'Nadia F.', location: 'Lahore', rating: 5, condition: 'H. Pylori', date: '2024',
    text: 'Highly professional and caring. Diagnosed H. Pylori through a simple breath test, prescribed treatment, and followed up to confirm eradication. My gastric pain is completely gone.',
  },
  {
    name: 'Imran S.', location: 'Lahore', rating: 5, condition: 'Colonoscopy', date: '2023',
    text: 'Dr. Asif Raza Zaidi is the best gastroenterologist I have visited. He listened patiently and did not rush the consultation. My colonoscopy was handled professionally and the results were explained in detail.',
  },
]
</script>

<template>
  <section
    id="reviews"
    class="py-20 sm:py-24 lg:py-32 bg-white overflow-hidden"
    aria-labelledby="reviews-heading"
  >
    <!-- Admin banner -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="adminMode"
        class="bg-amber-400 text-amber-950 text-sm font-semibold text-center py-2.5 px-4 mb-2"
      >
        Admin Mode — all reviews visible, including low-rated ones.
        Press <kbd class="font-mono bg-amber-300 px-1.5 py-0.5 rounded">Ctrl+Shift+A</kbd> to exit.
      </div>
    </Transition>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
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
        <div class="inline-flex items-center gap-3 mt-5 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-3">
          <div class="flex gap-0.5">
            <StarIcon v-for="i in 5" :key="i" class="w-5 h-5 text-amber-400" aria-hidden="true" />
          </div>
          <span class="font-bold text-emerald-800 text-sm">100% Patient Satisfaction</span>
          <span class="text-emerald-600 text-sm hidden sm:inline">(oladoc Verified)</span>
        </div>
      </div>

      <!-- ── Featured (pinned) reviews ─────────────────────────────────────── -->
      <div class="flex gap-5 overflow-x-auto pb-4 sm:pb-0 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          v-for="r in featured"
          :key="r.name"
          class="flex-shrink-0 w-[85vw] sm:w-auto snap-center rounded-3xl bg-slate-50 border border-slate-100 p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex gap-0.5">
            <StarIcon v-for="i in r.rating" :key="i" class="w-4 h-4 text-amber-400" aria-hidden="true" />
          </div>
          <blockquote class="text-slate-700 text-sm leading-relaxed flex-1">"{{ r.text }}"</blockquote>
          <div class="flex items-center justify-between pt-3 border-t border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center">
                <span class="text-brand-700 font-bold text-sm">{{ r.name[0] }}</span>
              </div>
              <div>
                <p class="font-semibold text-slate-900 text-sm">{{ r.name }}</p>
                <p class="text-slate-400 text-xs">{{ r.location }}</p>
              </div>
            </div>
            <span class="text-xs font-medium bg-brand-50 text-brand-600 rounded-full px-2.5 py-1 border border-brand-100">
              {{ r.condition }}
            </span>
          </div>
        </div>
      </div>

      <!-- ── Live community reviews (Firebase) ─────────────────────────────── -->
      <div v-if="hasFirebase" class="mt-16 sm:mt-20">

        <!-- Sub-header + Write a Review button -->
        <div class="flex items-center justify-between mb-7">
          <div>
            <h3 class="text-xl font-bold text-slate-900">
              Patient Reviews
            </h3>
            <p class="text-slate-400 text-sm mt-0.5">
              {{ reviews.length ? `${reviews.length} review${reviews.length > 1 ? 's' : ''} from patients` : 'Be the first to leave a review' }}
            </p>
          </div>
          <button
            v-if="!showForm"
            @click="showForm = true"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow hover:shadow-md transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <PencilSquareIcon class="w-4 h-4" aria-hidden="true" />
            Write a Review
          </button>
        </div>

        <!-- Review form (collapsible) -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-3"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-3"
        >
          <div
            v-if="showForm"
            class="mb-10 rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 max-w-2xl mx-auto"
          >
            <div class="flex items-center justify-between mb-6">
              <h4 class="text-lg font-bold text-slate-900">Share Your Experience</h4>
              <button
                @click="showForm = false; formRef?.reset()"
                class="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>

            <!-- Success state -->
            <Transition
              enter-active-class="transition-all duration-500"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
            >
              <div v-if="submitted" class="text-center py-8">
                <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p class="font-bold text-slate-900 text-lg mb-1">Thank you!</p>
                <p class="text-slate-500 text-sm">Your review has been submitted and will appear shortly.</p>
              </div>
            </Transition>

            <ReviewForm
              v-if="!submitted"
              ref="formRef"
              :submitting="submitting"
              :error="error"
              @submit="handleSubmit"
            />
          </div>
        </Transition>

        <!-- Loading skeletons -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="rounded-3xl bg-slate-50 border border-slate-100 p-6 space-y-3 animate-pulse"
          >
            <div class="flex gap-1">
              <div v-for="j in 5" :key="j" class="w-4 h-4 rounded-sm bg-slate-200"></div>
            </div>
            <div class="h-3 bg-slate-200 rounded-full w-full"></div>
            <div class="h-3 bg-slate-200 rounded-full w-4/5"></div>
            <div class="h-3 bg-slate-200 rounded-full w-3/5"></div>
            <div class="flex items-center gap-2 pt-2">
              <div class="w-9 h-9 rounded-full bg-slate-200"></div>
              <div class="space-y-1.5">
                <div class="h-3 bg-slate-200 rounded-full w-24"></div>
                <div class="h-2.5 bg-slate-200 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Review cards grid -->
        <div
          v-else-if="reviews.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <div
            v-for="r in reviews"
            :key="r.id"
            :class="[
              'relative rounded-3xl border p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
              adminMode && r.rating < 3
                ? 'bg-red-50 border-red-200'
                : 'bg-slate-50 border-slate-100',
            ]"
          >
            <!-- Admin delete button -->
            <button
              v-if="adminMode"
              @click="handleDelete(r.id)"
              class="absolute top-3 right-3 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-red-400"
              title="Delete this review"
            >
              <TrashIcon class="w-4 h-4" aria-hidden="true" />
            </button>

            <!-- Stars + hidden badge -->
            <div class="flex items-center gap-2 flex-wrap">
              <div class="flex gap-0.5">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="w-4 h-4"
                  :class="i <= r.rating ? 'text-amber-400' : 'text-slate-200'"
                  aria-hidden="true"
                />
              </div>
              <span
                v-if="adminMode && r.rating < 3"
                class="text-xs font-semibold text-red-600 bg-red-100 rounded-full px-2 py-0.5"
              >
                Hidden — low rating
              </span>
            </div>

            <!-- Review text -->
            <blockquote class="text-slate-700 text-sm leading-relaxed flex-1">
              "{{ r.message }}"
            </blockquote>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-200 gap-2">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <span class="text-brand-700 font-bold text-sm">{{ r.name[0].toUpperCase() }}</span>
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-slate-900 text-sm truncate">{{ r.name }}</p>
                  <p class="text-slate-400 text-xs">{{ formatDate(r.createdAt) }}</p>
                </div>
              </div>
              <span
                v-if="r.condition"
                class="flex-shrink-0 text-xs font-medium bg-brand-50 text-brand-600 rounded-full px-2.5 py-1 border border-brand-100"
              >
                {{ r.condition }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="text-center py-12 text-slate-400">
          <PencilSquareIcon class="w-10 h-10 mx-auto mb-3 text-slate-300" aria-hidden="true" />
          <p class="font-medium text-sm">No reviews yet — be the first to share your experience!</p>
        </div>

      </div>
      <!-- /hasFirebase -->

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
