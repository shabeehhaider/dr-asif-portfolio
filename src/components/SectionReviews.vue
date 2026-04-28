<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFadeIn } from '@/composables/useFadeIn'
import { useReviews } from '@/composables/useReviews'
import { StarIcon } from '@heroicons/vue/24/solid'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import ReviewForm from './ReviewForm.vue'
import ReviewModal from './ReviewModal.vue'

const { el, isVisible } = useFadeIn()
const {
  reviews, loading, error, submitting, submitted,
  hasFirebase, fetchReviews, submitReview, removeReview,
} = useReviews()

const formRef      = ref(null)
const showForm     = ref(false)
const adminMode    = ref(false)
const activeReview = ref(null)   // drives the full-view modal

// ── Pagination ───────────────────────────────────────────────────────────────
const BATCH = 6
const visibleCount = ref(BATCH)
const visibleReviews  = computed(() => reviews.value.slice(0, visibleCount.value))
const hasMore         = computed(() => visibleCount.value < reviews.value.length)
const remainingCount  = computed(() => reviews.value.length - visibleCount.value)
function loadMore() { visibleCount.value += BATCH }

// Reset pagination whenever the list changes (admin toggle / after delete)
watch(() => reviews.value.length, () => { visibleCount.value = BATCH })

// ── Admin mode — Ctrl+Shift+A ────────────────────────────────────────────────
function onKey(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') adminMode.value = !adminMode.value
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  if (hasFirebase) fetchReviews(false)
})
onUnmounted(() => window.removeEventListener('keydown', onKey))
watch(adminMode, (val) => { if (hasFirebase) fetchReviews(val) })

// ── Submit ───────────────────────────────────────────────────────────────────
async function handleSubmit(data) {
  const ok = await submitReview(data)
  if (ok) {
    setTimeout(() => {
      showForm.value = false
      formRef.value?.reset()
      fetchReviews(adminMode.value)
    }, 3000)
  }
}

// ── Delete ───────────────────────────────────────────────────────────────────
async function handleDelete(e, id) {
  e.stopPropagation()
  if (!confirm('Permanently remove this review? This cannot be undone.')) return
  await removeReview(id)
}

// ── Open modal ───────────────────────────────────────────────────────────────
function openFeatured(r) {
  activeReview.value = { name: r.name, rating: r.rating, message: r.text, condition: r.condition, date: r.date }
}
function openLive(r) {
  activeReview.value = { name: r.name, rating: r.rating, message: r.message, condition: r.condition, date: formatDate(r.createdAt) }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })
}

// ── Static featured reviews ───────────────────────────────────────────────────
const featured = [
  { name: 'Ahmed K.',  rating: 5, condition: 'GERD',        date: '2024', text: 'Dr. Asif Raza Zaidi diagnosed my chronic acid reflux quickly and put me on the right treatment. Within two weeks I felt dramatically better. Very thorough and explains everything clearly.' },
  { name: 'Sadia M.',  rating: 5, condition: 'Hepatitis C', date: '2024', text: 'I had been suffering from Hepatitis C for years. After consulting Dr. Asif Raza Zaidi, I went through a complete treatment course and am now fully cured. Extremely knowledgeable doctor.' },
  { name: 'Tariq R.',  rating: 5, condition: 'Fatty Liver', date: '2023', text: 'Brilliant doctor. His YouTube videos helped me understand my fatty liver condition before the appointment. The endoscopy procedure was smooth and he kept me calm throughout.' },
  { name: 'Nadia F.',  rating: 5, condition: 'H. Pylori',   date: '2024', text: 'Highly professional and caring. Diagnosed H. Pylori through a simple breath test, prescribed treatment, and followed up to confirm eradication. My gastric pain is completely gone.' },
  { name: 'Imran S.',  rating: 5, condition: 'Colonoscopy', date: '2023', text: 'Dr. Asif Raza Zaidi is the best gastroenterologist I have visited. He listened patiently and did not rush the consultation. My colonoscopy was handled professionally and results were explained in detail.' },
]
</script>

