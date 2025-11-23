<template>
  <UHeader :ui="headerUi">
    <!-- Top Bar -->
    <template #top>
      <div class="bg-white">
        <UContainer class="py-2 sm:py-4">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0"
          >
            <!-- Left: Store Location -->
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-map-pin"
                class="size-4 text-gray-600 shrink-0"
              />
              <span class="body-small text-gray-600 truncate">
                Store Location: 115 Đường số 2, Phường 13, Quận 6
              </span>
            </div>

            <!-- Right: Language, Currency, Sign In -->
            <div class="flex items-center gap-2 sm:gap-4">
              <!-- Language Select -->
              <USelect
                v-model="selectedLanguage"
                :items="languages"
                size="sm"
                color="neutral"
                variant="ghost"
                value-key="value"
                label-key="label"
                class="w-16 sm:w-20"
              />

              <!-- Currency Select -->
              <USelect
                v-model="selectedCurrency"
                :items="currencies"
                size="sm"
                color="neutral"
                variant="ghost"
                value-key="value"
                label-key="label"
                class="w-16 sm:w-20"
              />

              <!-- Sign In / Sign Up -->
              <NuxtLink
                to="/auth/signin"
                class="body-small text-gray-700 hover:text-primary-500 transition-colors whitespace-nowrap"
              >
                Sign In / Sign Up
              </NuxtLink>
            </div>
          </div>
        </UContainer>
      </div>
    </template>

    <!-- Left: Logo -->
    <template #left>
      <Logo size="lg" />
    </template>

    <!-- Center: Search Bar -->
    <template #default>
      <div class="flex-1 max-w-2xl mx-auto hidden lg:flex">
        <form @submit.prevent="handleSearch" class="flex gap-2 w-full">
          <UInput
            v-model="searchQuery"
            type="search"
            placeholder="Search"
            size="lg"
            color="primary"
            variant="outline"
            icon="i-lucide-search"
            class="flex-1"
            :ui="{ base: 'rounded-r-none' }"
          />
          <UButton
            type="submit"
            color="primary"
            size="lg"
            variant="solid"
            label="Search"
            class="rounded-l-none"
          />
        </form>
      </div>
    </template>

    <!-- Right: Wishlist, Cart -->
    <template #right>
      <div class="flex items-center gap-2 sm:gap-4 shrink-0">
        <!-- Wishlist -->
        <UButton
          color="neutral"
          variant="ghost"
          size="md"
          square
          icon="i-lucide-heart"
          aria-label="Wishlist"
          class="lg:size-lg"
        />

        <!-- Shopping Cart -->
        <div class="flex items-center gap-1 sm:gap-2">
          <div class="relative">
            <UButton
              color="neutral"
              variant="ghost"
              size="md"
              square
              icon="i-lucide-shopping-bag"
              aria-label="Shopping Cart"
              class="lg:size-lg"
              @click="cartOpen = true"
            />
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 flex items-center justify-center size-4 sm:size-5 rounded-full bg-primary-500 text-white text-xs font-semibold"
            >
              {{ cartItemCount }}
            </span>
          </div>
          <div class="hidden sm:flex flex-col">
            <span class="body-small text-gray-600">Shopping cart:</span>
            <span class="body-medium font-semibold text-gray-900">
              ${{ cartTotal.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </template>

    <!-- Bottom: Navigation Bar -->
    <template #bottom>
      <nav class="bg-gray-900">
        <UContainer class="py-3 lg:py-4">
          <div
            class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0"
          >
            <!-- Left: Navigation Menu -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
              <NuxtLink
                v-for="item in navigationItems"
                :key="item.label"
                :to="item.to"
                class="nav-link flex items-center gap-1 body-medium text-white hover:text-primary-400 transition-colors whitespace-nowrap"
              >
                <span>{{ item.label }}</span>
                <UIcon
                  v-if="item.hasDropdown"
                  name="i-lucide-chevron-down"
                  class="size-4"
                />
              </NuxtLink>
            </div>

            <!-- Right: Phone Number -->
            <div
              class="flex items-center gap-2 w-full lg:w-auto justify-center lg:justify-end"
            >
              <UIcon
                name="i-lucide-phone"
                class="size-4 sm:size-5 text-white shrink-0"
              />
              <a
                href="tel:+84909090909"
                class="body-medium text-white hover:text-primary-400 transition-colors whitespace-nowrap"
              >
                +84 909 090 909
              </a>
            </div>
          </div>
        </UContainer>
      </nav>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
interface NavigationItem {
  label: string;
  to: string;
  hasDropdown?: boolean;
}

// Header UI customization
const headerUi = {
  root: 'bg-white sticky top-0 z-50',
  container:
    'flex items-center justify-between gap-2 sm:gap-4 py-3 sm:py-4 border-b border-gray-200',
  left: 'shrink-0',
  center: 'flex-1 max-w-2xl mx-auto hidden lg:flex',
  right: 'flex items-center gap-2 lg:gap-4 shrink-0',
};

// Language options
const languages = ref([
  { label: 'Vie', value: 'vi' },
  { label: 'Eng', value: 'en' },
  { label: 'Esp', value: 'es' },
]);

// Currency options
const currencies = ref([
  { label: 'VND', value: 'vnd' },
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
]);

// Selected values
const selectedLanguage = ref('vi');
const selectedCurrency = ref('vnd');

// Search
const searchQuery = ref('');

// Cart
const cartItemCount = ref(2);
const cartTotal = ref(57.0);
const cartOpen = ref(false);

// Navigation items
const navigationItems = ref<NavigationItem[]>([
  { label: 'Home', to: '/', hasDropdown: true },
  { label: 'Shop', to: '/shop', hasDropdown: true },
  { label: 'Pages', to: '/pages', hasDropdown: true },
  { label: 'Blog', to: '/blog', hasDropdown: true },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]);

// Search handler
function handleSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
  }
}
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary-400);
}
</style>
