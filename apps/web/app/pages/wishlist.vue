<template>
  <div class="ecommerce-page">
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-8 mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        My Wishlist
      </h1>

      <div
        v-if="wishlistItems.length > 0"
        class="space-y-6"
      >
        <UCard
          v-for="item in wishlistItems"
          :key="item.id"
          class="p-6"
        >
          <div class="flex items-center gap-6">
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-32 h-32 object-cover rounded"
              loading="lazy"
              format="webp"
              sizes="128px"
            />
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ item.name }}
              </h3>
              <RatingStars
                :rating="item.rating"
                class="mb-2"
              />
              <div class="flex items-center gap-4">
                <span class="text-2xl font-bold text-primary-600">
                  ${{ item.price }}
                </span>
                <span
                  v-if="item.originalPrice"
                  class="text-lg text-gray-400 line-through"
                >
                  ${{ item.originalPrice }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <UButton
                color="primary"
                size="lg"
                icon="i-heroicons-shopping-bag"
                @click="handleAddToCart(item)"
              >
                Add to Cart
              </UButton>
              <UButton
                variant="ghost"
                size="lg"
                icon="i-heroicons-x-mark"
                color="error"
                @click="removeFromWishlist(item.id)"
              />
            </div>
          </div>
        </UCard>
      </div>

      <div
        v-else
        class="text-center py-16"
      >
        <UIcon
          name="i-heroicons-heart"
          class="w-24 h-24 text-gray-300 mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p class="text-gray-600 mb-6">
          Start adding products you love!
        </p>
        <UButton
          color="primary"
          size="lg"
          @click="navigateTo('/shop')"
        >
          Continue Shopping
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useWishlist } from '~/composables/useWishlist'

definePageMeta({
  layout: 'default',
})

const { addToCart } = useCart()
const { wishlistItems, removeFromWishlist } = useWishlist()

const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Wishlist' }]

interface WishlistItem {
  id: number
  name: string
  image: string
  price: number
}

const handleAddToCart = (item: WishlistItem) => {
  addToCart(item)
  navigateTo('/cart')
}
</script>
