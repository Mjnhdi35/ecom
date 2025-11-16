<template>
  <UModal v-model="isOpen">
    <div
      v-if="product"
      class="max-w-6xl"
    >
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-gray-900">
              {{ product.name }}
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="close"
            />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left: Image Gallery -->
          <ProductImageGallery
            :images="product.images"
            :product-name="product.name"
          />

          <!-- Right: Product Details -->
          <div class="space-y-6">
            <!-- Stock Status -->
            <UBadge
              v-if="product.inStock"
              color="success"
              variant="solid"
            >
              In Stock
            </UBadge>

            <!-- Rating & SKU -->
            <div class="flex items-center gap-4">
              <RatingStars :rating="product.rating" />
              <span class="text-sm text-gray-600">{{ product.reviewCount }} Review</span>
              <span class="text-sm text-gray-600">SKU: {{ product.sku }}</span>
            </div>

            <!-- Pricing -->
            <div class="flex items-center gap-4">
              <span class="text-3xl font-bold text-primary-600">${{ product.price }}</span>
              <span
                v-if="product.originalPrice"
                class="text-xl text-gray-400 line-through"
              >
                ${{ product.originalPrice }}
              </span>
              <UBadge
                v-if="product.discount"
                color="error"
                variant="solid"
              >
                {{ product.discount }}% Off
              </UBadge>
            </div>

            <!-- Brand -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Brand:</span>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-leaf"
                  class="w-5 h-5 text-primary-600"
                />
                <span class="font-semibold">farmary</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-700 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Quantity Selector -->
            <div class="flex items-center gap-4">
              <span class="text-sm font-semibold text-gray-900">Quantity:</span>
              <QuantitySelector
                v-model="quantity"
                :min="1"
                :max="product.stock || 100"
              />
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-4">
              <UButton
                color="primary"
                size="lg"
                block
                icon="i-heroicons-shopping-bag"
                @click="handleAddToCart"
              >
                Add to Cart
              </UButton>
              <UButton
                variant="outline"
                size="lg"
                icon="i-heroicons-heart"
                @click="handleToggleWishlist"
              />
            </div>

            <!-- Share Item -->
            <div class="flex items-center gap-4 pt-4 border-t border-gray-200">
              <span class="text-sm font-semibold text-gray-900">Share item:</span>
              <div class="flex items-center gap-2">
                <UButton
                  variant="ghost"
                  size="sm"
                  icon="i-simple-icons-facebook"
                  class="text-primary-600"
                />
                <UButton
                  variant="ghost"
                  size="sm"
                  icon="i-simple-icons-twitter"
                />
                <UButton
                  variant="ghost"
                  size="sm"
                  icon="i-simple-icons-pinterest"
                />
                <UButton
                  variant="ghost"
                  size="sm"
                  icon="i-simple-icons-instagram"
                />
              </div>
            </div>

            <!-- Category & Tags -->
            <div class="space-y-2 pt-4 border-t border-gray-200">
              <div>
                <span class="text-sm font-semibold text-gray-900">Category:
                </span>
                <span class="text-sm text-gray-600">{{
                  product.category
                }}</span>
              </div>
              <div>
                <span class="text-sm font-semibold text-gray-900">Tag: </span>
                <span class="text-sm text-gray-600">{{
                  product.tags.join(' ')
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UModal>
</template>

<script setup lang="ts">
interface QuickViewProduct {
  id: number
  name: string
  image: string
  images: string[]
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  sku: string
  inStock: boolean
  stock: number
  description: string
  category: string
  tags: string[]
  brand?: string
}

interface Props {
  modelValue: boolean
  product: QuickViewProduct | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'addToCart': [product: QuickViewProduct, quantity: number]
  'toggleWishlist': [product: QuickViewProduct]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const quantity = ref(1)

const close = () => {
  isOpen.value = false
}

const handleAddToCart = () => {
  if (props.product) {
    emit('addToCart', props.product, quantity.value)
  }
}

const handleToggleWishlist = () => {
  if (props.product) {
    emit('toggleWishlist', props.product)
  }
}
</script>
