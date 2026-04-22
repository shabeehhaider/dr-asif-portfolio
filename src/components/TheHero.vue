<script setup>
import img1 from '@/assets/images/img1.jpeg'

function scrollToVideos() {
  document.querySelector('#videos')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-800 to-teal-700"
    aria-label="Hero"
  >
    <!-- Ambient blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-600/30 blur-3xl"></div>
      <div class="absolute top-1/2 -right-24 w-[400px] h-[400px] rounded-full bg-teal-500/20 blur-3xl"></div>
      <div class="absolute -bottom-24 left-1/3 w-[350px] h-[350px] rounded-full bg-brand-400/20 blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- ── Text column ── -->
        <div class="order-2 lg:order-1 text-center lg:text-left">

          <!-- Verified badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
            <span class="text-white/90 text-xs sm:text-sm font-medium">
              PMDC Verified · FCPS · MRCPS Glasgow
            </span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white leading-[1.1] mb-4">
            Dr. Syed Asif<br />
            <span class="text-teal-300">Raza Zaidi</span>
          </h1>

          <p class="text-xl sm:text-2xl font-semibold text-white/80 mb-3">
            Gastroenterologist &amp; Hepatologist
          </p>
          <p class="text-base sm:text-lg text-white/55 max-w-lg mx-auto lg:mx-0 mb-10">
            10+ years helping patients understand and overcome gut &amp; liver
            conditions in Lahore, Pakistan — in Urdu and English.
          </p>

          <!-- CTA buttons -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-brand-800 font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Book Appointment
            </a>
            <button
              @click="scrollToVideos"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Health Videos
            </button>
          </div>

          <!-- Stats strip -->
          <div class="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
            <div class="text-center lg:text-left">
              <p class="text-3xl sm:text-4xl font-black text-white">10<span class="text-teal-300">+</span></p>
              <p class="text-white/50 text-xs sm:text-sm font-medium mt-0.5">Years Experience</p>
            </div>
            <div class="hidden sm:block w-px bg-white/15 self-stretch"></div>
            <div class="text-center lg:text-left">
              <p class="text-3xl sm:text-4xl font-black text-white">100<span class="text-teal-300">%</span></p>
              <p class="text-white/50 text-xs sm:text-sm font-medium mt-0.5">Patient Satisfaction</p>
            </div>
            <div class="hidden sm:block w-px bg-white/15 self-stretch"></div>
            <div class="text-center lg:text-left">
              <p class="text-3xl sm:text-4xl font-black text-white">4<span class="text-teal-300"> </span></p>
              <p class="text-white/50 text-xs sm:text-sm font-medium mt-0.5">Clinic Locations</p>
            </div>
            <div class="hidden sm:block w-px bg-white/15 self-stretch"></div>
            <div class="text-center lg:text-left">
              <p class="text-3xl sm:text-4xl font-black text-white">Rs.<span class="text-teal-300">2K</span></p>
              <p class="text-white/50 text-xs sm:text-sm font-medium mt-0.5">Starting Fee</p>
            </div>
          </div>
        </div>

        <!-- ── Photo column ── -->
        <div class="order-1 lg:order-2 flex justify-center">
          <div class="relative">
            <!-- Glow ring -->
            <div
              aria-hidden="true"
              class="absolute inset-0 scale-105 rounded-3xl bg-teal-400/20 blur-2xl"
            ></div>

            <!-- Photo frame -->
            <div
              class="relative w-64 h-72 sm:w-80 sm:h-96 lg:w-[22rem] lg:h-[26rem] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex items-end justify-center"
            >
              <!-- Doctor portrait -->
              <img
                :src="img1"
                alt="Dr. Syed Asif Raza Zaidi — Gastroenterologist & Hepatologist"
                class="absolute inset-0 w-full h-full object-cover object-top"
                loading="eager"
              />

              <!-- Credential card overlay at bottom -->
              <div class="relative z-10 w-full bg-gradient-to-t from-brand-950/90 to-transparent p-4 pt-10">
                <p class="text-white font-bold text-sm">Dr. Syed Asif Raza Zaidi</p>
                <p class="text-teal-300 text-xs font-medium">MBBS · FCPS · MRCPS (Glasgow)</p>
              </div>
            </div>

            <!-- Floating badge: years exp -->
            <div
              class="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-medium">Experience</p>
                <p class="text-slate-900 font-black text-sm leading-none">10+ Years</p>
              </div>
            </div>

            <!-- Floating badge: verified -->
            <div
              class="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-medium">PMDC</p>
                <p class="text-slate-900 font-black text-sm leading-none">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave separator -->
    <div class="absolute bottom-0 inset-x-0 overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        class="w-full h-8 sm:h-12 lg:h-14 text-white fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,56 C240,0 480,56 720,28 C960,0 1200,56 1440,28 L1440,56 Z"/>
      </svg>
    </div>
  </section>
</template>
