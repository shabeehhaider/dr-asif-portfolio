<script setup>
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const cardRef = ref(null)
const isVisible = ref(false)
const isPlaying = ref(false)

// Lazy-load thumbnail — only fetch when card enters the viewport
const { stop } = useIntersectionObserver(
  cardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)

const relativeTime = computed(() => {
  if (!props.video.publishedAt) return ''
  const now  = new Date()
  const date = new Date(props.video.publishedAt)
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60)       return 'Just now'
  if (diff < 3600)     return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400)    return `${Math.floor(diff / 3600)} hours ago`
  if (diff < 2592000)  return `${Math.floor(diff / 86400)} days ago`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`
  return                      `${Math.floor(diff / 31536000)} years ago`
})
</script>

<template>
  <article
    ref="cardRef"
    class="group rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <!-- ── Thumbnail facade → inline player on click ── -->
    <div class="relative aspect-video bg-slate-100 overflow-hidden">

      <!-- Inline YouTube iframe (shown after click) -->
      <iframe
        v-if="isPlaying"
        :src="`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`"
        :title="video.title"
        class="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <!-- Thumbnail facade (shown before click) -->
      <template v-else>
        <!-- Lazy-loaded thumbnail image -->
        <img
          v-if="isVisible && video.thumbnail"
          :src="video.thumbnail"
          :alt="video.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <!-- Pulse skeleton while thumbnail hasn't entered viewport yet -->
        <div v-else class="absolute inset-0 bg-slate-200 animate-pulse"></div>

        <!-- Dark overlay + play button -->
        <button
          @click="isPlaying = true"
          class="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
          :aria-label="`Play: ${video.title}`"
        >
          <span
            class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg
                   scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100
                   transition-all duration-300"
            aria-hidden="true"
          >
            <svg class="w-6 h-6 text-brand-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
        </button>
      </template>
    </div>

    <!-- Video meta -->
    <div class="p-4">
      <h3 class="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug mb-1.5 group-hover:text-brand-600 transition-colors">
        {{ video.title }}
      </h3>
      <div class="flex items-center justify-between gap-2">
        <p class="text-slate-400 text-xs font-medium">{{ relativeTime }}</p>
        <!-- "Watch on YouTube" link -->
        <a
          :href="`https://www.youtube.com/watch?v=${video.id}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-brand-500 hover:text-brand-600 font-medium hover:underline underline-offset-2 flex-shrink-0"
          :aria-label="`Watch '${video.title}' on YouTube`"
          @click.stop
        >
          YouTube ↗
        </a>
      </div>
    </div>
  </article>
</template>
