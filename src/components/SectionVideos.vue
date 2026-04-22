<script setup>
import { useYouTubeVideos } from '@/composables/useYouTubeVideos'
import { useFadeIn } from '@/composables/useFadeIn'
import VideoCard from './VideoCard.vue'
import VideosFallback from './VideosFallback.vue'

const { videos, loading, error, hasApiKey, uploadsPlaylistId, fetchVideos } = useYouTubeVideos()
const { el: headerEl, isVisible: headerVisible } = useFadeIn()

const CHANNEL_URL = 'https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial'
</script>

<template>
  <section
    id="videos"
    class="py-20 sm:py-24 lg:py-32 bg-white"
    aria-labelledby="videos-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
      <div
        ref="headerEl"
        :class="['text-center mb-12 sm:mb-14 transition-all duration-700', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
          Patient Education
        </span>
        <h2
          id="videos-heading"
          class="text-3xl sm:text-4xl font-extrabold text-slate-900"
        >
          Health Videos in Urdu &amp; English
        </h2>
        <p class="text-slate-500 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
          Dr. Zaidi explains GI and liver conditions in plain language. Click any
          video to watch it right here — no need to leave the page.
        </p>
      </div>

      <!-- ── API-powered grid: each card plays inline ── -->
      <template v-if="hasApiKey">

        <!-- Error state -->
        <div
          v-if="error"
          class="rounded-2xl bg-red-50 border border-red-100 p-6 sm:p-8 text-center"
          role="alert"
        >
          <p class="text-red-700 font-semibold mb-2">Could not load videos</p>
          <p class="text-red-500 text-sm mb-4">{{ error }}</p>
          <button
            @click="fetchVideos"
            class="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors active:scale-95"
          >
            Retry
          </button>
        </div>

        <!-- Loading skeletons (6 pulse cards) -->
        <div
          v-else-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          aria-busy="true"
          aria-label="Loading videos…"
        >
          <div
            v-for="i in 6"
            :key="i"
            class="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm"
          >
            <div class="aspect-video bg-slate-200 animate-pulse"></div>
            <div class="p-4 space-y-2.5">
              <div class="h-4 bg-slate-200 rounded-full animate-pulse w-4/5"></div>
              <div class="h-4 bg-slate-200 rounded-full animate-pulse w-3/5"></div>
              <div class="h-3 bg-slate-100 rounded-full animate-pulse w-1/3"></div>
            </div>
          </div>
        </div>

        <!-- Video card grid — each card has its own inline player -->
        <div
          v-else-if="videos.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <VideoCard
            v-for="video in videos"
            :key="video.id"
            :video="video"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16 text-slate-400">
          <p class="font-medium">No videos found. Check back soon!</p>
        </div>

      </template>

      <!-- ── Fallback: no API key — show embedded channel playlist ── -->
      <template v-else>
        <VideosFallback :uploads-playlist-id="uploadsPlaylistId" />
      </template>

      <!-- Bottom CTA -->
      <div class="mt-10 text-center">
        <a
          :href="CHANNEL_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 font-semibold text-sm transition-all active:scale-95"
        >
          <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
          </svg>
          View Full Channel on YouTube
        </a>
      </div>

    </div>
  </section>
</template>
