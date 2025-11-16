<template>
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-3xl font-bold text-gray-900">
      {{ title }}
    </h2>
    <NuxtLink
      v-if="viewAllLink"
      :to="viewAllLink"
      class="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
    >
      View All
      <UIcon
        name="i-heroicons-arrow-right"
        class="w-5 h-5"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  viewAllLink?: string
}

defineProps<Props>()
</script>
