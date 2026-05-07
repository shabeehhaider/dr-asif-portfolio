<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import img2 from '@/assets/images/img2.jpeg'
import img3 from '@/assets/images/img3.jpeg'

const { el: leftEl, isVisible: leftVisible } = useFadeIn()
const { el: rightEl, isVisible: rightVisible } = useFadeIn()

const credentials = [
  { label: 'MBBS 🇵🇰',          sub: 'Bachelor of Medicine & Surgery' },
  { label: 'FCPS 🇵🇰',          sub: 'Gastroenterology — CPSP Pakistan' },
  { label: 'MRCPS Glasgow 🇬🇧',  sub: 'Royal College of Physicians & Surgeons' },
  { label: 'MACG 🇺🇸',          sub: 'American College of Gastroenterology' },
  { label: 'PMDC Verified',     sub: 'Pakistan Medical & Dental Council' },
]

const highlights = [
  { value: '20+',   label: 'Years of Practice' },
  { value: '100%',  label: 'Patient Satisfaction' },
  { value: '4',     label: 'Clinics in Lahore' },
  { value: '15+',   label: 'Conditions Treated' },
]
</script>

<template>
  <section
    id="about"
    class="py-20 sm:py-24 lg:py-32 bg-white overflow-hidden"
    aria-labelledby="about-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- Left: photo frame + credentials -->
        <div
          ref="leftEl"
          :class="['transition-all duration-700', leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8']"
        >
          <!-- Photo / visual block -->
          <div class="relative">
            <!-- Main procedural photo: endoscopy close-up -->
            <div class="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl aspect-[4/5] flex items-end">
              <img
                :src="img2"
                alt="Dr. Asif Raza Zaidi performing an endoscopy procedure"
                class="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <!-- Gradient overlay -->
              <div class="relative z-10 w-full p-5 bg-gradient-to-t from-brand-900/85 to-transparent">
                <p class="text-white font-bold">Dr. Syed Asif Raza Zaidi</p>
                <p class="text-teal-300 text-sm">Gastroenterologist &amp; Hepatologist</p>
              </div>
            </div>

            <!-- Floating accent card: procedure with team (img3) -->
            <div
              class="absolute -bottom-6 -left-4 sm:-left-6 w-32 sm:w-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white ring-1 ring-slate-200"
              aria-hidden="true"
            >
              <img
                :src="img3"
                alt="Dr. Asif Raza Zaidi performing endoscopy with his medical team"
                class="w-full aspect-[3/4] object-cover object-top"
                loading="lazy"
              />
            </div>

            <!-- Experience badge -->
            <div
              class="absolute -bottom-5 -right-5 sm:-right-6 bg-brand-600 text-white rounded-2xl shadow-xl px-5 py-3 text-center"
              aria-hidden="true"
            >
              <p class="text-3xl font-black leading-none">20+</p>
              <p class="text-brand-200 text-xs font-medium mt-0.5">Years Exp.</p>
            </div>
          </div>

          <!-- Credentials grid -->
          <div class="mt-10 grid grid-cols-2 gap-3">
            <div
              v-for="cred in credentials"
              :key="cred.label"
              class="rounded-2xl bg-brand-50 border border-brand-100 px-4 py-3"
            >
              <p class="text-brand-700 font-bold text-sm">{{ cred.label }}</p>
              <p class="text-slate-500 text-xs mt-0.5 leading-snug">{{ cred.sub }}</p>
            </div>
          </div>
        </div>

        <!-- Right: bio text -->
        <div
          ref="rightEl"
          :class="['transition-all duration-700 delay-150', rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8']"
        >
          <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
            About the Doctor
          </span>
          <h2
            id="about-heading"
            class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-2"
          >
            A Trusted Expert in
            <span class="text-brand-600">Gut &amp; Liver Health</span>
          </h2>

          <!-- Academic position badge -->
          <div class="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-6">
            <svg class="w-4 h-4 text-brand-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span class="text-brand-700 font-semibold text-sm">Asst. Professor of Gastroenterology · Sheikh Zayed Hospital, Lahore</span>
          </div>

          <div class="space-y-4 text-slate-600 text-base leading-relaxed">
            <p>
              Dr. Syed Asif Raza Zaidi is a senior Gastroenterologist and Hepatologist
              and Assistant Professor of Gastroenterology at Sheikh Zayed Hospital,
              Lahore. With over a decade of dedicated clinical and academic practice,
              he holds an FCPS in Gastroenterology (CPSP Pakistan), an MRCPS from the
              Royal College of Physicians and Surgeons, Glasgow 🇬🇧, and is a Member
              of the American College of Gastroenterology (MACG) 🇺🇸.
            </p>
            <p>
              With expertise spanning advanced endoscopy, colonoscopy, ERCP, hepatitis
              management, fatty liver disease, GERD, and many more GI conditions, Dr.
              Zaidi offers comprehensive diagnostic and therapeutic services at his
              Zaidi Gastro &amp; Liver Clinic and across multiple clinic locations in Lahore.
            </p>
            <p>
              A strong believer in patient education, Dr. Asif Raza Zaidi actively shares health
              information in both Urdu and English through his YouTube channel
              (<a
                href="https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-600 font-medium hover:underline"
              >@DrSyedAsifRazaZaidiOfficial</a>),
              making specialist-level knowledge accessible to patients and families
              across Pakistan.
            </p>
          </div>

          <!-- Highlights row -->
          <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              v-for="h in highlights"
              :key="h.value"
              class="text-center rounded-2xl bg-slate-50 border border-slate-100 py-4 px-2"
            >
              <p class="text-2xl sm:text-3xl font-black text-brand-600">{{ h.value }}</p>
              <p class="text-xs text-slate-500 font-medium mt-1 leading-snug">{{ h.label }}</p>
            </div>
          </div>

          <!-- CTA -->
          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/923033551115?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20Dr.%20Zaidi."
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow hover:shadow-md active:scale-95"
            >
              Book a Consultation
            </a>
            <a
              href="https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-600 font-semibold text-sm transition-all hover:bg-brand-50 active:scale-95"
            >
              <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
              </svg>
              YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
