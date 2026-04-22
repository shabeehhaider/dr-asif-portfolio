<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  video: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

// Lock scroll while modal is open
watch(() => props.video, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
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
        v-if="video"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12"
        role="dialog"
        :aria-label="`Video: ${video?.title}`"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-sm"
          @click="emit('close')"
          aria-hidden="true"
        ></div>

        <!-- Modal panel -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
          appear
        >
          <div
            v-if="video"
            class="relative z-10 w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <!-- Close button -->
            <button
              @click="emit('close')"
              class="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close video"
            >
              <XMarkIcon class="w-5 h-5" aria-hidden="true" />
            </button>

            <!-- Embedded YouTube player -->
            <div class="aspect-video w-full bg-black">
              <iframe
                v-if="video.id"
                :src="`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`"
                :title="video.title"
                class="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>

            <!-- Video meta -->
            <div class="px-5 py-4">
              <h2 class="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {{ video.title }}
              </h2>
              <p v-if="video.channelTitle" class="text-brand-600 text-sm font-medium mt-1">
                {{ video.channelTitle }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
