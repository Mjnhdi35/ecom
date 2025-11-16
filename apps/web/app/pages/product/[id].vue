<template>
  <div class="space-y-6">
    <UContainer>
      <div
        v-if="product"
        class="space-y-8"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery
            :images="product.images"
            :alt="product.name"
          />

          <div class="space-y-6">
            <!-- Badge -->
            <UBadge
              v-if="product.badge"
              :color="getBadgeColor(product.badge)"
              size="lg"
            >
              {{ product.badge }}
            </UBadge>

            <!-- Title -->
            <h1 class="text-4xl lg:text-5xl font-bold text-highlighted">
              {{ product.name }}
            </h1>

            <!-- Rating -->
            <div class="flex items-center gap-3">
              <RatingStars
                :rating="product.rating"
                :show-count="false"
              />
              <span class="text-sm text-muted">
                ({{ product.reviewCount }} reviews)
              </span>
              <UBadge
                v-if="product.category"
                variant="subtle"
                color="primary"
                size="sm"
              >
                {{ product.category }}
              </UBadge>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-3">
              <span class="text-5xl font-bold text-primary-600">
                ${{ product.price }}
              </span>
              <span
                v-if="product.originalPrice"
                class="text-2xl text-muted line-through"
              >
                ${{ product.originalPrice }}
              </span>
              <span
                v-if="product.originalPrice"
                class="text-lg font-semibold text-success-600"
              >
                Save ${{ (product.originalPrice - product.price).toFixed(2) }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-lg text-muted leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Agriculture Info -->
            <UCard
              variant="outline"
              class="bg-success-50 dark:bg-success-900/10"
            >
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="w-6 h-6 text-success-600 shrink-0 mt-0.5"
                />
                <div>
                  <p class="font-semibold text-highlighted mb-1">
                    100% Organic & Fresh
                  </p>
                  <p class="text-sm text-muted">
                    Directly sourced from local farms. Certified organic and
                    pesticide-free.
                  </p>
                </div>
              </div>
            </UCard>

            <!-- Quantity -->
            <div class="flex items-center gap-4">
              <span class="font-semibold text-highlighted">Quantity:</span>
              <QuantitySelector v-model="quantity" />
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                color="primary"
                size="lg"
                icon="i-heroicons-shopping-cart"
                block
                class="flex-1"
                @click="handleAddToCart"
              >
                Add to Cart
              </UButton>
              <UButton
                variant="outline"
                size="lg"
                icon="i-heroicons-heart"
                @click="handleAddToWishlist"
              >
                Wishlist
              </UButton>
            </div>

            <!-- Product Info -->
            <UCard variant="outline">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-semibold text-muted">Category:</span>
                  <p class="text-highlighted mt-1">
                    {{ product.category }}
                  </p>
                </div>
                <div>
                  <span class="font-semibold text-muted">SKU:</span>
                  <p class="text-highlighted mt-1">
                    {{ product.sku }}
                  </p>
                </div>
                <div class="col-span-2">
                  <span class="font-semibold text-muted">Tags:</span>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <UBadge
                      v-for="tag in product.tags"
                      :key="tag"
                      variant="subtle"
                      size="sm"
                    >
                      {{ tag }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Product Tabs: Description, Additional Info, Reviews -->
        <div class="mt-8">
          <ProductTabs
            title="Product Information"
            :tabs="tabs"
            default-tab="description"
          >
            <template #description>
              <div class="prose prose-lg max-w-none">
                <p class="text-muted leading-relaxed mb-4">
                  {{ product.description }}
                </p>
                <p class="text-muted leading-relaxed mb-6">
                  Our agriculture products are carefully selected from trusted
                  local farms that practice sustainable and organic farming
                  methods. Each product is harvested at peak ripeness to ensure
                  maximum flavor and nutritional value.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <UCard
                    variant="outline"
                    class="bg-primary-50 dark:bg-primary-900/10"
                  >
                    <div class="flex items-start gap-3">
                      <UIcon
                        name="i-heroicons-shield-check"
                        class="w-6 h-6 text-primary-600 shrink-0"
                      />
                      <div>
                        <h4 class="font-semibold text-highlighted mb-1">
                          Certified Organic
                        </h4>
                        <p class="text-sm text-muted">
                          USDA certified organic, no pesticides or harmful
                          chemicals
                        </p>
                      </div>
                    </div>
                  </UCard>
                  <UCard
                    variant="outline"
                    class="bg-success-50 dark:bg-success-900/10"
                  >
                    <div class="flex items-start gap-3">
                      <UIcon
                        name="i-heroicons-truck"
                        class="w-6 h-6 text-success-600 shrink-0"
                      />
                      <div>
                        <h4 class="font-semibold text-highlighted mb-1">
                          Farm Fresh
                        </h4>
                        <p class="text-sm text-muted">
                          Directly from farm to your table, ensuring maximum
                          freshness
                        </p>
                      </div>
                    </div>
                  </UCard>
                </div>
              </div>
            </template>

            <template #additional-info>
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UCard variant="outline">
                    <div class="space-y-4">
                      <div>
                        <span class="font-semibold text-muted">Weight:</span>
                        <p class="text-highlighted mt-1">
                          {{ product.weight || '1 kg' }}
                        </p>
                      </div>
                      <div>
                        <span class="font-semibold text-muted">Origin:</span>
                        <p class="text-highlighted mt-1">
                          {{ product.origin || 'Local Farm' }}
                        </p>
                      </div>
                      <div>
                        <span class="font-semibold text-muted">Harvest Date:</span>
                        <p class="text-highlighted mt-1">
                          {{ product.harvestDate || 'Recently Harvested' }}
                        </p>
                      </div>
                    </div>
                  </UCard>
                  <UCard variant="outline">
                    <div class="space-y-4">
                      <div>
                        <span class="font-semibold text-muted">Storage:</span>
                        <p class="text-highlighted mt-1">
                          {{ product.storage || 'Refrigerate' }}
                        </p>
                      </div>
                      <div>
                        <span class="font-semibold text-muted">Shelf Life:</span>
                        <p class="text-highlighted mt-1">
                          {{ product.shelfLife || '5-7 days' }}
                        </p>
                      </div>
                      <div>
                        <span class="font-semibold text-muted">Certification:</span>
                        <p class="text-highlighted mt-1">
                          USDA Organic
                        </p>
                      </div>
                    </div>
                  </UCard>
                </div>
              </div>
            </template>

            <template #reviews>
              <ProductReviews
                :product-id="product.id"
                @review-submitted="handleReviewSubmitted"
                @helpful="handleReviewHelpful"
                @report="handleReviewReport"
              />
            </template>
          </ProductTabs>
        </div>
      </div>

      <UEmpty
        v-else
        icon="i-heroicons-exclamation-circle"
        label="Product Not Found"
        description="The agriculture product you are looking for does not exist."
      >
        <template #actions>
          <UButton
            color="primary"
            to="/shop"
          >
            Browse Products
          </UButton>
        </template>
      </UEmpty>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useWishlist } from '~/composables/useWishlist'
import { useMockData } from '~/composables/useMockData'

definePageMeta({
  layout: 'shop',
})

const route = useRoute()
const { addToCart } = useCart()
const { toggleWishlist } = useWishlist()
const { products } = useMockData()

const productId = route.params.id as string
const quantity = ref(1)

const tabs = [
  { label: 'Description', value: 'description' },
  { label: 'Additional Info', value: 'additional-info' },
  { label: 'Reviews', value: 'reviews' },
]

// Find product from mock data
const foundProduct = products.find(p => p.id === Number(productId))

const product = computed(() => {
  if (!foundProduct) return null

  return {
    ...foundProduct,
    images: [
      foundProduct.image,
      foundProduct.image,
      foundProduct.image,
      foundProduct.image,
    ],
    description:
      foundProduct.description
      || `Fresh, organic ${foundProduct.name.toLowerCase()} directly from local farms. Certified organic and pesticide-free, harvested at peak ripeness for maximum flavor and nutrition.`,
    sku: `${foundProduct.category?.toUpperCase().slice(0, 3) || 'AGR'}-${String(foundProduct.id).padStart(3, '0')}`,
    tags: foundProduct.badge
      ? ['Organic', 'Fresh', foundProduct.category || 'Agriculture']
      : ['Organic', 'Fresh'],
    weight: '1 kg',
    origin: 'Local Farm',
    harvestDate: 'Recently Harvested',
    storage: 'Refrigerate',
    shelfLife: '5-7 days',
  }
})

const getBadgeColor = (badge: string) => {
  if (badge.includes('Sale')) return 'error'
  if (badge.includes('New')) return 'success'
  if (badge.includes('Hot')) return 'warning'
  return 'primary'
}

// Breadcrumbs handled by shop layout

const handleAddToCart = () => {
  if (product.value) {
    addToCart(
      {
        id: product.value.id,
        name: product.value.name,
        image: product.value.image,
        price: product.value.price,
      },
      quantity.value,
    )
  }
}

const handleAddToWishlist = () => {
  if (product.value) {
    toggleWishlist({
      id: product.value.id,
      name: product.value.name,
      image: product.value.image,
      price: product.value.price,
      originalPrice: product.value.originalPrice,
      rating: product.value.rating,
      reviewCount: product.value.reviewCount,
    })
  }
}

interface ReviewSubmission {
  name: string
  email: string
  rating: number
  comment: string
  avatar: string
}

const handleReviewSubmitted = (review: ReviewSubmission) => {
  console.log('Review submitted:', review)
  // Handle review submission
}

const handleReviewHelpful = (reviewId: number) => {
  console.log('Review helpful:', reviewId)
  // Handle helpful action
}

const handleReviewReport = (reviewId: number) => {
  console.log('Review reported:', reviewId)
  // Handle report action
}
</script>
