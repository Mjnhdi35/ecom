<template>
  <div class="space-y-6">
    <!-- Sort & Results -->
    <div class="flex items-center justify-between">
      <USelectMenu
        v-model="selectedSort"
        :options="sortOptions"
        placeholder="Sort by: Latest"
        @update:model-value="(value) => handleSortChange(String(value))"
      />
      <span class="text-sm text-gray-600">{{ totalResults }} Results Found</span>
    </div>

    <!-- Product Grid -->
    <div
      :class="[
        props.gridView
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4',
      ]"
    >
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
        :is-wishlisted="product.isWishlisted"
        :class="props.gridView ? '' : 'flex'"
        @add-to-cart="handleAddToCart(product)"
        @toggle-wishlist="handleToggleWishlist(product)"
        @quick-view="handleQuickView(product)"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center">
      <UPagination
        v-model:page="localPage"
        :total="totalPages * pageSize"
        :items-per-page="pageSize"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  badge?: string
  isWishlisted?: boolean
}

interface Props {
  products: Product[]
  totalResults?: number
  currentPage?: number
  totalPages?: number
  pageSize?: number
  gridView?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  totalResults: 0,
  currentPage: 1,
  totalPages: 1,
  pageSize: 12,
  gridView: true,
})

const localPage = ref(props.currentPage)
const selectedSort = ref('latest')

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Popular', value: 'popular' },
]

const emit = defineEmits<{
  addToCart: [product: Product]
  toggleWishlist: [product: Product]
  quickView: [product: Product]
  pageChange: [page: number]
  sortChange: [sort: string]
}>()

watch(
  () => props.currentPage,
  (newPage) => {
    localPage.value = newPage
  },
)

const handleAddToCart = (product: Product) => {
  emit('addToCart', product)
}

const handleToggleWishlist = (product: Product) => {
  emit('toggleWishlist', product)
}

const handleQuickView = (product: Product) => {
  emit('quickView', product)
}

const handlePageChange = (page: number) => {
  localPage.value = page
  emit('pageChange', page)
}

const handleSortChange = (sort: string) => {
  selectedSort.value = sort
  emit('sortChange', sort)
}
</script>
