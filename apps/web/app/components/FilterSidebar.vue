<template>
  <div class="space-y-6">
    <!-- Filter Button -->
    <UButton
      color="primary"
      block
      icon="i-heroicons-funnel"
      @click="toggleFilters"
    >
      Filter
    </UButton>

    <!-- All Categories -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">All Categories</h3>
      </template>
      <div class="space-y-2">
        <label
          v-for="category in props.categories.length > 0
            ? props.categories
            : fallbackCategories"
          :key="category.id"
          class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer transition-colors"
        >
          <div class="flex items-center gap-2">
            <URadio
              :model-value="selectedCategory"
              :value="category.id"
              @update:model-value="updateCategory"
            />
            <span class="text-highlighted">{{ category.name }}</span>
          </div>
          <span class="text-sm text-muted">({{ category.count || 0 }})</span>
        </label>
      </div>
    </UCard>

    <!-- Price Filter -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Price</h3>
      </template>
      <div class="space-y-4">
        <URange v-model="priceRange" :min="0" :max="1500" :step="10" />
        <div class="flex items-center justify-between text-sm text-muted">
          <span>${{ priceRange[0] }}</span>
          <span>${{ priceRange[1] }}</span>
        </div>
      </div>
    </UCard>

    <!-- Rating Filter -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Rating</h3>
      </template>
      <div class="space-y-2">
        <label
          v-for="rating in ratings"
          :key="rating.value"
          class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
        >
          <UCheckbox
            :model-value="selectedRatings.includes(rating.value)"
            @update:model-value="
              (val) => toggleRating(rating.value, Boolean(val))
            "
          />
          <RatingStars :rating="rating.value" />
          <span class="text-sm text-muted">{{ rating.label }}</span>
        </label>
      </div>
    </UCard>

    <!-- Popular Tags -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Popular Tag</h3>
      </template>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="tag in tags"
          :key="tag"
          variant="outline"
          size="sm"
          :color="selectedTags.includes(tag) ? 'primary' : 'neutral'"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </UButton>
      </div>
    </UCard>

    <!-- Promotional Banner -->
    <UCard class="bg-primary-500 text-white">
      <div class="p-6">
        <h3 class="text-2xl font-bold mb-2">79% Discount</h3>
        <p class="text-white/90 mb-4">on your first order</p>
        <UButton
          variant="solid"
          block
          class="bg-white text-primary-600 hover:bg-gray-100"
          @click="$emit('shopNow')"
        >
          Shop Now
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
        </UButton>
      </div>
    </UCard>

    <!-- Sale Products -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Sale Products</h3>
      </template>
      <div class="space-y-4">
        <div
          v-for="product in props.saleProducts.length > 0
            ? props.saleProducts
            : fallbackSaleProducts"
          :key="product.id"
          class="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
          @click="navigateTo(`/product/${product.id}`)"
        >
          <NuxtImg
            :src="product.image"
            :alt="product.name"
            class="w-16 h-16 object-cover rounded"
            loading="lazy"
            format="webp"
            sizes="64px"
          />
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-highlighted line-clamp-2">
              {{ product.name }}
            </h4>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-sm font-bold text-primary-600"
                >${{ product.price }}</span
              >
              <span
                v-if="product.originalPrice"
                class="text-xs text-muted line-through"
              >
                ${{ product.originalPrice }}
              </span>
            </div>
            <RatingStars :rating="product.rating" class="mt-1" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '~/composables/useMockData';

interface Props {
  categories?: Category[];
  saleProducts?: Product[];
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  saleProducts: () => [],
});

const selectedCategory = ref<number | null>(null);
const priceRange = ref([0, 100]);
const selectedRatings = ref<number[]>([]);
const selectedTags = ref<string[]>([]);

const ratings = [
  { value: 5, label: '5.0' },
  { value: 4, label: '4.0 & up' },
  { value: 3, label: '3.0 & up' },
  { value: 2, label: '2.0 & up' },
  { value: 1, label: '1.0 & up' },
];

const tags = [
  'Organic',
  'Fresh',
  'Local',
  'Seasonal',
  'Pesticide-Free',
  'Farm Direct',
  'Certified',
  'Sustainable',
];

const toggleFilters = () => {
  // Toggle mobile filters
};

// Fallback categories if not provided
const fallbackCategories = [
  { id: 1, name: 'Fresh Fruits', count: 24 },
  { id: 2, name: 'Fresh Vegetables', count: 32 },
  { id: 3, name: 'Organic Produce', count: 18 },
  { id: 4, name: 'Herbs & Spices', count: 15 },
  { id: 5, name: 'Root Vegetables', count: 12 },
  { id: 6, name: 'Leafy Greens', count: 10 },
  { id: 7, name: 'Grains & Legumes', count: 8 },
  { id: 8, name: 'Seasonal Specials', count: 6 },
];

// Fallback sale products
const fallbackSaleProducts = [
  {
    id: 1,
    name: 'Organic Carrot Bundle',
    image: 'https://source.unsplash.com/64x64/?fresh carrot organic',
    price: 7.99,
    originalPrice: 10.99,
    rating: 4.6,
  },
  {
    id: 2,
    name: 'Fresh Organic Lettuce',
    image: 'https://source.unsplash.com/64x64/?fresh lettuce organic',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.3,
  },
  {
    id: 3,
    name: 'Organic Potatoes',
    image: 'https://source.unsplash.com/64x64/?organic potato',
    price: 8.99,
    originalPrice: 11.99,
    rating: 4.6,
  },
];

const updateCategory = (value: number) => {
  selectedCategory.value = value === selectedCategory.value ? null : value;
  emit('filterChange', {
    category: selectedCategory.value ?? undefined,
  });
};

const toggleRating = (rating: number, checked: boolean) => {
  if (checked) {
    if (!selectedRatings.value.includes(rating)) {
      selectedRatings.value.push(rating);
    }
  } else {
    selectedRatings.value = selectedRatings.value.filter((r) => r !== rating);
  }
  emit('filterChange', { ratings: selectedRatings.value });
};

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  emit('filterChange', { tags: selectedTags.value });
};

interface FilterChange {
  priceRange?: number[];
  ratings?: number[];
  tags?: string[];
  categories?: number[];
  category?: number;
}

const emit = defineEmits<{
  filterChange: [filters: FilterChange];
  shopNow: [];
}>();
</script>
