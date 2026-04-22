<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  uploadsPlaylistId: {
    type: String,
    default: null,
  },
})

// The uploads playlist embed shows the full channel playlist with a built-in
// sidebar that lets visitors browse every video without leaving the page.
// YouTube auto-updates this playlist the moment a new video is published.
const embedUrl = computed(() => {
  if (!props.uploadsPlaylistId) return null
  // index=1 starts at the newest video; list= pulls the full playlist sidebar
  return `https://www.youtube.com/embed?listType=playlist&list=${props.uploadsPlaylistId}&index=1&rel=0&modestbranding=1`
})

const CHANNEL_URL = 'https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial'

// Toggle between the embedded player and a "visit channel" prompt
const showEmbed = ref(true)
</script>

<template>
  <div>
    <!-- ── Full playlist embed (channel ID configured) ── -->
    <template v-if="embedUrl">
      <!-- Header bar above the player -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
            </svg>
          </div>
          <div>
            <p class="font-bold text-slate-900 text-sm">All Videos — Dr. Zaidi's Channel</p>
            <p class="text-slate-400 text-xs">Browse &amp; watch every video right here. Updated automatically.</p>
          </div>
        </div>
        <a
          :href="CHANNEL_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline underline-offset-2 flex-shrink-0"
        >
          Open on YouTube ↗
        </a>
      </div>

      <!-- Embedded player — tall on mobile, widescreen on md+ -->
      <!-- The playlist sidebar appears on the right (YouTube renders it automatically) -->
      <div class="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black">
        <!-- Mobile: standard 16/9 player -->
        <div class="aspect-video md:hidden">
          <iframe
            :src="embedUrl"
            title="Dr. Syed Asif Raza Zaidi – All Health Videos"
            class="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
        <!-- md+: taller frame so the playlist sidebar is comfortably visible -->
        <div class="hidden md:block" style="height: 540px;">
          <iframe
            :src="embedUrl"
            title="Dr. Syed Asif Raza Zaidi – All Health Videos"
            class="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <p class="text-center text-slate-400 text-xs mt-3">
        Use the playlist sidebar inside the player to browse all videos.
        No API key required — updates automatically.
      </p>
    </template>

    <!-- ── No channel ID configured: simple channel link card ── -->
    <template v-else>
      <div class="rounded-3xl bg-gradient-to-br from-red-50 to-slate-50 border border-red-100 p-8 sm:p-12 text-center">
        <div class="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
          <svg class="w-9 h-9 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Health Education Videos</h3>
        <p class="text-slate-500 text-sm max-w-md mx-auto mb-2">
          Dr. Zaidi regularly uploads educational videos about gut health, liver
          disease, and GI procedures in Urdu and English.
        </p>
        <p class="text-slate-400 text-xs max-w-md mx-auto mb-6">
          Add <code class="bg-slate-100 px-1 py-0.5 rounded text-slate-600">VITE_YT_CHANNEL_ID</code> to
          <code class="bg-slate-100 px-1 py-0.5 rounded text-slate-600">.env</code> to embed all videos directly here.
        </p>
        <a
          :href="CHANNEL_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all shadow hover:shadow-md active:scale-95"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
          </svg>
          Visit YouTube Channel
        </a>
      </div>
    </template>
  </div>
</template>
