<script setup>
import { ref } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  submitting: { type: Boolean, default: false },
  error:      { type: String,  default: null },
})

const emit = defineEmits(['submit'])

const name      = ref('')
const rating    = ref(0)
const hovered   = ref(0)
const condition = ref('')
const message   = ref('')
const errors    = ref({})

function validate() {
  errors.value = {}
  if (!name.value.trim())                        errors.value.name    = 'Name is required.'
  if (!rating.value)                             errors.value.rating  = 'Please choose a star rating.'
  if (message.value.trim().length < 20)          errors.value.message = 'Please write at least 20 characters.'
  return Object.keys(errors.value).length === 0
}

function submit() {
  if (!validate()) return
  emit('submit', {
    name:      name.value.trim(),
    rating:    rating.value,
    message:   message.value.trim(),
    condition: condition.value.trim(),
  })
}

function reset() {
  name.value = ''; rating.value = 0; hovered.value = 0
  condition.value = ''; message.value = ''; errors.value = {}
}

defineExpose({ reset })

const starLabels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']
</script>

<template>
  <form @submit.prevent="submit" novalidate class="space-y-5">

    <!-- Name -->
    <div>
      <label class="block text-sm font-semibold text-slate-700 mb-1.5">
        Your Name <span class="text-red-500">*</span>
      </label>
      <input
        v-model="name"
        type="text"
        placeholder="e.g. Ahmed K."
        maxlength="60"
        autocomplete="name"
        :class="[
          'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all',
          errors.name
            ? 'border-red-300 bg-red-50 focus:ring-red-300'
            : 'border-slate-200 focus:ring-brand-400 bg-white',
        ]"
      />
      <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
    </div>

    <!-- Star rating -->
    <div>
      <label class="block text-sm font-semibold text-slate-700 mb-2">
        Rating <span class="text-red-500">*</span>
      </label>
      <div class="flex items-center gap-1">
        <button
          v-for="i in 5"
          :key="i"
          type="button"
          @click="rating = i"
          @mouseenter="hovered = i"
          @mouseleave="hovered = 0"
          :aria-label="`${i} star — ${starLabels[i - 1]}`"
          class="focus:outline-none transition-transform hover:scale-110 active:scale-95"
        >
          <StarIcon
            class="w-9 h-9 transition-colors duration-100"
            :class="(hovered || rating) >= i ? 'text-amber-400' : 'text-slate-200'"
          />
        </button>
        <span class="ml-2 text-sm text-slate-500 font-medium min-w-[5rem]">
          {{ hovered ? starLabels[hovered - 1] : (rating ? starLabels[rating - 1] : '') }}
        </span>
      </div>
      <p v-if="errors.rating" class="text-red-500 text-xs mt-1">{{ errors.rating }}</p>
    </div>

    <!-- Condition (optional) -->
    <div>
      <label class="block text-sm font-semibold text-slate-700 mb-1.5">
        Condition / Procedure
        <span class="text-slate-400 font-normal text-xs">(optional)</span>
      </label>
      <input
        v-model="condition"
        type="text"
        placeholder="e.g. GERD, Endoscopy, Hepatitis C…"
        maxlength="50"
        class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-400 focus:outline-none text-sm transition-all"
      />
    </div>

    <!-- Message -->
    <div>
      <label class="block text-sm font-semibold text-slate-700 mb-1.5">
        Your Review <span class="text-red-500">*</span>
      </label>
      <textarea
        v-model="message"
        rows="4"
        placeholder="Share your experience with Dr. Asif Raza Zaidi…"
        maxlength="600"
        :class="[
          'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all resize-none',
          errors.message
            ? 'border-red-300 bg-red-50 focus:ring-red-300'
            : 'border-slate-200 bg-white focus:ring-brand-400',
        ]"
      ></textarea>
      <div class="flex justify-between mt-1">
        <p v-if="errors.message" class="text-red-500 text-xs">{{ errors.message }}</p>
        <p class="text-slate-400 text-xs ml-auto">{{ message.length }}/600</p>
      </div>
    </div>

    <!-- API error -->
    <p v-if="error" class="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3 border border-red-100">
      {{ error }}
    </p>

    <button
      type="submit"
      :disabled="submitting"
      class="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all active:scale-95 shadow hover:shadow-md"
    >
      <span v-if="submitting" class="inline-flex items-center gap-2">
        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
        Submitting…
      </span>
      <span v-else>Submit Review</span>
    </button>
  </form>
</template>
