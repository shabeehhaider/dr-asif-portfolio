import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useVideosStore } from '@/stores/videos'

/**
 * Composable that exposes the YouTube videos store.
 * Triggers a fetch on mount if the API key is configured and
 * the store hasn't already loaded data.
 */
export function useYouTubeVideos() {
  const store = useVideosStore()
  const { videos, loading, error, hasApiKey, uploadsPlaylistId } = storeToRefs(store)

  onMounted(() => {
    if (store.hasApiKey && store.videos.length === 0 && !store.loading) {
      store.fetchVideos()
    }
  })

  return {
    videos,
    loading,
    error,
    hasApiKey,
    uploadsPlaylistId,
    fetchVideos: () => store.fetchVideos(),
  }
}
