<script setup>
import { onMounted, onUnmounted } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  review: { type: Object, required: true },
})
const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="`Review by ${review.name}`"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="emit('close')"
        ></div>

        <!-- Card -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
        >
          <div class="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">

            <!-- Header bar -->
            <div class="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 flex-shrink-0">
              <div class="flex gap-0.5">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  :class="i <= review.rating ? 'text-amber-400' : 'text-slate-200'"
                  aria-hidden="true"
                />
              </div>
              <button
                @click="emit('close')"
                class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label="Close"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Body — scrollable -->
            <div class="px-6 sm:px-8 py-6 overflow-y-auto flex-1">
              <!-- Decorative quote -->
              <div class="text-8xl font-serif text-brand-100 leading-none select-none mb-2" aria-hidden="true">"</div>

              <blockquote class="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                {{ review.message }}
              </blockquote>
            </div>

            <!-- Footer -->
            <div class="px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50 flex-shrink-0">
              <div class="flex items-center justify-between gap-4 flex-wrap">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-base">{{ review.name[0].toUpperCase() }}</span>
                  </div>
                  <div>
                    <p class="font-bold text-slate-900 text-sm">{{ review.name }}</p>
                    <p class="text-slate-400 text-xs mt-0.5">{{ review.date }}</p>
                  </div>
                </div>
                <span
                  v-if="review.condition"
                  class="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-3 py-1.5 border border-brand-100"
                >
                  {{ review.condition }}
                </span>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
