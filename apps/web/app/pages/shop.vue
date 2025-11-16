<template>
  <div class="space-y-6">
    <UPageHeader
      title="Agriculture Products"
      description="Discover fresh, organic produce from local farms"
    />

    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside class="lg:col-span-1">
          <FilterSidebar
            :categories="categories"
            :sale-products="saleProducts"
            @filter-change="handleFilterChange"
            @shop-now="handleShopNow"
          />
        </aside>

        <section class="lg:col-span-3 space-y-6">
          <!-- Search and Sort -->
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <UInput
              v-model="searchQuery"
              placeholder="Search agriculture products..."
              icon="i-heroicons-magnifying-glass"
              class="flex-1 max-w-md"
              size="lg"
              @update:model-value="handleSearch"
            />
            <USelectMenu
              v-model="selectedSort"
              :options="sortOptions"
              placeholder="Sort by"
              size="lg"
              @update:model-value="
                (value) => handleSortChange(String(value || 'latest'))
              "
            />
          </div>

          <!-- Results Count -->
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted">
              Showing {{ startIndex }}-{{ endIndex }} of
              {{ filteredProducts.length }}
              products
            </p>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                :icon="
                  gridView
                    ? 'i-heroicons-squares-2x2'
                    : 'i-heroicons-list-bullet'
                "
                size="sm"
                @click="gridView = !gridView"
              />
            </div>
          </div>

          <!-- Product Grid -->
          <ProductListingGrid
            :products="paginatedProducts"
            :total-results="filteredProducts.length"
            :current-page="currentPage"
            :total-pages="totalPages"
            :grid-view="gridView"
            @add-to-cart="handleAddToCart"
            @toggle-wishlist="handleToggleWishlist"
            @quick-view="handleQuickView"
            @page-change="handlePageChange"
            @sort-change="handleSortChange"
          />

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex justify-center"
          >
            <UPagination
              v-model="currentPage"
              :total="totalPages"
              :page-size="pageSize"
            />
          </div>
        </section>
      </div>
    </UContainer>

    <ProductQuickView
      v-model="showQuickView"
      :product="selectedProduct"
      @add-to-cart="handleAddToCartFromQuickView"
      @toggle-wishlist="handleToggleWishlistFromQuickView"
    />
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useWishlist } from '~/composables/useWishlist'
import { useMockData } from '~/composables/useMockData'
import { useQuickView } from '~/composables/useQuickView'
import type { Product } from '~/composables/useProducts'
import type { QuickViewProduct } from '~/composables/useQuickView'

definePageMeta({
  layout: 'shop',
})

const { addToCart } = useCart()
const { toggleWishlist } = useWishlist()
const { createQuickViewProduct } = useQuickView()
const { products, categories } = useMockData()

const currentPage = ref(1)
const pageSize = 12
const showQuickView = ref(false)
const selectedProduct = ref<QuickViewProduct | null>(null)
const searchQuery = ref('')
const selectedSort = ref('latest')
const gridView = ref(true)

// Filters
const selectedCategory = ref<number | null>(null)
const priceRange = ref([0, 100])
const selectedRatings = ref<number[]>([])
const selectedTags = ref<string[]>([])

// Sale products for sidebar
const saleProducts = computed(() =>
  products.filter(p => p.badge?.includes('Sale')).slice(0, 3),
)

// Filtered products
const filteredProducts = computed(() => {
  let result = [...products]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(query)
        || p.category?.toLowerCase().includes(query),
    )
  }

  // Category filter
  if (selectedCategory.value !== null) {
    const category = categories.find(c => c.id === selectedCategory.value)
    if (category?.name) {
      result = result.filter(p => p.category === category.name)
    }
  }

  // Price filter
  if (priceRange.value && priceRange.value.length === 2) {
    result = result.filter(
      p => p.price >= priceRange.value[0]! && p.price <= priceRange.value[1]!,
    )
  }

  // Rating filter
  if (selectedRatings.value.length > 0) {
    result = result.filter(p =>
      selectedRatings.value.some(r => p.rating >= r),
    )
  }

  // Sort
  switch (selectedSort.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
      result.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      // Latest (by ID)
      result.sort((a, b) => b.id - a.id)
  }

  return result
})

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / pageSize),
)

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1)

const endIndex = computed(() =>
  Math.min(currentPage.value * pageSize, filteredProducts.value.length),
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredProducts.value.slice(start, end)
})

// Handlers
interface FilterChange {
  priceRange?: number[]
  ratings?: number[]
  tags?: string[]
  categories?: number[]
  category?: number
}

const handleFilterChange = (filters: FilterChange) => {
  if (filters.category !== undefined) {
    selectedCategory.value = filters.category || null
  }
  if (filters.priceRange) {
    priceRange.value = filters.priceRange
  }
  if (filters.ratings) {
    selectedRatings.value = filters.ratings
  }
  if (filters.tags) {
    selectedTags.value = filters.tags
  }
  currentPage.value = 1 // Reset to first page
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleShopNow = () => {
  navigateTo('/shop')
}

const handleAddToCart = (product: Product) => {
  addToCart(product)
}

const handleToggleWishlist = (product: Product) => {
  toggleWishlist(product)
}

const handleQuickView = (product: Product) => {
  selectedProduct.value = createQuickViewProduct(product)
  showQuickView.value = true
}

const handleAddToCartFromQuickView = (
  product: QuickViewProduct,
  quantity: number,
) => {
  addToCart(product, quantity)
  showQuickView.value = false
}

const handleToggleWishlistFromQuickView = (product: QuickViewProduct) => {
  toggleWishlist(product)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSortChange = (sort: string) => {
  selectedSort.value = sort
  currentPage.value = 1
}

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
]
</script>
