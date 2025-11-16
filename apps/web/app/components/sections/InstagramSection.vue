<template>
  <section :class="['py-16', bgClass]">
    <UContainer>
      <SectionHeader :title="title" />
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="i in imageCount"
          :key="i"
          class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
        >
          <NuxtImg
            :src="`/assets/images/Image-${i}.png`"
            :alt="`Instagram post ${i}`"
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
            sizes="sm:50vw md:33vw lg:16vw"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  imageCount?: number
  bgClass?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Follow us on Instagram',
  imageCount: 6,
  bgClass: '',
})
</script>