<template>
  <section
    id="reviews"
    class="py-20 sm:py-24 lg:py-32 bg-slate-50 overflow-hidden"
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
        Admin Mode — all reviews visible including low-rated ones.
        Press <kbd class="font-mono bg-amber-300 px-1.5 py-0.5 rounded text-xs">Ctrl+Shift+A</kbd> to exit.
      </div>
    </Transition>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Section header ──────────────────────────────────────────────────── -->
      <div
        ref="el"
        :class="['text-center mb-14 sm:mb-16 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
          Patient Testimonials
        </span>
        <h2
          id="reviews-heading"
          class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5"
        >
          What Patients Say
        </h2>
        <div class="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-full px-5 sm:px-6 py-3">
          <div class="flex gap-0.5">
            <StarIcon v-for="i in 5" :key="i" class="w-5 h-5 text-amber-400" aria-hidden="true" />
          </div>
          <span class="font-bold text-emerald-800 text-sm">100% Patient Satisfaction</span>
          <span class="text-emerald-600 text-sm hidden sm:inline">· oladoc Verified</span>
        </div>
      </div>

      <!-- ── Featured pinned reviews ─────────────────────────────────────────── -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <button
          v-for="r in featured"
          :key="r.name"
          @click="openFeatured(r)"
          class="group text-left bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 flex flex-col"
        >
          <!-- Quote mark -->
          <div class="text-5xl font-serif text-brand-100 leading-none mb-3 select-none" aria-hidden="true">"</div>

          <!-- Stars -->
          <div class="flex gap-0.5 mb-3">
            <StarIcon v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= r.rating ? 'text-amber-400' : 'text-slate-200'" aria-hidden="true" />
          </div>

          <!-- Text (truncated) -->
          <p class="text-slate-600 text-sm leading-relaxed line-clamp-4 flex-1">{{ r.text }}</p>

          <!-- Read more hint -->
          <p class="text-brand-500 text-xs font-semibold mt-3 group-hover:text-brand-700 transition-colors">
            Read full review →
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">{{ r.name[0] }}</span>
              </div>
              <div>
                <p class="font-semibold text-slate-900 text-sm leading-none">{{ r.name }}</p>
                <p class="text-slate-400 text-xs mt-0.5">{{ r.date }}</p>
              </div>
            </div>
            <span v-if="r.condition" class="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-2.5 py-1 border border-brand-100 flex-shrink-0">
              {{ r.condition }}
            </span>
          </div>
        </button>
      </div>

      <!-- ── Live Firebase reviews ───────────────────────────────────────────── -->
      <div v-if="hasFirebase" class="mt-16 sm:mt-20">

        <!-- Sub-header -->
        <div class="flex items-start sm:items-center justify-between gap-4 mb-8 flex-col sm:flex-row">
          <div>
            <h3 class="text-2xl font-extrabold text-slate-900">Patient Reviews</h3>
            <p class="text-slate-500 text-sm mt-1">
              <template v-if="reviews.length">
                Showing {{ Math.min(visibleCount, reviews.length) }} of {{ reviews.length }} review{{ reviews.length !== 1 ? 's' : '' }}
              </template>
              <template v-else-if="!loading">Be the first to leave a review below</template>
            </p>
          </div>
          <button
            v-if="!showForm"
            @click="showForm = true"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 flex-shrink-0"
          >
            <PencilSquareIcon class="w-4 h-4" aria-hidden="true" />
            Write a Review
          </button>
        </div>

        <!-- Review form -->
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
            class="mb-10 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <!-- Form header -->
            <div class="bg-gradient-to-r from-brand-600 to-teal-600 px-6 sm:px-8 py-5">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-white font-bold text-lg">Share Your Experience</h4>
                  <p class="text-white/70 text-sm mt-0.5">Your review helps other patients make informed decisions.</p>
                </div>
                <button
                  @click="showForm = false; formRef?.reset()"
                  class="text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div class="p-6 sm:p-8">
              <!-- Success state -->
              <div v-if="submitted" class="text-center py-10">
                <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p class="font-bold text-slate-900 text-xl mb-2">Thank you for your review!</p>
                <p class="text-slate-500 text-sm max-w-sm mx-auto">Your experience will be visible shortly and will help other patients.</p>
              </div>

              <ReviewForm
                v-else
                ref="formRef"
                :submitting="submitting"
                :error="error"
                @submit="handleSubmit"
              />
            </div>
          </div>
        </Transition>

        <!-- Loading skeletons -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div
            v-for="i in 6"
            :key="i"
            class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse shadow-sm"
          >
            <div class="h-6 w-8 bg-slate-200 rounded"></div>
            <div class="flex gap-1">
              <div v-for="j in 5" :key="j" class="w-4 h-4 rounded bg-slate-200"></div>
            </div>
            <div class="space-y-2">
              <div class="h-3 bg-slate-200 rounded-full w-full"></div>
              <div class="h-3 bg-slate-200 rounded-full w-5/6"></div>
              <div class="h-3 bg-slate-200 rounded-full w-4/6"></div>
              <div class="h-3 bg-slate-200 rounded-full w-3/6"></div>
            </div>
            <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
              <div class="w-9 h-9 rounded-full bg-slate-200"></div>
              <div class="space-y-1.5 flex-1">
                <div class="h-3 bg-slate-200 rounded-full w-24"></div>
                <div class="h-2.5 bg-slate-200 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Review cards -->
        <div
          v-else-if="visibleReviews.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <div
            v-for="r in visibleReviews"
            :key="r.id"
            :class="[
              'group relative rounded-2xl border p-6 shadow-sm transition-all duration-300 flex flex-col',
              adminMode && r.rating < 3
                ? 'bg-red-50 border-red-200'
                : 'bg-white border-slate-200 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer',
            ]"
            @click="!adminMode && openLive(r)"
            :tabindex="adminMode ? -1 : 0"
            :role="adminMode ? undefined : 'button'"
            :aria-label="adminMode ? undefined : `Read full review by ${r.name}`"
            @keydown.enter="!adminMode && openLive(r)"
          >
            <!-- Admin delete -->
            <button
              v-if="adminMode"
              @click="handleDelete($event, r.id)"
              class="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors z-10"
              title="Delete this review"
            >
              <TrashIcon class="w-4 h-4" aria-hidden="true" />
            </button>

            <!-- Quote mark -->
            <div class="text-5xl font-serif text-brand-100 leading-none mb-3 select-none" :class="{'text-red-100': adminMode && r.rating < 3}" aria-hidden="true">"</div>

            <!-- Stars + hidden badge -->
            <div class="flex items-center gap-2 flex-wrap mb-3">
              <div class="flex gap-0.5">
                <StarIcon v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= r.rating ? 'text-amber-400' : 'text-slate-200'" aria-hidden="true" />
              </div>
              <span v-if="adminMode && r.rating < 3" class="text-xs font-semibold text-red-600 bg-red-100 rounded-full px-2 py-0.5">
                Hidden — low rating
              </span>
            </div>

            <!-- Text (truncated) -->
            <p class="text-slate-600 text-sm leading-relaxed line-clamp-4 flex-1">{{ r.message }}</p>

            <!-- Read more hint (not in admin) -->
            <p v-if="!adminMode && r.message.length > 180" class="text-brand-500 text-xs font-semibold mt-3 group-hover:text-brand-700 transition-colors">
              Read full review →
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t gap-2"
              :class="adminMode && r.rating < 3 ? 'border-red-200' : 'border-slate-100'"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-sm">{{ r.name[0].toUpperCase() }}</span>
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-slate-900 text-sm truncate leading-none">{{ r.name }}</p>
                  <p class="text-slate-400 text-xs mt-0.5">{{ formatDate(r.createdAt) }}</p>
                </div>
              </div>
              <span v-if="r.condition" class="flex-shrink-0 text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-2.5 py-1 border border-brand-100">
                {{ r.condition }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="text-center py-16">
          <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <PencilSquareIcon class="w-8 h-8 text-slate-300" aria-hidden="true" />
          </div>
          <p class="font-semibold text-slate-500 text-base mb-1">No reviews yet</p>
          <p class="text-slate-400 text-sm">Be the first to share your experience with Dr. Asif Raza Zaidi.</p>
        </div>

        <!-- Show more / all loaded -->
        <div v-if="!loading && reviews.length > BATCH" class="mt-10 text-center">
          <button
            v-if="hasMore"
            @click="loadMore"
            class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand-200 text-brand-700 hover:bg-brand-50 hover:border-brand-400 font-semibold text-sm transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Show more reviews
            <span class="bg-brand-100 text-brand-700 rounded-full px-2 py-0.5 text-xs font-bold">
              {{ remainingCount }} more
            </span>
          </button>
          <p v-else class="text-slate-400 text-sm font-medium">
            You've read all {{ reviews.length }} reviews.
          </p>
        </div>

      </div>
      <!-- /hasFirebase -->

      <!-- oladoc link -->
      <div class="mt-12 text-center">
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

    <!-- Full-review modal -->
    <ReviewModal
      v-if="activeReview"
      :review="activeReview"
      @close="activeReview = null"
    />
  </section>
</template>
