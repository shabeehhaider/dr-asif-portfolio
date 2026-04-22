<script setup>
import { useFadeIn } from '@/composables/useFadeIn'
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  BeakerIcon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  HeartIcon,
  FireIcon,
  BugAntIcon,
  ExclamationCircleIcon,
  ArrowTrendingDownIcon,
  SparklesIcon,
  ScaleIcon,
  CpuChipIcon,
} from '@heroicons/vue/24/solid'

const { el, isVisible } = useFadeIn()

const services = [
  {
    icon: MagnifyingGlassIcon,
    name: 'Endoscopy',
    description: 'Diagnostic & therapeutic upper GI endoscopy for accurate diagnosis.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: ArrowPathIcon,
    name: 'Colonoscopy',
    description: 'Full colon examination for polyps, IBD, and colorectal screening.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: BeakerIcon,
    name: 'ERCP',
    description: 'Endoscopic retrograde cholangiopancreatography for bile duct disorders.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: CpuChipIcon,
    name: 'Polypectomy',
    description: 'Endoscopic removal of gastrointestinal polyps to prevent cancer.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: AdjustmentsHorizontalIcon,
    name: 'Gastric Band Ligation',
    description: 'Endoscopic band ligation for esophageal varices and bleeding control.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: ClipboardDocumentListIcon,
    name: 'Therapeutic Endoscopy',
    description: 'Full range of interventional endoscopic procedures.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: CircleStackIcon,
    name: 'Pancreaticobiliary Disease',
    description: 'Endoscopic evaluation & treatment of pancreas and bile duct diseases.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: ShieldCheckIcon,
    name: 'Hepatitis A/B/C',
    description: 'Complete hepatitis diagnosis, management, and curative treatment.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: HeartIcon,
    name: 'Fatty Liver (NAFLD)',
    description: 'Lifestyle and medical management of non-alcoholic fatty liver disease.',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: FireIcon,
    name: 'GERD / Acid Reflux',
    description: 'Diagnosis and long-term management of gastroesophageal reflux disease.',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    icon: BugAntIcon,
    name: 'H. Pylori Infection',
    description: 'Non-invasive testing and evidence-based eradication therapy.',
    color: 'bg-lime-50 text-lime-600',
  },
  {
    icon: ExclamationCircleIcon,
    name: 'Gallbladder Disease',
    description: 'Gallstones, cholecystitis, and biliary colic diagnosis & management.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: ArrowTrendingDownIcon,
    name: 'Diarrhea',
    description: 'Investigation and targeted treatment of acute and chronic diarrhea.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: SparklesIcon,
    name: 'Gastric Ulcer',
    description: 'Peptic and gastric ulcer disease diagnosis, treatment, and prevention.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ScaleIcon,
    name: 'Obesity Management',
    description: 'Medical and endoscopic approaches to sustainable weight management.',
    color: 'bg-teal-50 text-teal-700',
  },
]
</script>

<template>
  <section
    id="services"
    class="py-20 sm:py-24 lg:py-32 bg-slate-50"
    aria-labelledby="services-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div
        ref="el"
        :class="['text-center mb-12 sm:mb-16 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <span class="inline-block text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">
          What We Treat
        </span>
        <h2
          id="services-heading"
          class="text-3xl sm:text-4xl font-extrabold text-slate-900"
        >
          Services &amp; Conditions Treated
        </h2>
        <p class="text-slate-500 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
          From diagnostic endoscopy to complex hepatology, Dr. Zaidi provides
          comprehensive care for all GI and liver conditions.
        </p>
      </div>

      <!-- Services grid: 1 → 2 → 3 → 4 columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        <div
          v-for="(service, index) in services"
          :key="service.name"
          :style="{ transitionDelay: `${index * 40}ms` }"
          :class="[
            'group rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ]"
        >
          <!-- Icon -->
          <div :class="['w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110', service.color]">
            <component :is="service.icon" class="w-6 h-6" aria-hidden="true" />
          </div>
          <!-- Name -->
          <h3 class="font-bold text-slate-900 text-sm sm:text-base mb-1.5">{{ service.name }}</h3>
          <!-- Description -->
          <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">{{ service.description }}</p>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mt-12 text-center">
        <a
          href="https://oladoc.com/pakistan/lahore/dr/gastroenterologist/asif-raza-zaidi/17719"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow hover:shadow-md transition-all active:scale-95"
        >
          Book a Consultation for Any of These Conditions
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
