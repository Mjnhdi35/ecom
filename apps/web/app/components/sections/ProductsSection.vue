<template>
  <section :class="['py-16', bgClass]">
    <UContainer>
      <SectionHeader
        :title="title"
        :view-all-link="viewAllLink"
      />
      <div :class="gridClass">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :image="product.image"
          :price="product.price"
          :original-price="product.originalPrice"
          :rating="product.rating"
          :review-count="product.reviewCount"
          :badge="product.badge"
          :is-wishlisted="isWishlisted(product.id)"
          @add-to-cart="handleAddToCart(product)"
          @toggle-wishlist="handleToggleWishlist(product)"
          @quick-view="handleQuickView(product)"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'
import { useWishlist } from '~/composables/useWishlist'

interface Props {
  title: string
  products: Product[]
  viewAllLink?: string
  bgClass?: string
  gridClass?: string
}

withDefaults(defineProps<Props>(), {
  bgClass: '',
  gridClass: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6',
})

const { addToCart } = useCart()
const { isWishlisted, toggleWishlist } = useWishlist()

const emit = defineEmits<{
  quickView: [product: Product]
}>()

const handleAddToCart = (product: Product) => addToCart(product)
const handleToggleWishlist = (product: Product) => toggleWishlist(product)
const handleQuickView = (product: Product) => emit('quickView', product)
</script>
