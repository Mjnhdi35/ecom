<template>
  <div class="py-12 bg-gray-50">
    <UContainer>
      <div class="flex items-center justify-center gap-8 lg:gap-12 flex-wrap">
        <NuxtImg
          v-for="(logo, index) in logos"
          :key="index"
          :src="logo"
          :alt="`Brand ${index + 1}`"
          class="h-12 lg:h-16 object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          loading="lazy"
          format="webp"
          sizes="64px"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  logos: string[]
}

defineProps<Props>()
</script>
