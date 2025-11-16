<template>
  <UCard
    variant="outline"
    class="overflow-hidden hover:shadow-lg transition-all duration-300"
  >
    <div class="relative">
      <NuxtImg
        :src="image"
        :alt="title"
        class="w-full h-64 object-cover"
        loading="lazy"
        format="webp"
        sizes="sm:100vw md:50vw lg:33vw"
      />
      <div
        class="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 text-sm font-semibold text-gray-900"
      >
        {{ date }}
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-user"
            class="w-4 h-4"
          />
          {{ author }}
        </span>
        <span class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-chat-bubble-left"
            class="w-4 h-4"
          />
          {{ commentCount }} Comments
        </span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ excerpt }}
      </p>
      <NuxtLink
        to="/blog/post"
        class="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
      >
        Read More
        <UIcon
          name="i-heroicons-arrow-right"
          class="w-4 h-4"
        />
      </NuxtLink>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  image: string
  title: string
  excerpt: string
  author: string
  date: string
  commentCount?: number
}

withDefaults(defineProps<Props>(), {
  commentCount: 0,
})
</script>
