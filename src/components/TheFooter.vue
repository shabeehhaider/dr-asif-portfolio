<script setup>
const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Services',  href: '#services' },
  { label: 'Videos',    href: '#videos' },
  { label: 'Locations', href: '#locations' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'Contact',   href: '#contact' },
]

function smoothScroll(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-slate-900 text-slate-400" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <span class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 3a1 1 0 012 0v4h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H5a1 1 0 010-2h4V3z"/>
              </svg>
            </span>
            <span class="text-white font-bold text-base">Dr. Syed Asif Raza Zaidi</span>
          </div>
          <p class="text-sm leading-relaxed max-w-sm mb-5">
            Senior Gastroenterologist &amp; Hepatologist practicing in Lahore, Pakistan.
            MBBS · FCPS · MRCPS (Glasgow) · PMDC Verified.
          </p>
          <!-- Social links -->
          <div class="flex gap-3">
            <a
              href="https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              aria-label="YouTube Channel"
            >
              <svg class="w-5 h-5 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
              </svg>
            </a>
            <a
              href="https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
              aria-label="Book on oladoc"
            >
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/923213551115"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.href">
              <a
                :href="link.href"
                @click.prevent="smoothScroll(link.href)"
                class="text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a href="tel:04238900939" class="hover:text-white transition-colors flex items-center gap-2">
                <svg class="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                042-38900939
              </a>
            </li>
            <li>
              <a
                href="https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Book on oladoc
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
                </svg>
                YouTube Channel
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <p>
          &copy; {{ currentYear }} Dr. Syed Asif Raza Zaidi. All rights reserved.
        </p>
        <p>Lahore, Pakistan — PMDC Verified Specialist</p>
      </div>
    </div>
  </footer>
</template>
