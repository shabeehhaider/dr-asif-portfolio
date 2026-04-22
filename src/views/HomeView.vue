<script setup>
import TheNavbar      from '@/components/TheNavbar.vue'
import TheHero        from '@/components/TheHero.vue'
import SectionAbout   from '@/components/SectionAbout.vue'
import SectionServices from '@/components/SectionServices.vue'
import SectionVideos  from '@/components/SectionVideos.vue'
import SectionLocations from '@/components/SectionLocations.vue'
import SectionReviews from '@/components/SectionReviews.vue'
import SectionContact from '@/components/SectionContact.vue'
import TheFooter      from '@/components/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen">
    <TheNavbar />
    <main>
      <TheHero />
      <SectionAbout />
      <SectionServices />
      <SectionVideos />
      <SectionLocations />
      <SectionReviews />
      <SectionContact />
    </main>
    <TheFooter />
  </div>
</template>
