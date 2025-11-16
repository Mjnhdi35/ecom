<template>
  <UCard
    variant="outline"
    class="p-4 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
  >
    <UBadge
      v-if="badge"
      :color="computedBadgeColor"
      class="absolute top-4 left-4 z-10"
    >
      {{ badge }}
    </UBadge>

    <!-- Wishlist Icon -->
    <UButton
      variant="ghost"
      color="neutral"
      size="sm"
      square
      class="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-900"
      :icon="isWishlisted ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
      :class="isWishlisted ? 'text-error-500' : 'text-muted'"
      @click="$emit('toggleWishlist')"
    />

    <!-- Product Image -->
    <div
      class="mb-4 relative overflow-hidden rounded-lg aspect-square bg-gray-50 dark:bg-gray-800"
    >
      <NuxtImg
        :src="image"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        format="webp"
        sizes="sm:100vw md:50vw lg:33vw xl:25vw"
        placeholder
      />
      <!-- Quick View Overlay -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <UButton
          color="primary"
          variant="solid"
          size="md"
          @click="$emit('quickView')"
        >
          Quick View
        </UButton>
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-highlighted line-clamp-2">
        {{ name }}
      </h3>

      <!-- Rating -->
      <RatingStars
        :rating="rating"
        :count="reviewCount"
        :show-count="true"
      />

      <!-- Price -->
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-highlighted">${{ price }}</span>
        <span
          v-if="originalPrice"
          class="text-sm text-muted line-through"
        >
          ${{ originalPrice }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <UButton
        color="primary"
        variant="solid"
        block
        size="md"
        trailing-icon="i-heroicons-shopping-cart"
        @click="$emit('addToCart')"
      >
        Add to Cart
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount?: number
  badge?: string
  badgeColor?:
    | 'primary'
    | 'error'
    | 'warning'
    | 'success'
    | 'red'
    | 'orange'
    | 'green'
  isWishlisted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  reviewCount: 0,
  badgeColor: 'red',
  isWishlisted: false,
})

type BadgeColor
  = | 'primary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
    | 'secondary'
    | 'neutral'

const badgeColorMap: Record<string, BadgeColor> = {
  red: 'error',
  orange: 'warning',
  green: 'success',
}

const validBadgeColors: BadgeColor[] = [
  'primary',
  'error',
  'warning',
  'success',
  'info',
  'secondary',
  'neutral',
]

const computedBadgeColor = computed((): BadgeColor => {
  if (!props.badgeColor) return 'error'
  const mappedColor = badgeColorMap[props.badgeColor]
  if (mappedColor) return mappedColor
  if (validBadgeColors.includes(props.badgeColor as BadgeColor)) {
    return props.badgeColor as BadgeColor
  }
  return 'error'
})

defineEmits<{
  addToCart: []
  toggleWishlist: []
  quickView: []
}>()
</script>
