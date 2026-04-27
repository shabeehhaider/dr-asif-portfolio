import { ref } from 'vue'
import { hasFirebase, db } from '@/firebase'
import {
  collection, addDoc, getDocs, deleteDoc, doc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'

export function useReviews() {
  const reviews    = ref([])
  const loading    = ref(false)
  const error      = ref(null)
  const submitting = ref(false)
  const submitted  = ref(false)

  // adminMode = true → return all reviews (including low-rated / hidden)
  // adminMode = false → only rating >= 3 and visible !== false
  async function fetchReviews(adminMode = false) {
    if (!hasFirebase) return
    loading.value = true
    error.value   = null
    try {
      const q        = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      let all        = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      if (!adminMode) {
        all = all.filter(r => r.rating >= 3 && r.visible !== false)
      }
      reviews.value = all
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function submitReview({ name, rating, message, condition }) {
    if (!hasFirebase) return false
    submitting.value = true
    error.value      = null
    try {
      await addDoc(collection(db, 'reviews'), {
        name:      name.trim(),
        rating:    Number(rating),
        message:   message.trim(),
        condition: (condition || '').trim(),
        visible:   true,
        createdAt: serverTimestamp(),
      })
      submitted.value = true
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      submitting.value = false
    }
  }

  async function removeReview(id) {
    if (!hasFirebase) return
    await deleteDoc(doc(db, 'reviews', id))
    reviews.value = reviews.value.filter(r => r.id !== id)
  }

  return {
    reviews, loading, error, submitting, submitted,
    hasFirebase,
    fetchReviews, submitReview, removeReview,
  }
}
