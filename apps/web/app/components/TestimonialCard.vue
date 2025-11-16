<template>
  <UCard
    variant="outline"
    class="p-8 hover:shadow-lg transition-all duration-300"
  >
    <div class="mb-6">
      <UIcon
        name="i-heroicons-chat-bubble-left-right"
        class="w-12 h-12 text-primary-500"
      />
    </div>
    <p class="text-gray-700 mb-6 text-lg leading-relaxed">
      "{{ content }}"
    </p>
    <div class="flex items-center gap-4">
      <UAvatar
        :src="avatar"
        :alt="name"
        size="lg"
      />
      <div>
        <h4 class="font-semibold text-gray-900">
          {{ name }}
        </h4>
        <p class="text-sm text-gray-600">
          {{ role }}
        </p>
        <RatingStars
          :rating="rating"
          class="mt-1"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  content: string
  name: string
  role: string
  avatar: string
  rating: number
}

defineProps<Props>()
</script>
