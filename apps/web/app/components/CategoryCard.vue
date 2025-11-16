<template>
  <UCard
    variant="outline"
    class="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
    :class="{ 'ring-2 ring-primary-500 ring-offset-2': active }"
  >
    <div
      class="mb-4 flex justify-center aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
    >
      <NuxtImg
        :src="image"
        :alt="name"
        class="category-image w-24 h-24 mx-auto"
        loading="lazy"
        format="webp"
        sizes="96px"
        placeholder
      />
    </div>
    <h3 class="text-lg font-semibold text-gray-900">
      {{ name }}
    </h3>
    <p
      v-if="count"
      class="text-sm text-gray-500 mt-1"
    >
      {{ count }} items
    </p>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  name: string
  image: string
  count?: number
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
})
</script>
