import { defineStore } from 'pinia'

// ─── env vars (set in .env — see .env.example) ───────────────────────────────
// VITE_YT_API_KEY   : your Google Cloud YouTube Data API v3 key
// VITE_YT_CHANNEL_ID: the UCxxxxxxxx channel ID for @DrSyedAsifRazaZaidiOfficial
//
// How to find the channel ID:
//   1. Visit https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial
//   2. View page source and search for "channelId" (value starts with "UC")
// ─────────────────────────────────────────────────────────────────────────────

const YT_API_KEY    = import.meta.env.VITE_YT_API_KEY    || ''
const YT_CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID || ''

export const useVideosStore = defineStore('videos', {
  state: () => ({
    videos: [],
    loading: false,
    error: null,
    // true only when both key and channel ID are configured
    hasApiKey: !!(YT_API_KEY && YT_CHANNEL_ID),
  }),

  getters: {
    // The uploads playlist ID is derived from the channel ID by replacing
    // the leading "UC" prefix with "UU".
    uploadsPlaylistId: (state) => {
      if (!YT_CHANNEL_ID) return null
      return 'UU' + YT_CHANNEL_ID.slice(2)
    },
  },

  actions: {
    async fetchVideos() {
      if (!YT_API_KEY || !YT_CHANNEL_ID) {
        this.hasApiKey = false
        return
      }

      this.loading = true
      this.error = null

      try {
        const url = new URL('https://www.googleapis.com/youtube/v3/search')
        url.searchParams.set('key',       YT_API_KEY)
        url.searchParams.set('channelId', YT_CHANNEL_ID)
        url.searchParams.set('part',      'snippet')
        url.searchParams.set('order',     'date')
        url.searchParams.set('type',      'video')
        url.searchParams.set('maxResults','12')

        const res = await fetch(url.toString())

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error?.message || `HTTP ${res.status}`)
        }

        const data = await res.json()

        this.videos = (data.items || []).map((item) => ({
          id:           item.id.videoId,
          title:        item.snippet.title,
          description:  item.snippet.description,
          thumbnail:
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.default?.url,
          publishedAt:  item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
        }))
      } catch (err) {
        this.error = err.message || 'Failed to load videos.'
        console.error('[VideosStore]', err)
      } finally {
        this.loading = false
      }
    },
  },
})
