<template>
  <div
    class="rounded-2xl p-8 text-white relative overflow-hidden"
    :class="bgClass"
  >
    <div class="relative z-10">
      <UBadge
        v-if="badge"
        :color="
          badgeColor === 'white'
            ? undefined
            : badgeColor === 'red'
              ? 'error'
              : badgeColor
        "
        variant="solid"
        :class="[
          'mb-4',
          badgeColor === 'white' ? 'bg-white text-primary-600' : '',
        ]"
      >
        {{ badge }}
      </UBadge>
      <h2 class="text-3xl font-bold mb-2">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-lg mb-4 text-white/90"
      >
        {{ description }}
      </p>
      <div
        v-if="price"
        class="text-4xl font-bold mb-4"
      >
        ${{ price }}
      </div>
      <CountdownTimer
        v-if="showCountdown && countdownDate"
        :end-date="countdownDate"
        class="mb-6"
      />
      <UButton
        variant="solid"
        class="bg-white text-primary-600 hover:bg-gray-100"
        @click="$emit('shopNow')"
      >
        Shop Now
      </UButton>
    </div>
    <div
      v-if="backgroundImage"
      class="absolute right-0 bottom-0 w-1/2 h-full opacity-20"
    >
      <NuxtImg
        :src="backgroundImage"
        :alt="title"
        class="w-full h-full object-cover"
        loading="lazy"
        format="webp"
        sizes="sm:100vw md:50vw"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  price?: number
  badge?: string
  badgeColor?: 'primary' | 'error' | 'warning' | 'success' | 'white' | 'red'
  bgClass?: string
  backgroundImage?: string
  showCountdown?: boolean
  countdownDate?: string
}

withDefaults(defineProps<Props>(), {
  badgeColor: 'white',
  bgClass: 'bg-linear-to-br from-primary-500 to-primary-600',
  showCountdown: false,
})

defineEmits<{
  shopNow: []
}>()
</script>
